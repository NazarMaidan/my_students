import { Component } from '@angular/core';
import { CATEGORIES } from '../../constants/categories.list';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {
  categoryList: any[] = CATEGORIES;
}
