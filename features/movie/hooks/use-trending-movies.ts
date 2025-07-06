import { useQuery } from "@tanstack/react-query";
import { MovieService } from "../movie.service";

export function useTrendingMovies() {
  return useQuery({
    queryKey: ["movies", "trending"],
    queryFn: () => MovieService.getTrending(),
  });
}
