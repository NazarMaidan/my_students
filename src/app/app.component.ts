import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';

@Component({
  selector:'app-root',
  imports:[CommonModule, RouterOutlet, NavComponent],
  templateUrl:'./app.component.html',
  standalone:true,
  styleUrl:'./app.component.scss'
})
export class AppComponent {


}
