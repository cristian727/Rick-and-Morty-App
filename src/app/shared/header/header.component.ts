import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  visibility: boolean;

  constructor(private router: Router) {
    this.setVisivilty();
    this.visibility = false;
  }

  setVisivilty(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.visibility = true;
        console.log('está entrando');
      });
  }
}
