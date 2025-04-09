import { View, Text, Image, Pressable } from "react-native";
import React, { useState } from "react";
import { Link } from "expo-router";
import { getPoster } from "@/services/api";
import useFetch from "@/services/useFetch";

const MoviePoster = ({ item }) => {
  const { data, loading, error } = useFetch(
    () => getPoster(item.imdb_id),
    true
  );

  const [imageError, setImageError] = useState(false);

  const placeholderImage = "https://placehold.co/150x225?text=No+Image";

  const getImageUri = (data) => {
    if (!data) return null;

    const imageKeysPriority = [
      "hdmovielogo",
      "movieposter",
      "moviebanner",
      "moviebackground",
      "moviethumb",
    ];

    for (let key of imageKeysPriority) {
      if (Array.isArray(data[key]) && data[key].length > 0) {
        return data[key][0].url;
      }
    }

    return null;
  };

  const imageUri = !imageError && !error ? getImageUri(data) : null;
  const finalImageUri = imageUri || placeholderImage;

  return (
    <Link href={`/movie/${item.imdb_id}`} asChild>
      <Pressable className="w-32">
        <Image
          source={{ uri: finalImageUri }}
          style={{
            width: 128,
            height: 192,
            borderRadius: 8,
            backgroundColor: "#222",
            margin: 8,
          }}
          resizeMode="cover"
          onError={() => {
            console.log("📛 Image failed to load:", imageUri);
            setImageError(true);
          }}
        />
        <Text className="text-white mt-2 text-sm font-medium" numberOfLines={1}>
          {item.name}
        </Text>
      </Pressable>
    </Link>
  );
};

export default MoviePoster;
