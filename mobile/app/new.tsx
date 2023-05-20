/* eslint-disable prettier/prettier */
import {
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import Icon from "@expo/vector-icons/Feather";

import NlwLogo from "../src/assets/nlw-spacetime-logo.svg";
import { Link } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";

export default function NewMemory() {
  const { bottom, top } = useSafeAreaInsets();

  const [isPublic, setIsPublic] = useState(false);

  return (
    <ScrollView
      className="flex-1 px-8"
      contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}
    >
      <View className="mt-4 flex-row items-center justify-between">
        <NlwLogo />

        <Link href="/memories" asChild>
          <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-purple-500">
            <Icon name="arrow-left" size={16} color="#fff" />
          </TouchableOpacity>
        </Link>
      </View>

      <View className="mt-6 space-y-6">
        <View className="flex-row items-center gap-2">
          <Switch
            value={isPublic}
            onValueChange={setIsPublic}
            trackColor={{ true: "#372560", false: "#767577" }}
            thumbColor={isPublic ? "#9B79EA" : "#9e9ea0"}
          />
          <Text className="font-body text-base text-gray-200">
            Tornar memória pública
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          className="bg-black-20 h-32 items-center justify-center rounded-lg border-dashed border-gray-500"
        >
          <View className="flex-row items-center gap-2">
            <Icon name="image" color="#fff" />

            <Text className="font-body text-sm text-gray-200">
              Adicionar foro ou vídeo de capa
            </Text>
          </View>
        </TouchableOpacity>

        <TextInput
          multiline
          className="p-0 font-body text-lg text-gray-50"
          placeholderTextColor="#56565a"
          placeholder="Fique livre para adicionar fotos, vídeos, relatos sobre novas experiências e muito mais!"
        />

        <TouchableOpacity
          activeOpacity={0.7}
          className="items-center self-end rounded-full bg-green-500"
        >
          <Text className="font-alt text-sm uppercase text-black">Salvar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
