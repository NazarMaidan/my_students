import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

interface FlashCard {
  engWord: string;
  ukrWord: string;
  isFlipped: boolean;
  isVisible: boolean;
  animationKey?: number;
  showEnglish: boolean;
}

type DisplayMode = 'ENG_TO_UKR' | 'UKR_TO_ENG' | 'RANDOM';

@Component({
  selector: 'app-flash-cards',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flash-cards">
      <h1>Flash Cards</h1>
      <div class="mode-buttons">
        <button [class.active]="currentMode === 'ENG_TO_UKR'" (click)="setMode('ENG_TO_UKR')">ENG → UKR</button>
        <button [class.active]="currentMode === 'UKR_TO_ENG'" (click)="setMode('UKR_TO_ENG')">UKR → ENG</button>
        <button [class.active]="currentMode === 'RANDOM'" (click)="setMode('RANDOM')">RANDOM</button>
      </div>
      <div class="progress">
        <span>Progress: {{ currentIndex }}/{{ allCards.length }}</span>
      </div>
      <div class="cards-container">
        @for (card of visibleCards; track card.engWord) {
          <div class="card" 
               [@cardAnimation]
               [class.flipped]="card.isFlipped"
               (click)="flipCard(card)">
            <div class="card-inner">
              <div class="card-front">
                <p>{{ card.showEnglish ? card.engWord : card.ukrWord }}</p>
              </div>
              <div class="card-back">
                <p>{{ card.showEnglish ? card.ukrWord : card.engWord }}</p>
                <div class="time-bar" [class.animate]="card.isFlipped" [attr.data-key]="card.animationKey"></div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styleUrls: ['./flash-cards.component.scss'],
  animations: [
    trigger('cardAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(-20px)' }))
      ])
    ])
  ]
})
export class FlashCardsComponent {
  @Input() set words(value: [string, string][]) {
    if (value) {
      this.initializeCards(value);
    }
  }

  allCards: FlashCard[] = [];
  visibleCards: FlashCard[] = [];
  currentIndex = 0;
  readonly FLIP_DURATION = 3000;
  currentMode: DisplayMode = 'ENG_TO_UKR';

  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  private initializeCards(words: [string, string][]) {
    const shuffledWords = this.shuffleArray(words);
    this.allCards = shuffledWords.map(([engWord, ukrWord]) => ({
      engWord,
      ukrWord,
      isFlipped: false,
      isVisible: false,
      showEnglish: this.shouldShowEnglish()
    }));
    this.currentIndex = 0;
    this.showNextCards();
  }

  shouldShowEnglish(): boolean {
    if (this.currentMode === 'ENG_TO_UKR') return true;
    if (this.currentMode === 'UKR_TO_ENG') return false;
    return Math.random() < 0.5;
  }

  setMode(mode: DisplayMode) {
    this.currentMode = mode;
    this.currentIndex = 0;
    this.visibleCards = [];
    this.initializeCards(this.allCards.map(card => [card.engWord, card.ukrWord]));
  }

  showNextCards() {
    this.visibleCards = this.visibleCards.filter(card => !card.isFlipped);

    while (this.visibleCards.length < 3 && this.currentIndex < this.allCards.length) {
      const nextCard = this.allCards[this.currentIndex];
      nextCard.isVisible = true;
      nextCard.isFlipped = false;
      this.visibleCards.push(nextCard);
      this.currentIndex++;
    }

    if (this.visibleCards.length === 0 && this.currentIndex >= this.allCards.length) {
      this.currentIndex = 0;
      this.allCards.forEach(card => card.isFlipped = false);
      this.showNextCards();
    }
  }

  flipCard(card: FlashCard) {
    if (!card.isFlipped) {
      card.animationKey = Date.now();
      card.isFlipped = true;
      
      setTimeout(() => {
        card.isVisible = false;
        this.showNextCards();
      }, this.FLIP_DURATION);
    }
  }
}