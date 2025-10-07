import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseService } from '../../services/firebase.service';
import { FlashCardsComponent } from '../../components/flash-cards/flash-cards.component';
import { MatchCardsComponent } from '../../components/match-cards/match-cards.component';

type GameType = 'SELECTION' | 'FLASH_CARDS' | 'MATCH_CARDS';

interface Game {
  id: GameType;
  name: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-hundred-words',
  standalone: true,
  imports: [CommonModule, FlashCardsComponent, MatchCardsComponent],
  templateUrl: './hundred-words.component.html',
  styleUrls: ['./hundred-words.component.scss']
})
export class HundredWordsComponent implements OnInit {
  currentGame: GameType = 'SELECTION';
  selectedWords: [string, string][] = [];

  games: Game[] = [
    {
      id: 'FLASH_CARDS',
      name: 'Flash Cards',
      description: 'Practice vocabulary with interactive flash cards',
      icon: '🎴'
    },
    {
      id: 'MATCH_CARDS',
      name: 'Match Cards',
      description: 'Match pairs of English and Ukrainian words',
      icon: '🃏'
    }
  ];

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    this.loadWords();
  }

  loadWords() {
    this.firebaseService.getWords().subscribe(words => {
      this.selectedWords = words;
    });
  }

  selectGame(gameType: GameType) {
    this.currentGame = gameType;
  }

  exitGame() {
    this.currentGame = 'SELECTION';
  }
}