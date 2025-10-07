import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test-game.component.html',
  styleUrls: ['./test-game.component.scss']
})
export class TestGameComponent implements OnInit {
  @Input() words: [string, string][] = [];
  @Output() gameExit = new EventEmitter<void>();

  currentQuestion: { word: string; options: string[]; correctAnswer: string } | null = null;
  selectedAnswer: string | null = null;
  isAnswered = false;

  ngOnInit() {
    this.generateNewQuestion();
  }

  generateNewQuestion() {
    if (!this.words.length) return;

    // Pick a random word pair
    const randomIndex = Math.floor(Math.random() * this.words.length);
    const [englishWord, ukrainianWord] = this.words[randomIndex];

    // Get 3 random wrong answers
    const wrongAnswers = this.getRandomWrongAnswers(ukrainianWord, 3);

    // Create options array with correct and wrong answers
    const options = [...wrongAnswers, ukrainianWord];
    
    // Shuffle options
    this.shuffleArray(options);

    this.currentQuestion = {
      word: englishWord,
      options: options,
      correctAnswer: ukrainianWord
    };

    this.selectedAnswer = null;
    this.isAnswered = false;
  }

  private getRandomWrongAnswers(correctAnswer: string, count: number): string[] {
    const wrongAnswers = new Set<string>();
    const allUkrainianWords = this.words.map(([_, ukr]) => ukr);

    while (wrongAnswers.size < count) {
      const randomWord = allUkrainianWords[Math.floor(Math.random() * allUkrainianWords.length)];
      if (randomWord !== correctAnswer) {
        wrongAnswers.add(randomWord);
      }
    }

    return Array.from(wrongAnswers);
  }

  private shuffleArray<T>(array: T[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  selectAnswer(answer: string) {
    if (this.isAnswered) return;
    
    this.selectedAnswer = answer;
    this.isAnswered = true;

    // Wait 3 seconds before showing next question
    setTimeout(() => {
      this.generateNewQuestion();
    }, 3000);
  }

  isCorrectAnswer(option: string): boolean {
    return this.isAnswered && option === this.currentQuestion?.correctAnswer;
  }

  isWrongAnswer(option: string): boolean {
    return this.isAnswered && 
           this.selectedAnswer === option && 
           option !== this.currentQuestion?.correctAnswer;
  }
}