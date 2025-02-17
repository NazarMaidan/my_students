import { Component, computed, inject, Signal, signal, WritableSignal } from '@angular/core';
import { LIST } from '../../constants/students.list';
import { StudentsStore } from '../../store/students.store';

@Component({
  selector: 'app-achievement',
  imports: [],
  standalone: true,
  templateUrl: './achievement.component.html',
  styleUrl: './achievement.component.scss'
})
export class AchievementComponent {
  studentsStore = inject(StudentsStore);

  selectedClass = signal(this.studentsStore.selectedClass());
  selectedList: Signal<any> = computed(() => LIST[this.selectedClass()]);
}
