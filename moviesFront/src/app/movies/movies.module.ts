import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesListComponent } from './pages/movies-list/movies-list.component';
import { LayaoutPageComponent } from './pages/layaout-page/layaout-page.component';
import { MoviesRoutingModule } from './movies-routing.module';
import { MaterialModule } from '../material/material.module';
import { CardComponent } from './components/card/card.component';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail.component';
import { ReviewPanelComponent } from './components/review-panel/review-panel.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    MoviesListComponent,
    LayaoutPageComponent,
    CardComponent,
    MovieDetailComponent,
    ReviewPanelComponent,
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class MoviesModule { }
