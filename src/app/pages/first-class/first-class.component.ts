import { Component } from '@angular/core';

@Component({
  selector: 'app-first-class',
  imports: [],
  templateUrl: './first-class.component.html',
  styleUrl: './first-class.component.scss'
})
export class FirstClassComponent {
  students: any[] = [
    { name: 'Sviatoslav', points: 18 },
    { name: 'Artem', points: 24 },
    { name: 'Iana', points: 19 },
    { name: 'Sofia', points: 3 },
    { name: 'Maksym', points: 0 },
  ];

  addPoint(student: any) {
    student.points += 1;
  }
}
