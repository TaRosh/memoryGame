import { Component } from '@angular/core';
import { Card } from './card/card.model';
import { CardDataService } from './card-data.service';
import { ScoreService } from './score.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  cards: Card[];
  isGameStarted: boolean;
  isGameEnd: boolean;
  score: number;
  constructor(private cardService: CardDataService, private scoreService:  ScoreService) {
  }

  startGame(): void {
    this.getCards();
    this.isGameStarted = true;
    this.isGameEnd = false;
    this.scoreService.newScore(0);
  }

  endGame(): void {
    this.isGameEnd = true;
    this.isGameStarted = false;
    this.score = this.scoreService.getScore();
  }

  getCards(): void {
    this.cardService.getCards()
      .subscribe(cards => this.cards = cards);
  }
}
