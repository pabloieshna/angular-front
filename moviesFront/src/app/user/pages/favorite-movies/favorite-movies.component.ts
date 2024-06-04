import { Component, inject, OnInit } from '@angular/core';
import { Movie } from '../../../movies/interfaces/movie.inteface';
import { AuthService } from '../../../auth/services/auth.service';
import { MovieService } from '../../../movies/services/movie.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'user-favorite-movies',
  templateUrl: './favorite-movies.component.html',
  styleUrl: './favorite-movies.component.css',
})
export class FavoriteMoviesComponent implements OnInit{

  public movies: Movie[] = [];

  private authService = inject( AuthService );
  private movieService = inject( MovieService );
  private router = inject ( Router );
  // private authService = inject( AuthService );


  private moviesId = this.authService.currentUser()!.favoriteMovies!;

  ngOnInit(): void {
    if(!(this.moviesId.length > 0)){
      Swal.fire({
        title: '¡Oh, lo siento!',
        text: 'No tienes peliculas favoritas',
        icon: 'info',
        confirmButtonText: 'Ok',
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigateByUrl('movies/list')
        }
      });
    }
    for (let i = 0; i < this.moviesId.length; i++) {
      const movieId = this.moviesId[i];
      this.movieService.getMovieById(movieId)
      .subscribe({
        next: (movie) => this.movies.push(movie),
        error: ({message} ) => {
          Swal.fire('Error', message, 'error');
        }
      })
    }
  }

}
