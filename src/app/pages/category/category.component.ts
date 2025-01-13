import { Component } from '@angular/core';
import { CATEGORIES } from '../../constants/categories.list';

@Component({
    selector: 'app-category',
    imports: [],
    templateUrl: './category.component.html',
    styleUrl: './category.component.scss'
})
export class CategoryComponent {
  categoryList: any[] = CATEGORIES;
}
