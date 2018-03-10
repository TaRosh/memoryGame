import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ScoreService} from '../score.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Output()
  startAgain: EventEmitter<boolean> = new EventEmitter();
  score: number;
  constructor(private scoreService: ScoreService) { }

  ngOnInit() {
    this.scoreService.score.subscribe(score => this.score = score);
  }


  launchGameAgain() {
    this.startAgain.emit(true);
  }

}
