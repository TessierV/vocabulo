import { Text, View } from "react-native";
import Onbording from "../components/Onbording"

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    <Onbording />
    </View>
  );
}
