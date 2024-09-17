// config.js

const CONFIG = {
    House: 'http://192.168.0.12',
    School: 'http://192.168.1.1',
    House2: 'http://192.168.1.1',
  };

  const ENVIRONMENT = 'House';

  export default {
    BASE_URL: CONFIG[ENVIRONMENT],
  };
