import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { CardListComponent } from './card-list/card-list.component';
import {CardDataService} from './card-data.service';
import { MenuComponent } from './menu/menu.component';
import {ScoreService} from './score.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    CardListComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule
  ],
  providers: [ CardDataService, ScoreService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
