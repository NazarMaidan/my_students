import { Component, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Question {
  word: string;
  translation: string;
  isAnswered: boolean;
}

@Component({
  selector: 'app-write-me',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="write-me">
      <div class="back-container">
        <button class="back-button" (click)="gameExit.emit()">
          <span class="back-icon">←</span> Back
        </button>
      </div>

      <h1>Write Me</h1>

      <div class="mode-buttons">
        <button [class.active]="isEngToUkr" (click)="switchMode(true)">ENG → UKR</button>
        <button [class.active]="!isEngToUkr" (click)="switchMode(false)">UKR → ENG</button>
      </div>

      <div class="question-container">
        <h2>{{ currentQuestion?.word }}</h2>

        <div class="input-container" [class.success]="isCorrect" [class.error]="isError">
          <input #answerInput type="text"
                 [(ngModel)]="userAnswer"
                 [placeholder]="isEngToUkr ? 'Type Ukrainian translation...' : 'Type English translation...'"
                 (keyup.enter)="checkAnswer()"
                 [class.success]="isCorrect"
                 [class.error]="isError">
        </div>

        <div class="buttons-container">
          <button class="hint-button" (click)="getHint()">Hint</button>
          <button class="submit-button" (click)="checkAnswer()">Submit</button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./write-me.component.scss']
})
export class WriteMeComponent {
  @ViewChild('answerInput') answerInput!: ElementRef<HTMLInputElement>;
  @Input() set words(value: [string, string][]) {
    if (value) {
      this._words = value;
      this.initializeQuestions();
    }
  }
  @Output() gameExit = new EventEmitter<void>();

  private _words: [string, string][] = [];
  questions: Question[] = [];
  currentQuestionIndex = 0;
  userAnswer = '';
  isCorrect = false;
  isError = false;
  isEngToUkr = true;

  get currentQuestion(): Question | undefined {
    return this.questions[this.currentQuestionIndex];
  }

  private getCommonPrefixLength(str1: string, str2: string): number {
    const minLength = Math.min(str1.length, str2.length);
    for (let i = 0; i < minLength; i++) {
      if (str1[i].toLowerCase() !== str2[i].toLowerCase()) {
        return i;
      }
    }
    return minLength;
  }

  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  private initializeQuestions() {
    const shuffledWords = this.shuffleArray(this._words);
    this.questions = shuffledWords.map(([eng, ukr]) => ({
      word: this.isEngToUkr ? eng : ukr,
      translation: this.isEngToUkr ? ukr : eng,
      isAnswered: false
    }));
    this.currentQuestionIndex = 0;
    this.userAnswer = '';
    this.isCorrect = false;
  }

  switchMode(engToUkr: boolean) {
    if (this.isEngToUkr === engToUkr) return;
    this.isEngToUkr = engToUkr;
    this.initializeQuestions();
  }

  getHint() {
    if (!this.currentQuestion || this.isCorrect) return;

    const correctAnswer = this.currentQuestion.translation;
    const userAnswer = this.userAnswer;

    // Find the length of the common correct prefix
    const commonLength = this.getCommonPrefixLength(correctAnswer, userAnswer);

    // If the user's answer is completely wrong or empty, start from the beginning
    if (commonLength === 0) {
      this.userAnswer = correctAnswer[0];
    } else if (commonLength < correctAnswer.length) {
      // If we have a partial match, add the next correct letter
      this.userAnswer = correctAnswer.substring(0, commonLength + 1);
    }

    // Focus the input and set cursor to the end after updating the value
    setTimeout(() => {
      this.answerInput.nativeElement.focus();
      this.answerInput.nativeElement.selectionStart = this.userAnswer.length;
      this.answerInput.nativeElement.selectionEnd = this.userAnswer.length;
    });
  }

  checkAnswer() {
    if (!this.currentQuestion || this.isCorrect) return;

    const isCorrect = this.userAnswer.toLowerCase().trim() ===
                     this.currentQuestion.translation.toLowerCase().trim();

    if (isCorrect) {
      this.isCorrect = true;
      this.isError = false;
      this.currentQuestion.isAnswered = true;

      setTimeout(() => {
        this.currentQuestionIndex++;
        if (this.currentQuestionIndex >= this.questions.length) {
          this.currentQuestionIndex = 0;
          this.initializeQuestions();
        }
        this.userAnswer = '';
        this.isCorrect = false;
        this.answerInput.nativeElement.focus();
      }, 1500);
    } else {
      this.isError = true;
      setTimeout(() => {
        this.isError = false;
        this.answerInput.nativeElement.focus();
      }, 1000);
    }
  }
}
