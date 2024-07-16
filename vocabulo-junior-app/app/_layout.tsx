import { Stack } from "expo-router";
import { useFonts } from "expo-font";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
    </Stack>
  );
}
