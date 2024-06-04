export interface UserEdit{
  email:    string | null;
  name:     string | null;
  profileImg: string | null;
  username: string | null;
  favoriteGenres: [string] | null;
  bio: string | null;
}
