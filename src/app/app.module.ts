import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CardListTableComponent } from './card-list-table/card-list-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { CardPlaceholdersComponent } from './card-placeholders/card-placeholders.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FactionToggleComponent } from './faction-toggle/faction-toggle.component';
import { CardPlaceholderComponent } from './card-placeholder/card-placeholder.component';
import { CycleToggleComponent } from './cycle-toggle/cycle-toggle.component';
import { TypeToggleComponent } from './type-toggle/type-toggle.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CardListTableComponent,
    CardPlaceholdersComponent,
    FactionToggleComponent,
    CardPlaceholderComponent,
    CycleToggleComponent,
    TypeToggleComponent 
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    MatButtonToggleModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
