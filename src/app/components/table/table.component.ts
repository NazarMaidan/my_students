import { CommonModule } from '@angular/common';
import { Component, inject, input, InputSignal } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';

interface Student {
  id: string;
  points: number;
  name: string;
  nov: number;
  dec: number;
  janfeb: number;
}

@Component({
  selector:'app-table',
  imports:[CommonModule],
  templateUrl:'./table.component.html',
  standalone:true,
  styleUrl:'./table.component.scss'
})
export class TableComponent {
  students: InputSignal<Student[] | any> = input([]);

  firebaseService = inject(FirebaseService);
  blurTotal: boolean = true;

  public onAdd(student: any): any {
    this.firebaseService.addPoint(student.id, { ...student, janfeb: +student.janfeb + 1 } );
  }

  public onBlur(): any {
    this.blurTotal = !this.blurTotal;
  }

}
