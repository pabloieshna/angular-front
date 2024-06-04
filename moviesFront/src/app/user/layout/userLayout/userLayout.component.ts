import { Component, inject, computed, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../auth/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-layout',
  templateUrl: './userLayout.component.html',
  styleUrl: './userLayout.component.css',
})
export class UserLayoutComponent {



  private authService = inject( AuthService );
  private router = inject( Router );

  public sidebarItems = [
    { label: 'Listado', icon: 'label', url: 'movies/list'},
    { label: 'Mi página', icon: 'person', url: 'user/profile'},
    // { label: 'Buscar', icon: 'search', url: './search'},
  ];
  // public user = computed( () => this.authService.currentUser() );

  get user() {
    return this.authService.currentUser();
  }

  onLogout() {
    this.authService.logout();
    }

    move(url: string) {
      this.router.navigateByUrl(url)
      }
}
