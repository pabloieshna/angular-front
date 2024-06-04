import { Review } from "./review.interface";

export interface Movie{
  id: string;
  imdbId: string;
  title: string;
  sypnosis: string;
  director: string;
  releaseDate: string;
  trailerLink: string;
  poster: string;
  genres: [string];
  backdrops: [string];
  clasification: string;
  actors: [string];
  reviewIds: [Review];
}
