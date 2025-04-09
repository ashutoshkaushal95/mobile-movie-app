import { Stack } from "expo-router";
import "./globals.css";
import { useEffect } from "react";
import { LogBox } from "react-native";
export default function RootLayout() {
  useEffect(() => {
    LogBox.ignoreAllLogs(); // Optional for dev cleanup
    console.log("✅ RootLayout rendered");
  }, []);

  return <Stack screenOptions={{ headerShown: false }} />;
}
