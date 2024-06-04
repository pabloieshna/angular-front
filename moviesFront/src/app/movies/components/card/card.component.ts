import { Component, Input, OnInit, inject } from '@angular/core';

import { Movie } from '../../interfaces/movie.inteface';
import { UserService } from '../../../user/service/user.service';
import { AuthService } from '../../../auth/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'movies-movie-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent implements OnInit{

  @Input()
  public movie!: Movie;

  private userService = inject( UserService )
  private authService = inject( AuthService )


  ngOnInit(): void {
    if (!this.movie) {throw new Error('Es necesario introducir una película');}
  }

  addFavorite(){
      this.userService.addFavoriteMovie(this.movie.imdbId, this.authService.currentUser())!
      .subscribe({
        next: () => Swal.fire('Felicidades', 'La pelicula '+ this.movie.title +' ha sido añadida correctamente a sus favoritas', 'success'),
        error: ({message} ) => {
          Swal.fire('Error', message, 'error');
        }
      })
    }

 }
