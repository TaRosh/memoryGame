import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ScoreService {
  private scoreSubject = new BehaviorSubject(0);
  score = this.scoreSubject.asObservable();

  changeScore(score) {
    let newScore = this.scoreSubject.getValue() + score;
    newScore = newScore < 0 ? 0 : newScore;
    this.scoreSubject.next(newScore);
  }

  newScore(score) {
    this.scoreSubject.next(score);
  }

  getScore() {
    return this.scoreSubject.value;
  }

  constructor() { }

}
