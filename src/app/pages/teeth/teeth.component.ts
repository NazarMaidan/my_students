import { Component, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-teeth',
  imports: [],
  standalone: true,
  templateUrl: './teeth.component.html',
  styleUrl: './teeth.component.scss'
})
export class TeethComponent {
  list = [
    'sad',
    'mad',
    'pet',
    'dad',
    'met',
    'pot',
    'rot',
    'dim',
    'him',
    'Tim',
    'wag',
    'fox',
    'pup',
    'bus',
    'sup',
    'up',
    'dash',
    'shot',
    'mash',
    'fish',
    'wish',
    'chat',
    'mush',
    'chap',
    'chip',
    'chill',
    'fool',
    'tool',
  ];

  hard: string[] = [
'sad',
    'ate',
    'mate',
    'fate',
    'cube',
    'use',
    'cute',
    'made',
    'him',
    'lade',
    'wag',
    'fox',
    'cane',
    'bus',
    'sup',
    'up',
    'dash',
    'shot',
    'mash',
    'fish',
    'wish',
    'chat',
    'mush',
    'chap',
    'chip',
    'chill',
    'fool',
    'tool',
  ];

  have: string[] = [];

  selectedList: WritableSignal<string[]> = signal([]);

  add(item: string) {
    this.have.push(item);
  }

  onEasy() {
    this.selectedList.set(this.list);
  }

  onHard(){
    this.selectedList.set(this.hard);
  }
}
