import { Component, OnInit, inject } from '@angular/core';
import { Movie } from '../../interfaces/movie.inteface';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrl: './movies-list.component.css',
})
export class MoviesListComponent implements OnInit{

  public movies: Movie[] = [];


  private movieService = inject( MovieService )


  ngOnInit(): void {
    this.movieService.getMovies()
    .subscribe( movies => this.movies = movies );
  }


}
