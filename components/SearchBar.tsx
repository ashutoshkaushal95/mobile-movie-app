import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";

interface SearchBarProps {
  onPress?: () => void;
  placeholder: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onPress, placeholder }) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
      <Image
        source={icons.search}
        className="size-5"
        resizeMode="contain"
        tintColor={"#ab8bff"}
      />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={"#ab8bff"}
        className="flex-1 text-white ml-2"
        onPress={onPress}
        value=""
        onChangeText={() => {}}
      />
    </View>
  );
};

export default SearchBar;
