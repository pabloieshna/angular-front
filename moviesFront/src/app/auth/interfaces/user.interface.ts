import { Movie } from "../../movies/interfaces/movie.inteface";

export interface User {
  _id:      string;
  email:    string;
  name:     string;
  username?: string;
  joinedDate: Date;
  favoriteGenres?: [string];
  favoriteMovies?: [string];
  bio?: string;
  profileImg?: string;
  isActive: boolean;
  roles:    string[];
}

