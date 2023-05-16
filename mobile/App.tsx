/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-gray-900">
      <Text className="text-5xl font-bold text-gray-50">Rocketseat</Text>
      <StatusBar style="light" />
    </View>
  );
}
