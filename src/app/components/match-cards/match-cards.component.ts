import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface MatchCard {
  word: string;
  isEnglish: boolean;
  isMatched: boolean;
  pairId: number;
}

type BoardSize = '4x4' | '4x5' | '6x6';

@Component({
  selector: 'app-match-cards',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="match-cards">
      <h1>Match Cards</h1>
      <div class="board-size-buttons">
        <button [class.active]="boardSize === '4x4'" (click)="setBoardSize('4x4')">4x4</button>
        <button [class.active]="boardSize === '4x5'" (click)="setBoardSize('4x5')">4x5</button>
        <button [class.active]="boardSize === '6x6'" (click)="setBoardSize('6x6')">6x6</button>
      </div>
      <div class="progress">
        <span>Matched Pairs: {{ matchedPairs }}/{{ totalPairs }}</span>
      </div>
      <div class="match-cards-grid" [class]="boardSize">
        @for (card of matchCards; track card.word) {
          <div class="match-card" 
               [class.matched]="card.isMatched"
               [class.selected]="card === selectedCard"
               (click)="handleCardClick(card)">
            <p>{{ card.word }}</p>
          </div>
        }
      </div>
    </div>
  `,
  styleUrls: ['./match-cards.component.scss']
})
export class MatchCardsComponent {
  @Input() set words(value: [string, string][]) {
    if (value) {
      this._words = value;
      this.initializeMatchCards();
    }
  }

  private _words: [string, string][] = [];
  matchCards: MatchCard[] = [];
  selectedCard: MatchCard | null = null;
  boardSize: BoardSize = '4x4';
  matchedPairs = 0;
  totalPairs = 8; // Default for 4x4

  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  setBoardSize(size: BoardSize) {
    if (this.boardSize === size) return;
    this.boardSize = size;
    this.totalPairs = size === '4x4' ? 8 : size === '4x5' ? 10 : 18;
    this.matchedPairs = 0;
    this.selectedCard = null;
    this.initializeMatchCards();
  }

  initializeMatchCards() {
    this.matchedPairs = 0;
    this.selectedCard = null;
    
    const shuffledWords = this.shuffleArray([...this._words]);
    const selectedWords = shuffledWords.slice(0, this.totalPairs);
    
    const cardPairs: MatchCard[] = [];
    selectedWords.forEach((word: [string, string], index: number) => {
      cardPairs.push({
        word: word[0],
        isEnglish: true,
        isMatched: false,
        pairId: index
      });
      cardPairs.push({
        word: word[1],
        isEnglish: false,
        isMatched: false,
        pairId: index
      });
    });

    this.matchCards = this.shuffleArray(cardPairs);
  }

  handleCardClick(card: MatchCard) {
    if (card.isMatched || (this.selectedCard && this.selectedCard === card)) {
      return;
    }

    if (!this.selectedCard) {
      this.selectedCard = card;
      return;
    }

    if (this.selectedCard.pairId === card.pairId) {
      this.selectedCard.isMatched = true;
      card.isMatched = true;
      this.selectedCard = null;
      this.matchedPairs++;

      if (this.matchedPairs === this.totalPairs) {
        setTimeout(() => {
          this.initializeMatchCards();
        }, 1000);
      }
    } else {
      this.selectedCard = null;
    }
  }
}