import { Injectable } from '@angular/core';
import { Card } from './card/card.model';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class CardDataService {

  constructor() { }

  getCards(): Observable<Card[]> {
    return of(this.getCardsForMemoryGame());
  }

  getCardsForMemoryGame(): Card[] {
    const cardsAmount = 9;
    let cards = this.createCards();
    cards = this.giveCards(cardsAmount, cards);
    // Double Card For Game Rules
    for (let i = 0, cardNeeded = cards.length; i < cardNeeded; ++i) {
      cards.push( Card.copy(cards[i]) );
    }
    cards = this.shuffle(cards);
    return cards;
  }

  private createCards(): Card[] {
    let cards = [];

    const rank: string  = '2,3,4,5,6,7,8,9,0,J,Q,K,A',
          ranks = rank.split(',');
    const color: string = 'H,S,C,D',
          colors = color.split(',');

    for (let i = 0; i < ranks.length; ++i) {
      for (let j = 0; j < colors.length; ++j) {
        let cardValue = '' + ranks[i] + colors[j];
        let img = 'assets/images/Cards/' + cardValue + '.png';
        let backImg = 'assets/images/cardBack.jpg';
        cards.push( new Card (img, cardValue, backImg) );
      }
    }

    return cards;
  }

  private giveCards(size: number, deck): Card[] {
    let pickedCards = [];

    while (size !== 0) {
      const cardNumber = Math.floor(Math.random() * deck.length );
      const randomCard = deck[cardNumber];
      if ( pickedCards.includes(randomCard)) {
        continue;
      }
      pickedCards.push(randomCard);
      --size;
    }
    return pickedCards;
  }

  private shuffle(cards: Card[]): Card[] {
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
  }
}
