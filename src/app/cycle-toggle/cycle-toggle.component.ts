import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';

export interface CycleChange {
  value: string[];
}

const starterPacks: string[] = ['nat', 'har', 'win', 'jac', 'ste'];

@Component({
  selector: 'app-cycle-toggle',
  templateUrl: './cycle-toggle.component.html',
  styleUrls: ['./cycle-toggle.component.css']
})
export class CycleToggleComponent implements OnInit {

  @Input()
  public value: string[] = [];

  @Output()
  public change: EventEmitter<CycleChange> = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  }

  toggleChange(event: MatButtonToggleChange): void {
    let starters: string[] = (event.value.includes('starters')) ? starterPacks : [];
    this.change.emit({ value: event.value.concat(starters) });
  }

}
