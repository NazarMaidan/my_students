import { CommonModule } from '@angular/common';
import { Component, input, InputSignal, signal, WritableSignal } from '@angular/core';
import { Student } from '../../types/student.type';

@Component({
  selector:'app-table',
  imports:[CommonModule],
  templateUrl:'./table.component.html',
  standalone:true,
  styleUrl:'./table.component.scss'
})
export class TableComponent {
  students: InputSignal<Student[] | any> = input([]);
  blurTotal: WritableSignal<boolean> = signal(true);

  public onBlur(): any {
    this.blurTotal.set(!this.blurTotal());
  }
}
