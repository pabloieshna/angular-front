import { Injectable, inject } from '@angular/core';
import { environment } from '../../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '../interfaces/review.interface';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private readonly baseUrl = environment.springBaseUrl;
  private http = inject( HttpClient );

  addReview(review: Review): Observable<Review> {
    console.log('ReviewService:')
    console.log(review)
    return this.http.post<Review>(`${this.baseUrl}/api/v1/reviews`, review);
  }

  getReviewsByUser(userId: string): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.baseUrl}/api/v1/reviews/user/${userId}`);
  }

  getReviewsByMovie(movieId: string): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.baseUrl}/api/v1/reviews/movie/${movieId}`);
  }

  updateReview(id: string, review: Review): Observable<Review> {
    return this.http.put<Review>(`${this.baseUrl}/api/v1/reviews/${id}`, review);
  }

  deleteReview(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/api/v1/reviews/${id}`);
  }

  getAllReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.baseUrl}/api/v1/reviews`);
  }

}
