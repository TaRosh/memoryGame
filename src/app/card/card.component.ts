import { Component, OnInit, Input } from '@angular/core';
import { Card } from './card.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input()
  card: Card;
  constructor() { }

  ngOnInit() {
  }

  showCard() {
    if (this.card.isFaceUp) return this.card.imageUrl;
    return this.card.backImageUrl;
  }
}
