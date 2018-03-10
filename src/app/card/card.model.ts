export class Card {
  inGame = true;
  isFaceUp = false;
  constructor(public imageUrl: string, public value: string, public backImageUrl: string) {
  }

  static copy(obj) {
    if (obj instanceof Card) {
      return new Card( obj.imageUrl, obj.value, obj.backImageUrl );
    }
  }
}
