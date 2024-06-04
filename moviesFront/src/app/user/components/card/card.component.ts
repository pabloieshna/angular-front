import { Component, Input, OnInit, inject } from '@angular/core';

import { Movie } from '../../../movies/interfaces/movie.inteface';
import { UserService } from '../../../user/service/user.service';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'user-movie-card',
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

 }
