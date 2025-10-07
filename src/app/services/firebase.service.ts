import { inject, Injectable } from '@angular/core';
import { collection, collectionData, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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
  http = inject(HttpClient);
  collection = collection(this.firestore, 'students');

  constructor() { }

  getWords(): Observable<[string, string][]> {
    return this.http.get<[string, string][]>('/assets/words.json');
  }

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
