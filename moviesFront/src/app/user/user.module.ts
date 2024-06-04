import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserLayoutComponent } from './layout/userLayout/userLayout.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from './components/card/card.component';
import { FavoriteMoviesComponent } from './pages/favorite-movies/favorite-movies.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    UserLayoutComponent,
    UserProfileComponent,
    FavoriteMoviesComponent,
    CardComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class UserModule { }
