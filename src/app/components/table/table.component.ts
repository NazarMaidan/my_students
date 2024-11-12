import { CommonModule } from '@angular/common';
import { Component, inject, input, InputSignal } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';

interface Student {
  id: string;
  points: number;
  name: string;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  students: InputSignal<Student[] | any> = input([]);

  firebaseService = inject(FirebaseService);

  public onAdd(student: any): any {
    this.firebaseService.addPoint(student.id, { ...student, points: student.points + 1 } );
  }

}
