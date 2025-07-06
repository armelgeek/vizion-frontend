import { useQuery } from "@tanstack/react-query";
import { MovieService } from "../movie.service";

export function useMovieRecommendations(movieId: number) {
  return useQuery({
    queryKey: ["movie", movieId, "recommendations"],
    queryFn: () => MovieService.getRecommendations(movieId),
    enabled: !!movieId,
  });
}
