import { Component, OnInit, inject } from '@angular/core';
import { Movie } from '../../interfaces/movie.inteface';
import { Review } from '../../interfaces/review.interface';
import { MovieService } from '../../services/movie.service';
import { switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewService } from '../../services/review.service';
import { User } from '../../../auth/interfaces';
import Swal from 'sweetalert2';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css',
})
export class MovieDetailComponent implements OnInit{


  public movie?: Movie;
  public reviews: Review[] = [];
  public user?: User;

  private movieService = inject( MovieService);
  private reviewService = inject( ReviewService );
  private authService = inject ( AuthService );
  private acitvatedRoute = inject( ActivatedRoute );
  private router = inject ( Router );

  constructor() {}


  ngOnInit(): void {
    this.acitvatedRoute.params
    .pipe(
      switchMap( ({ id })  => this.movieService.getMovieById( id )),
    ).subscribe( movie => {

      if ( !movie ) return this.router.navigate([ '/list' ]);

      this.movie = movie;
      this.reviewService.getReviewsByMovie(this.movie!.id)
    .subscribe( reviews => {
      this.reviews = reviews
    })
      return;
    })
  }

  goBack(): void {
    this.router.navigateByUrl(this.router.url);
    history.back();
  }

  openAddReviewForm() {
    Swal.fire({
      title: 'Añadir Review',
      html:
        '<select id="puntuacion" class="swal2-select">' +
        '<option value="1">1</option>' +
        '<option value="2">2</option>' +
        '<option value="3">3</option>' +
        '<option value="4">4</option>' +
        '<option value="5">5</option>' +
        '</select>' +
        '<input id="mensaje" class="swal2-input" placeholder="Escribe tu mensaje">',
      focusConfirm: false,
      preConfirm: () => {
        console.log(this.authService.currentUser()?._id!);
        const rating = (document.getElementById('puntuacion') as HTMLSelectElement).value;
        const mensaje = (document.getElementById('mensaje') as HTMLInputElement).value;
        // Aquí puedes procesar la puntuación y el mensaje, por ejemplo, agregar la nueva review a la lista
        const newReview = {
          user: this.authService.currentUser()?._id!,
          movie: this.movie!,
          rating: parseInt(rating),
          comment: mensaje,
        };
        console.log('Review:')
        console.log(newReview);
        this.reviewService.addReview(newReview)
        .subscribe(()=> {
          this.reviewService.getReviewsByMovie(this.movie!.id)
    .subscribe( reviews => {
      this.reviews = reviews
    })
        })
      }
    });
  }
}
