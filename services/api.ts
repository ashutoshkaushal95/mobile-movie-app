import Constants from "expo-constants";

console.log("🔥 ENV KEY:", process.env.EXPO_PUBLIC_MOVIE_API_KEY);
console.log("🔥 Constants.extra:", Constants.expoConfig?.extra);

export const FANART_CONFIG = {
  BASE_URL: "https://webservice.fanart.tv/v3",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  },
};
export const fetchMovies = async () => {
  const response = await fetch(
    `${FANART_CONFIG.BASE_URL}/movies/latest?api_key=${FANART_CONFIG.API_KEY}`
  );
  const data = await response.json();
  return data;
};

export const getPoster = async (movieId: string) => {
  const response = await fetch(
    `${FANART_CONFIG.BASE_URL}/movies/${movieId}?api_key=${FANART_CONFIG.API_KEY}`
  );
  const data = await response.json();
  return data;
};
