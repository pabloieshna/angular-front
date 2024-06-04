import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-layaout-page',
  templateUrl: './layaout-page.component.html',
  styleUrl: './layaout-page.component.css',
})
export class LayaoutPageComponent {



  private authService = inject( AuthService );
  private router = inject( Router );

  public sidebarItems = [
    { label: 'Listado', icon: 'label', url: 'movies/list'},
    { label: 'Mi página', icon: 'person', url: 'user/profile'},
    // { label: 'Buscar', icon: 'search', url: './search'},
  ];

  constructor() { }

  onLogout() {
    this.authService.logout();
  }

  move(url: string) {
    this.router.navigateByUrl(url)
    }
}
