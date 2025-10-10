import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseService } from '../../services/firebase.service';
import { FlashCardsComponent } from '../../components/flash-cards/flash-cards.component';
import { MatchCardsComponent } from '../../components/match-cards/match-cards.component';
import { TestGameComponent } from '../../components/test-game/test-game.component';
import { WriteMeComponent } from '../../components/write-me/write-me.component';

type GameType = 'SELECTION' | 'FLASH_CARDS' | 'MATCH_CARDS' | 'TEST_GAME' | 'WRITE_ME';

interface Game {
  id: GameType;
  name: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-hundred-words',
  standalone: true,
  imports: [
    CommonModule,
    FlashCardsComponent,
    MatchCardsComponent,
    TestGameComponent,
    WriteMeComponent
  ],
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
    },
    {
      id: 'TEST_GAME',
      name: 'Test (1 out of 4)',
      description: 'Practice your vocabulary with multiple choice questions',
      icon: '✍️'
    },
    {
      id: 'WRITE_ME',
      name: 'Write Me',
      description: 'Practice spelling by writing the translations',
      icon: '✏️'
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
