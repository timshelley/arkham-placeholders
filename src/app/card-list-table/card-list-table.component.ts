import { Component, Input, OnInit } from '@angular/core';
import { ArkhamDBCard } from '../interfaces';

@Component({
  selector: 'app-card-list-table',
  templateUrl: './card-list-table.component.html',
  styleUrls: ['./card-list-table.component.css']
})
export class CardListTableComponent implements OnInit {

  @Input()
  public cards: ArkhamDBCard[] = [];

  ngOnInit(): void {
  }

  displayedColumns = ['faction_name', 'type_name', 'name', 'pack_name', 'quantity', 'xp', 'url'];

}
