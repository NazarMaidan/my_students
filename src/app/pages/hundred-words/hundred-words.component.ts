import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseService } from '../../services/firebase.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

interface FlashCard {
  engWord: string;
  ukrWord: string;
  isFlipped: boolean;
  isVisible: boolean;
  animationKey?: number;
  showEnglish: boolean;
}

interface MatchCard {
  word: string;
  isEnglish: boolean;
  isMatched: boolean;
  pairId: number;
}

type DisplayMode = 'ENG_TO_UKR' | 'UKR_TO_ENG' | 'RANDOM';
type GameType = 'SELECTION' | 'FLASH_CARDS' | 'MATCH_CARDS' | 'RANDOM_GAME';
type BoardSize = '4x4' | '4x5' | '6x6';

@Component({
  selector: 'app-hundred-words',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hundred-words.component.html',
  styleUrls: ['./hundred-words.component.scss'],
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
export class HundredWordsComponent implements OnInit {
  // Flash Cards properties
  allCards: FlashCard[] = [];
  visibleCards: FlashCard[] = [];
  currentIndex = 0;
  readonly FLIP_DURATION = 3000; // 3 seconds in milliseconds
  currentMode: DisplayMode = 'ENG_TO_UKR';
  currentGame: GameType = 'SELECTION';

  // Match Cards properties
  matchCards: MatchCard[] = [];
  selectedCard: MatchCard | null = null;
  boardSize: BoardSize = '4x4';
  matchedPairs = 0;
  totalPairs = 8; // Default for 4x4

  games = [
    {
      id: 'FLASH_CARDS' as GameType,
      name: 'Flash Cards',
      description: 'Practice vocabulary with interactive flash cards',
      icon: '🎴'
    },
    {
      id: 'MATCH_CARDS' as GameType,
      name: 'Match Cards',
      description: 'Match pairs of English and Ukrainian words',
      icon: '🃏'
    },
    {
      id: 'RANDOM_GAME' as GameType,
      name: 'Random Game',
      description: 'Random word challenges and exercises',
      icon: '🎲'
    }
  ];

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    // Cards will be loaded when a game is selected
  }

  selectGame(gameType: GameType) {
    this.currentGame = gameType;
    if (gameType === 'FLASH_CARDS') {
      this.loadCards();
    } else if (gameType === 'MATCH_CARDS') {
      this.initializeMatchCards();
    }
  }

  goBack() {
    this.currentGame = 'SELECTION';
    this.visibleCards = [];
    this.currentIndex = 0;
    this.matchCards = [];
    this.selectedCard = null;
    this.matchedPairs = 0;
    this.boardSize = '4x4';
  }

  setBoardSize(size: BoardSize) {
    if (this.boardSize === size) return;
    this.boardSize = size;
    this.totalPairs = size === '4x4' ? 8 : size === '4x5' ? 10 : 18;
    this.matchedPairs = 0;
    this.selectedCard = null;
    this.initializeMatchCards();
  }

  shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  initializeMatchCards() {
    this.matchedPairs = 0;
    this.selectedCard = null;
    
    this.firebaseService.getWords().subscribe(words => {
      const shuffledWords = this.shuffleArray([...words]);
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
    });
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

  loadCards() {
    this.firebaseService.getWords().subscribe(words => {
      // First shuffle the words array
      const shuffledWords = this.shuffleArray([...words]);
      // Then create the cards from shuffled words
      this.allCards = shuffledWords.map(([engWord, ukrWord]) => ({
        engWord,
        ukrWord,
        isFlipped: false,
        isVisible: false,
        showEnglish: this.shouldShowEnglish()
      }));
      this.showNextCards();
    });
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
    this.loadCards();
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