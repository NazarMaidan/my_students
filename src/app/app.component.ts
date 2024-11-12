import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BehaviorSubject, map, Observable, shareReplay, startWith, Subject, switchMap } from 'rxjs';
import { TableComponent } from './components/table/table.component';
import { FirebaseService } from './services/firebase.service';
interface Student {
  id: string;
  points: number;
  name: string;
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports:[CommonModule, RouterOutlet, TableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  firebaseService = inject(FirebaseService);

  selectedClasses: Set<number> = new Set<number>();
  private triggerUpdate$ = new Subject<void>();

  students: Observable<Student[]> = this.triggerUpdate$.pipe(
    switchMap(() => this.firebaseService.getStudents().pipe(shareReplay(1))),
    map((students: any) => students.filter((el: any) => this.selectedClasses.has(el.class))),
    map((students: any) => students.sort((a: any, b: any) => b.points - a.points)),
  )

  onCheckboxChanged({ checked }: any, classRoom: number): void {
    if(checked) {
      this.selectedClasses.add(classRoom);
    } else {
      this.selectedClasses.delete(classRoom);
    }
    this.triggerUpdate$.next();
  }
}
