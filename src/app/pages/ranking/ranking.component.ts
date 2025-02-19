import { Component, inject } from '@angular/core';
import { TableComponent } from '../../components/table/table.component';
import { StudentsStore } from '../../store/students.store';
import { Student } from '../../types/student.type';

@Component({
  selector:'app-ranking',
  imports:[TableComponent],
  templateUrl:'./ranking.component.html',
  standalone:true,
  styleUrl:'./ranking.component.scss'
})
export class RankingComponent {
  studentsStore = inject(StudentsStore);

  public onAdd(student: Student): void {
    this.studentsStore.addOnePoint(student)
  }

}
