import { Component, inject, OnInit, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector:'app-category-question',
  imports:[],
  templateUrl:'./category-question.component.html',
  standalone:true,
  styleUrl:'./category-question.component.scss'
})
export class CategoryQuestionComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<CategoryQuestionComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  categoryName = signal(this.data.category.name);
  question = signal(this.data.question);

  public ngOnInit():void {
    console.log(this.categoryName());
  }
}
