export interface TmdbCast {
  cast_id?: number;
  character?: string;
  credit_id?: string;
  gender?: number;
  id: number;
  name: string;
  order?: number;
  profile_path?: string | null;
}

export interface TmdbCreditsResponse {
  id: number;
  cast: TmdbCast[];
  crew: any[];
}
