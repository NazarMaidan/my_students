import { Component, inject, signal, WritableSignal } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CategoryQuestionComponent } from '../../components/category-question/category-question.component';
import { CATEGORIES, CATEGORY_BY_CLASS, QUESTIONS } from '../../constants/categories.list';
import { StudentsStore } from '../../store/students.store';

@Component({
  selector:'app-category',
  imports:[MatDialogModule],
  templateUrl:'./category.component.html',
  standalone:true,
  styleUrl:'./category.component.scss',
})
export class CategoryComponent {
  readonly dialog = inject(MatDialog);
  readonly studentsStore = inject(StudentsStore);

  selectedClass: WritableSignal<number> = signal(this.studentsStore.selectedClass());
  availableCategories: Set<number> = new Set([...CATEGORY_BY_CLASS[this.selectedClass()]]);
  categoryListOnePoint: WritableSignal<any> = signal(CATEGORIES.filter((cat: any) => cat.points === 1 && this.availableCategories.has(cat.id)));
  categoryListTwoPoint: WritableSignal<any> = signal(CATEGORIES.filter((cat: any) => cat.points === 2 && this.availableCategories.has(cat.id)));
  questionList: WritableSignal<any> = signal(QUESTIONS);

  show(category: any): void {
    this.dialog.open(CategoryQuestionComponent, {
      data: {
        category,
        question: getRandomElement(this.questionList()[category.id])},
      position: {top: '50px'},
      maxWidth: 1200
    });
  }
}

function getRandomElement(array: any): string {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
