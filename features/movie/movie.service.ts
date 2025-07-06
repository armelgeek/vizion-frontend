import { Movie } from './movie.schema';

const TMDB_API_URL = process.env.NEXT_PUBLIC_TMDB_API_URL;
const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const TMDB_API_TOKEN = process.env.NEXT_PUBLIC_TMDB_API_TOKEN;

export class MovieService {
  static async search(query: string, page = 1): Promise<Movie[]> {
    const res = await fetch(`${TMDB_API_URL}/search/movie?query=${encodeURIComponent(query)}&page=${page}&api_key=${TMDB_API_KEY}`, {
      headers: {
        Authorization: `Bearer ${TMDB_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    return data.results;
  }

  static async getPopular(page = 1): Promise<Movie[]> {
    const res = await fetch(`${TMDB_API_URL}/movie/popular?page=${page}&api_key=${TMDB_API_KEY}`, {
      headers: {
        Authorization: `Bearer ${TMDB_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    return data.results;
  }

  static async getDetail(id: string) {
    const res = await fetch(`${TMDB_API_URL}/movie/${id}?api_key=${TMDB_API_KEY}`, {
      headers: {
        Authorization: `Bearer ${TMDB_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) throw new Error('Film introuvable');
    return res.json();
  }

  static async getCredits(id: string) {
    const res = await fetch(`${TMDB_API_URL}/movie/${id}/credits?api_key=${TMDB_API_KEY}`, {
      headers: {
        Authorization: `Bearer ${TMDB_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) throw new Error('Casting introuvable');
    return res.json();
  }

  static async getPersonDetail(id: string) {
    const res = await fetch(`${TMDB_API_URL}/person/${id}?api_key=${TMDB_API_KEY}`, {
      headers: {
        Authorization: `Bearer ${TMDB_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) throw new Error('Acteur introuvable');
    return res.json();
  }

  static async getPersonCredits(id: string) {
    const res = await fetch(`${TMDB_API_URL}/person/${id}/combined_credits?api_key=${TMDB_API_KEY}`, {
      headers: {
        Authorization: `Bearer ${TMDB_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) throw new Error('Filmographie introuvable');
    return res.json();
  }

  static async getRecommendations(id: string | number) {
    const res = await fetch(`${TMDB_API_URL}/movie/${id}/recommendations?api_key=${TMDB_API_KEY}`, {
      headers: {
        Authorization: `Bearer ${TMDB_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) throw new Error('Aucune recommandation trouvée');
    return res.json();
  }

  static async getTrending() {
    const res = await fetch(`${TMDB_API_URL}/trending/movie/week?api_key=${TMDB_API_KEY}`, {
      headers: {
        Authorization: `Bearer ${TMDB_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) throw new Error('Aucune tendance trouvée');
    return res.json();
  }

  static async getVideos(id: string) {
    const res = await fetch(`${TMDB_API_URL}/movie/${id}/videos?api_key=${TMDB_API_KEY}`, {
      headers: {
        Authorization: `Bearer ${TMDB_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) throw new Error('Aucune vidéo trouvée');
    return res.json();
  }

  static async getSimilar(id: string) {
    const res = await fetch(`${TMDB_API_URL}/movie/${id}/similar?api_key=${TMDB_API_KEY}`, {
      headers: {
        Authorization: `Bearer ${TMDB_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) throw new Error('Aucun film similaire trouvé');
    return res.json();
  }

  static async getUpcoming() {
    const res = await fetch(`${TMDB_API_URL}/movie/upcoming?api_key=${TMDB_API_KEY}`, {
      headers: {
        Authorization: `Bearer ${TMDB_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) throw new Error('Aucun film à venir trouvé');
    return res.json();
  }

  static async getTopRated() {
    const res = await fetch(`${TMDB_API_URL}/movie/top_rated?api_key=${TMDB_API_KEY}`, {
      headers: {
        Authorization: `Bearer ${TMDB_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) throw new Error('Aucun top film trouvé');
    return res.json();
  }
}
