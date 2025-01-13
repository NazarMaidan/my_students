import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CategoryQuestionComponent } from '../../components/category-question/category-question.component';
import { CATEGORIES, QUESTIONS } from '../../constants/categories.list';

@Component({
  selector:'app-category',
  imports:[MatDialogModule],
  templateUrl:'./category.component.html',
  standalone:true,
  styleUrl:'./category.component.scss',

})
export class CategoryComponent {
  categoryList: any[] = CATEGORIES;
  questionList: any = QUESTIONS;
  readonly dialog = inject(MatDialog);

  show(category: any): void {
    const dialogRef = this.dialog.open(CategoryQuestionComponent, {
      data: {category, question: getRandomElement(this.questionList[category.id])},
      position: {top: '50px'},
      maxWidth: 800
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
}

function getRandomElement(array: any): string {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
