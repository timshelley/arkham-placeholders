import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';

export interface FactionChange {
  value: string[];
}


@Component({
  selector: 'app-faction-toggle',
  templateUrl: './faction-toggle.component.html',
  styleUrls: ['./faction-toggle.component.css']
})
export class FactionToggleComponent implements OnInit {

  @Input()
  public value: string[] = [];

  @Output()
  public change: EventEmitter<FactionChange> = new EventEmitter();

  constructor() { }
  ngOnInit(): void {}

  toggleChange(event: MatButtonToggleChange): void {
      this.change.emit({ value: event.value });
  }

}
