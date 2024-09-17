from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel, Field
from datetime import timedelta, datetime
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from uuid import UUID

# Database and security constants
DATABASE_URL = "sqlite:///./test.db"
SECRET_KEY = "your_secret_key"  # Replace with your actual secret key
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Create a database engine and session
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# OAuth2 setup (required for token generation)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

app = FastAPI()

# SQLAlchemy User model
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)

# Create tables in the database
Base.metadata.create_all(bind=engine)

# Pydantic schema for user registration
class UserCreate(BaseModel):
    username: str
    password: int = Field(..., description="Password should be an integer")

# Dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Helper function to verify passwords
def verify_password(plain_password: int, hashed_password: str) -> bool:
    return pwd_context.verify(str(plain_password), hashed_password)

# Helper function to hash passwords
def get_password_hash(password: int) -> str:
    return pwd_context.hash(str(password))

# Helper function to authenticate users
def authenticate_user(db: Session,  username: str, password: int):
    user = db.query(User).filter(User.username == username).first()
    if not user or not verify_password(password, user.hashed_password):
        return None
    return user

# Helper function to create JWT tokens
def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# User registration route
@app.post("/register")
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.username == user.username).first()
    if db_user:
        raise HTTPException(
            status_code=400,
            detail="Username already registered"
        )
    hashed_password = get_password_hash(user.password)
    new_user = User(username=user.username, hashed_password=hashed_password)
    db.add(new_user)
    db.commit()
    return {"msg": "User created successfully"}

# Token generation (login) route
@app.post("/token")
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    try:
        password = int(form_data.password)
    except ValueError:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Password must be a 5-digit integer")

    user = authenticate_user(db, form_data.username, password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": user.username}, expires_delta=access_token_expires)
    return {"access_token": access_token, "token_type": "bearer"}

# Protected route
@app.get("/protected")
def read_protected_data(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=403, detail="Invalid token")
        return {"msg": f"Hello, {username}"}
    except JWTError:
        raise HTTPException(status_code=403, detail="Invalid token")

# Fetch user info (requires a valid token)
@app.get("/user")
def get_user_data(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=403, detail="Invalid token")

        user = db.query(User).filter(User.username == username).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        return {"username": user.username}
    except JWTError:
        raise HTTPException(status_code=403, detail="Invalid token")

# Recommendation data (Simulated recommendations)
recomm_data = {
    "001b6789-96de-448c-9ede-5c787514be27": [
        {
            "mot_id": 19580,
            "mot": "coq",
            "category": "animaux, basique",
            "subcategory": "oiseaux, animaux",
            "niv_diff_id": 1,
            "url_sign": "https://elix-lsf.s3.rbx.io.cloud.ovh.net/spip_videos/coq_nm_1_1.mp4",
            "url_def": "https://elix-lsf.s3.rbx.io.cloud.ovh.net/spip_videos/10_coq_1__nm_1td001.mp4",
            "recommendation_score": 4.02,
        },
        {
            "mot_id": 23170,
            "mot": "devant",
            "category": "basique",
            "subcategory": "position",
            "niv_diff_id": 1,
            "url_sign": "https://elix-lsf.s3.rbx.io.cloud.ovh.net/spip_videos/devant_adv_1_1.mp4",
            "url_def": "https://elix-lsf.s3.rbx.io.cloud.ovh.net/spip_videos/72_devant_2__adv_1td001-encoded.mp4",
            "recommendation_score": 3.99,
        },
    ]
}

# Define the request schema for recommendations
class RecommendationRequest(BaseModel):
    user_id: str

# Endpoint to get recommendations based on the user_id
@app.post("/get_recommendations")
def get_recommendations(request: RecommendationRequest, token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    try:
        # Decoding the token to validate user
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=403, detail="Invalid token")

        # Fetch recommendations for the user
        recommendations = recomm_data.get(request.user_id)

        if not recommendations:
            raise HTTPException(status_code=404, detail="No recommendations found for this user")

        return {"recommendations": recommendations}
    except JWTError as e:
        print(f"JWT Error: {e}")
        raise HTTPException(status_code=403, detail="Invalid token")
    except Exception as e:
        print(f"Error fetching recommendations: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")
