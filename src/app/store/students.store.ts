import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { map, tap } from 'rxjs';
import { FirebaseService } from '../services/firebase.service';

type StudentsState = {
  students: any[];
  isLoading: boolean;
  filterParams: {selectedClass: number, selectedStudent: any | null}
}

const initialState: StudentsState = {
  students: [],
  isLoading: false,
  filterParams: {selectedClass: 4, selectedStudent: null}
}

export const StudentsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ students, filterParams: {selectedClass} }) => ({
    classStudents: computed(() => students().filter((st: any) => st.class === selectedClass())),
    selectedClass: computed(() => selectedClass())
  })),
  withMethods((store: any, firebaseService = inject(FirebaseService)) => ({
    keepStudents(students: any[]): void {
      patchState(store, {students})
    },
    addOnePoint(student: any): void {
      firebaseService.addPoint(student.id, { ...student, marapr: +student.marapr + 1 } )
    },
    setActiveClass(selectedClass: number): void {
      patchState(store, (state: any) => ({filterParams: {...state.filterParams, selectedClass}}))
    }
  })),
  withHooks((store: any, firebaseService = inject(FirebaseService)) => ({
    onInit() {
      firebaseService.getStudents().pipe(
        map((students: any) => students.sort((a: any, b: any) => b.marapr - a.marapr)),
      ).subscribe((students) => store.keepStudents(students));
    }
  }))

)

