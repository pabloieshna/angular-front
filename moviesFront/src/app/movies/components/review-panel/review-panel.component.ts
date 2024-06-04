import { Component, ElementRef, Input, OnInit, ViewChild, inject } from '@angular/core';
import { Review } from '../../interfaces/review.interface';
import { User } from '../../../auth/interfaces';
import { UserService } from '../../../user/service/user.service';
import { MatExpansionPanel } from '@angular/material/expansion';

@Component({
  selector: 'movie-review-panel',
  templateUrl: './review-panel.component.html',
  styleUrls: ['./review-panel.component.css']
})
export class ReviewPanelComponent implements OnInit{

  @Input()
  review!: Review;

  user?: User

  @ViewChild('panel') panel!: MatExpansionPanel;

  // Método para abrir o cerrar el panel
  togglePanel() {
    if (this.panel) {
      this.panel.expanded = !this.panel.expanded;
    }
  }


  private userService = inject( UserService );


  ngOnInit(): void {
    console.log(this.review)
    if (!this.review) {throw new Error('Es necesario introducir una review');}

    this.userService.findOneUser(this.review.user)
    .subscribe(
      user => this.user = user
    );
  }


  getUserRatingStars() {
    return Array(this.review.rating).fill(1);
  }




}
