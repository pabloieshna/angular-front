import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isNotAuthenticatedGuard, isAuthenticatedGuard } from './auth/guards';

const routes: Routes = [
  {
    path: 'movies',
    canActivate: [ isAuthenticatedGuard ],
    loadChildren: () => import('./movies/movies.module').then( m => m.MoviesModule)
  },
  {
    path: 'auth',
    canActivate: [ isNotAuthenticatedGuard ],
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule)
  },
  {
    path: 'user',
    canActivate: [ isAuthenticatedGuard ],
    loadChildren: () => import('./user/user.module').then( m => m.UserModule)
  },
  {
    path: '**',
    redirectTo: 'auth'
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
