import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector:'app-nav',
  imports:[],
  templateUrl:'./nav.component.html',
  standalone:true,
  styleUrl:'./nav.component.scss'
})
export class NavComponent {
  router = inject(Router);
  activeMenu:boolean = false;


  navTo(url:string) {
    this.router.navigate([url]);
  }

  onShowNav():void {
    this.activeMenu = !this.activeMenu;
  }
}
