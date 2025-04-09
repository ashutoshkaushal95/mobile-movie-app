import MoviePoster from "@/components/MoviePoster";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function Index() {
  const router = useRouter();
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refetch,
    reset,
  } = useFetch(fetchMovies, true);

  const placeholderImage =
    "https://via.placeholder.com/150x225.png?text=No+Image";

  console.log("🎥 Movies fetched:", JSON.stringify(movies, null, 2));

  // Handle edge case: movies is not an array
  if (!Array.isArray(movies)) {
    return (
      <View className="flex-1 justify-center items-center bg-red-800">
        <Text className="text-white text-lg font-bold">
          ❌ Invalid movie data
        </Text>
        <Text className="text-white mt-2 underline" onPress={() => refetch()}>
          Retry
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

        {moviesLoading ? (
          <ActivityIndicator
            size="large"
            color="#ab8bff"
            className="mt-10 self-center"
          />
        ) : moviesError && !movies ? (
          <View className="flex-1 justify-center items-center">
            <Text className="text-white text-lg font-semibold">
              Something went wrong
            </Text>
            <Text className="text-white text-lg font-semibold">
              {moviesError}
            </Text>
            <Text
              className="text-white text-lg font-semibold underline mt-2"
              onPress={refetch}
            >
              Try again
            </Text>
          </View>
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar
              onPress={() => router.push("/search")}
              placeholder="Search for a movie"
            />

            <Text className="text-white text-lg font-semibold mt-5 mb-3">
              Popular Movies
            </Text>

            <FlatList
              data={movies}
              keyExtractor={(item) => item.imdb_id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingRight: 10 }}
              ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
              renderItem={({ item }) => {
                try {
                  return <MoviePoster key={item.tmdb_id + Date.now()} item={item} />;
                } catch (e) {
                  console.error("❌ Error rendering movie:", e);
                  return (
                    <View className="w-32 h-48 bg-red-500 justify-center items-center rounded">
                      <Text className="text-white text-xs text-center px-2">
                        Error rendering movie
                      </Text>
                    </View>
                  );
                }
              }}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}
