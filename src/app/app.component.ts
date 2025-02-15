import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';


@Component({
  selector:'app-root',
  imports:[CommonModule, RouterOutlet],
  templateUrl:'./app.component.html',
  standalone:true,
  styleUrl:'./app.component.scss'
})
export class AppComponent {
  router = inject(Router);
  activeMenu: boolean = false;


  navTo(url: string) {
    this.router.navigate([url])
  }

  onShowNav(): void {
    this.activeMenu = !this.activeMenu;
  }

}
