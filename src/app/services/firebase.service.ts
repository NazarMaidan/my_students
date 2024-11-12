import { inject, Injectable } from '@angular/core';
import { collection, collectionData, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';

interface Student {
  id: string;
  points: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  firestore = inject(Firestore);
  collection = collection(this.firestore, 'students');

  constructor() { }

  getStudents(): Observable<Student[] | any> {
    return collectionData(this.collection, {
      idField: 'id'
    })
  }

  addPoint(id: string, data: any): any {
    const docRef = doc(this.firestore, 'students/' + id);
    const promise = setDoc(docRef, data);
    return from(promise);
  }
}
