import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { UserLayoutComponent } from './layout/userLayout/userLayout.component';
import { FavoriteMoviesComponent } from './pages/favorite-movies/favorite-movies.component';

const routes: Routes = [
{
  path: '',
  component: UserLayoutComponent,
  children: [
    { path: 'profile', component: UserProfileComponent },
    { path: 'favorites', component: FavoriteMoviesComponent },
    { path: '**', redirectTo: 'profile'} ,
  ]
}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
