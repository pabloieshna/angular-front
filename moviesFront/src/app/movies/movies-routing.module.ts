import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayaoutPageComponent } from './pages/layaout-page/layaout-page.component';
import { MoviesListComponent } from './pages/movies-list/movies-list.component';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail.component';

// loaclhost:4200/movies
const routes: Routes = [
  {
    path: '',
    component: LayaoutPageComponent,
    children: [
      { path: 'list', component: MoviesListComponent},
      { path: ':id', component: MovieDetailComponent },
      { path: '**', redirectTo: 'list'},




    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }
