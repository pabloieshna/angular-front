import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../../../enviroments/enviroment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of, retry, tap, throwError } from 'rxjs';

import { AuthStatus, CheckTokenResponse, LoginResponse, RegisterUser, User } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly authBaseUrl: string = environment.authBaseUrl
  private http = inject( HttpClient );

  private _currentUser = signal<User|null>(null);
  private _authStatus = signal<AuthStatus>( AuthStatus.checking );

  public currentUser = computed( () => this._currentUser() );
  public authStatus = computed( () => this._authStatus() );

  constructor() {
    this.checkAuthStatus().subscribe();
  }

  private setAuthentication(user: User, token: string): boolean {
    this._currentUser.set( user );
        this._authStatus.set( AuthStatus.authenticated );
        localStorage.setItem('token', token);
        return true;
  }


  login( email: string, password: string ): Observable<boolean>{

    const url = `${ this.authBaseUrl }/auth/login`
    const body = { email, password };


    return this.http.post<LoginResponse>( url, body )
    .pipe(
      map( ({user, token}) =>{
        this.setAuthentication( user, token)
      }),

      map( () => true ),

      catchError( err => throwError( () =>  err.error ))
    )
  }

  checkAuthStatus():Observable<boolean> {

    const url = `${ this.authBaseUrl }/auth/chek-token`;
    const token = localStorage.getItem('token');

    if ( !token ) {
      this.logout();
      return of(false);
    };

    const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${ token }`);

    return this.http.get<CheckTokenResponse>(url, { headers })
    .pipe(
      map(({user, token}) =>{
        this.setAuthentication( user, token)

        return true;
      }),
      // Error
      catchError(() => {
        this._authStatus.set( AuthStatus.noAuthenticated );
        return of(false);
      })
    )
  }

  logout() {
    localStorage.removeItem('token');
    this._currentUser.set( null );
    this._authStatus.set( AuthStatus.noAuthenticated );
  }

  register( userRegister: RegisterUser): Observable<boolean>{

    const url = `${ this.authBaseUrl }/auth/register`;

    return this.http.post<LoginResponse>(url, userRegister )
    .pipe(
      map( () =>{
        this._authStatus.set( AuthStatus.noAuthenticated);
      }),

      map( () => true ),

     catchError( err => throwError( () =>  err.error ))
    )
  }
}
