import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsStore } from '../../store/students.store';

@Component({
  selector: 'app-class-selection',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="class-selection">
      <h1>Select the Class</h1>
      <div class="class-buttons">
        @for (class of classes; track class) {
          <button 
            class="class-button" 
            (click)="selectClass(class)"
            [class.active]="class === studentsStore.selectedClass()">
            {{ class }}th Grade
          </button>
        }
      </div>
    </div>
  `,
  styles: [`
    .class-selection {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 2rem;
      background: #f8f9fa;
    }

    h1 {
      font-size: clamp(1.8rem, 4vw, 2.5rem);
      color: #2c3e50;
      margin-bottom: 2rem;
      text-align: center;
    }

    .class-buttons {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: 1rem;
      width: 100%;
      max-width: 600px;
    }

    .class-button {
      padding: 1.5rem;
      font-size: 1.2rem;
      border: none;
      border-radius: 8px;
      background: white;
      color: #2c3e50;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }

      &.active {
        background: #2c3e50;
        color: white;
      }
    }
  `]
})
export class ClassSelectionComponent {
  studentsStore = inject(StudentsStore);
  classes = [2, 3, 4, 5];

  selectClass(classNumber: number) {
    this.studentsStore.setActiveClass(classNumber);
  }
}