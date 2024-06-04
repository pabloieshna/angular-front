import { Movie } from "./movie.inteface";

export interface Review {
  id?: string;
  user:string; // Información del usuario
  movie:Movie; // Información de la película
  rating: number;
  comment: string;
}
