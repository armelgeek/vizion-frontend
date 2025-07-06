export const API_ENDPOINTS = {
  endpoint: {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api",
    version: "v1",
  },
  tmdb: {
    baseUrl: process.env.NEXT_PUBLIC_TMDB_API_URL,
    apiKey: process.env.NEXT_PUBLIC_TMDB_API_KEY,
    token: process.env.NEXT_PUBLIC_TMDB_API_TOKEN,
  }
};
