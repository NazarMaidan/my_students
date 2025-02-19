import { Component, inject } from '@angular/core';
import { StudentsStore } from '../../store/students.store';

@Component({
  selector:'app-config',
  imports:[],
  templateUrl:'./config.component.html',
  standalone:true,
  styleUrl:'./config.component.scss'
})
export class ConfigComponent {
  studentsStore = inject(StudentsStore);

  public updateClass(classNumber: number): void {
    this.studentsStore.setActiveClass(classNumber)
  }
}
