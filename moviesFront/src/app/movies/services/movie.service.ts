import { HttpClient, HttpParams  } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../interfaces/movie.inteface';

import { environment } from '../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {


  // private youtubeApiUrl = 'https://www.googleapis.com/youtube/v3/videos';
  private readonly baseUrl = environment.springBaseUrl;
  private http = inject( HttpClient );

  getMovies():Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.baseUrl}/api/v1/movies`);
  }
  getMovieById( imdbID:string ){
    return this.http.get<Movie>(`${this.baseUrl}/api/v1/movies/${ imdbID }`)
  }
}
