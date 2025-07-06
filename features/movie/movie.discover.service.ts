import { Movie } from './movie.schema';

const TMDB_API_URL = process.env.NEXT_PUBLIC_TMDB_API_URL;
const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const TMDB_API_TOKEN = process.env.NEXT_PUBLIC_TMDB_API_TOKEN;

export interface DiscoverMovieParams {
  page?: number;
  year?: string;
  with_genres?: string;
  'vote_average.gte'?: string;
  query?: string;
}

export class MovieDiscoverService {
  static async discover(params: DiscoverMovieParams = {}): Promise<Movie[]> {
    const searchParams = new URLSearchParams();
    searchParams.set('api_key', TMDB_API_KEY!);
    if (params.page) searchParams.set('page', String(params.page));
    if (params.year) searchParams.set('year', params.year);
    if (params.with_genres) searchParams.set('with_genres', params.with_genres);
    if (params['vote_average.gte']) searchParams.set('vote_average.gte', params['vote_average.gte']);
    if (params.query) searchParams.set('query', params.query);
    const url = params.query
      ? `${TMDB_API_URL}/search/movie?${searchParams.toString()}`
      : `${TMDB_API_URL}/discover/movie?${searchParams.toString()}`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${TMDB_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    return data.results;
  }
}
