import { CommonModule } from '@angular/common';
import { Component, inject, input, InputSignal, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Student } from '../../types/student.type';

@Component({
  selector:'app-table',
  imports:[CommonModule, FormsModule],
  templateUrl:'./table.component.html',
  standalone:true,
  styleUrl:'./table.component.scss'
})
export class TableComponent {
  students: InputSignal<Student[] | any> = input([]);
  blurTotal: WritableSignal<boolean> = signal(true);
  private router = inject(Router);

  enterPass = false;
  password = '';

  public onBlur(): any {
    this.blurTotal.set(!this.blurTotal());
  }
  public showPass(): any {
    this.enterPass = true;
  }

  public checkPassword(event: KeyboardEvent): void {
    if (event.key === 'Enter' && this.password === 'nazar2305') {
      this.router.navigate([], {
        queryParams: { allowEdit: 'true' },
        queryParamsHandling: 'merge'
      });
      this.enterPass = false;
      this.password = '';
    }
  }
}
