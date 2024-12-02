import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { map, Observable, shareReplay, Subject, switchMap } from 'rxjs';
import { TableComponent } from '../../components/table/table.component';
import { FirebaseService } from '../../services/firebase.service';

interface Student {
  id: string;
  points: number;
  name: string;
  nov: number;
  dec: number;
}

@Component({
  selector: 'app-home',
  standalone: true, imports:[AsyncPipe, TableComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  firebaseService = inject(FirebaseService);

  selectedClasses: Set<number> = new Set<number>();
  private triggerUpdate$ = new Subject<void>();

  students: Observable<Student[]> = this.triggerUpdate$.pipe(
    switchMap(() => this.firebaseService.getStudents().pipe(shareReplay(1))),
    map((students: any) => students.filter((el: any) => this.selectedClasses.has(el.class))),
    map((students: any) => students.sort((a: any, b: any) => (b.nov + b.dec) - (a.nov + b.dec))),
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
