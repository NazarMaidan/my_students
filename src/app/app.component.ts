import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { StudentsStore } from './store/students.store';
import { ClassSelectionComponent } from './components/class-selection/class-selection.component';

@Component({
  selector:'app-root',
  imports:[CommonModule, RouterOutlet, NavComponent, ClassSelectionComponent],
  templateUrl:'./app.component.html',
  standalone:true,
  styleUrl:'./app.component.scss'
})
export class AppComponent {
  studentsStore = inject(StudentsStore);
}
