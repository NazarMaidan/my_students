import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LIST } from '../../constants/students.list';
import { StudentsStore } from '../../store/students.store';


@Component({
  selector: 'app-random',
  imports: [CommonModule],
  templateUrl: './random.component.html',
  standalone: true,
  styleUrl: './random.component.scss'
})
export class RandomComponent {
  studentsStore = inject(StudentsStore);

  selectedClass = signal(this.studentsStore.selectedClass() || 2);
  selectedList = computed(() => LIST[this.selectedClass()]);

  activeItem:any | null = null;
  selectedItems:Set<string> = new Set();

  onSelectStudent() {
    const result = this.selectedList().filter((el:any) => !this.selectedItems.has(el.name));
    this.randomElementWithIntervals(result);
  }

  randomElementWithIntervals(arr:any) {
    let interval = 200; // 0.3 секунди
    let duration = 4000; // 3 секунди
    let elapsed = 0;

    let timer = setInterval(() => {
      let randomIndex = Math.floor(Math.random()*arr.length);
      this.activeItem = arr[randomIndex];
      elapsed += interval;

      if(elapsed>=duration){
        clearInterval(timer);
        let finalIndex = Math.floor(Math.random()*arr.length);
        this.activeItem = arr[finalIndex];
        this.updateSelectedList(this.activeItem);
      }
    }, interval);
  }

  updateSelectedList(item:any) {
    this.selectedItems.add(item.name);
  }

  onToggleStudent(name:string) {
    if(this.selectedItems.has(name)){
      this.selectedItems.delete(name);
    } else{
      this.selectedItems.add(name);
    }
  }

  onClearList() {
    this.selectedItems.clear();
  }
}
