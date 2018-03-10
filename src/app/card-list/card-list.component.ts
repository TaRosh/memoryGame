import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  SimpleChange,
  Output,
  EventEmitter,
} from '@angular/core';
import { Card } from '../card/card.model';
import {ScoreService} from '../score.service';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css'],
  animations: [
    trigger('cardInGame', [
      state('false', style({
        opacity: '0',
        visibility: 'hidden',
      })),
      state('true',   style({
        opacity: '1',
      })),
      transition('true => false', animate('300ms ease-in')),
    ]),
    trigger('cardFaceUp', [
      state('false', style({

      })),
      state('true', style( {
        transform: 'scale(0.9)'
      })),
      transition('true => false', animate('300ms ease-in')),
      transition('false => true', animate('300ms ease-out'))
    ])
  ]
})
export class CardListComponent implements OnInit, OnChanges {

  pickedCardsWithId = [];
  guessedCards = [];
  isCardFliped = true;
  private subscription: Subscription;
  @Output()
  gameEnd: EventEmitter<number> = new EventEmitter();
  @Input()
  cards: Card[];
  constructor(private scoreService: ScoreService) { }

  ngOnChanges(changes: SimpleChanges) {
    const cards: SimpleChange = changes.cards;
    this.cards = cards.currentValue;
    // Cancel Hide Cards If New Cards appears
    if (this.subscription) this.subscription.unsubscribe();
    // Show Cards and Hide them after 5 sec
    this.showCards();
    let timer = TimerObservable.create(5000);
    this.subscription = timer.subscribe( t => this.hideCards() );
  }

  ngOnInit() {
    this.showCards();
  }

  hideCards() {
    for ( let card of this.cards) {
      card.isFaceUp = false;
    }
    this.isCardFliped = false;
  }

  showCards() {
    for ( let card of this.cards) {
      card.isFaceUp = true;
    }
  }

  cardPicked(card: Card, id: number) {
    // Cancel click before end animation
    if (this.isCardFliped) return;

    if (this.pickedCardsWithId.length === 0) {
      // Picked First Card
      this.pickedCardsWithId.push({id: id, card: card});
      card.isFaceUp = true;

    } else if (this.pickedCardsWithId.length === 1) {

      card.isFaceUp = true;
      const pickedCard = this.pickedCardsWithId[0];

      // If Two Cards Picked
      if (pickedCard.id !== id) {
        this.isCardFliped = true;
        // If cards matched
        if (pickedCard.card.value === card.value) {
          card.inGame = false;
          pickedCard.card.inGame = false;

          this.isCardFliped = false;
          this.guessedCards.push(card, pickedCard.card);

          this.scoreService.changeScore(this.countScore(true) );

          this.pickedCardsWithId.length = 0;

          // If Game End
          if (this.guessedCards.length === this.cards.length) {
            this.gameEnd.emit(this.scoreService.getScore() );
          }
        } else {
          // Else cards don't matched
          setTimeout(() => {
            card.isFaceUp = false;
            pickedCard.card.isFaceUp = false;
            this.isCardFliped = false;
          }, 1000);

          this.scoreService.changeScore(-this.countScore(false) );
          this.pickedCardsWithId.length = 0;
        }
      }
    }
  }

  countScore(matched): number {
    let score;
    if (matched ) {
      score = (this.cards.length - this.guessedCards.length) / 2 * 42;
    } else {
      score = (this.guessedCards.length / 2) * 42;
    }

    return score;
  }

}
