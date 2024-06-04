import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../enviroments/enviroment';
import { map, catchError, throwError, Observable, of } from 'rxjs';
import { UserEdit } from '../interfaces/user-edit.interface';
import { LoginResponse, User } from '../../auth/interfaces';
import { AuthService } from '../../auth/services/auth.service';
import Swal from 'sweetalert2';
import { UserProfile } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private readonly authBaseUrl: string = environment.authBaseUrl;
  private readonly springBaseUrl: string = environment.springBaseUrl;
  private http = inject( HttpClient );

  updateUserProfile(id: string, user: UserEdit): Observable<boolean> {
    const url = `${this.authBaseUrl}/auth/${id}`;
    return this.http.patch(url, user)
    .pipe(
      map(() => true),
      catchError( err => throwError( () =>  err.error ))
    );
  }

  findOneUser(userId: string): Observable<User> {
    const url = `${this.authBaseUrl}/auth/${userId}`;

    return this.http.get<User>(url).pipe(
      catchError(error => throwError(() => error))
    );
  }

  addFavoriteMovie(id: string, user: UserProfile | null) {
    if (!user) {
      return;
    }

    const { _id, isActive, joinedDate, roles, ...userEdit } = user;

    const url = `${this.authBaseUrl}/auth/${user._id}`;

    if (user.favoriteMovies) {
      const index = user.favoriteMovies.indexOf(id);
      if (index !== -1) {
        // ID exists, remove it from the array
        // user.favoriteMovies.splice(index, 1);
        return throwError(() => new Error('La película ya está en favoritos'));
      } else {
        // ID doesn't exist, add it to the array
        user.favoriteMovies.push(id);
      }
    } else {
      // Initialize the array and add the ID if it doesn't exist
      user.favoriteMovies = [id];
    }

    return this.http.patch<UserProfile>(url, userEdit).pipe(
      map(() => true),
      catchError(err => throwError(() => err.error))
    );
  }

}
