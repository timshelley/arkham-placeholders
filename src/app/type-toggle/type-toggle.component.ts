import { EventEmitter, Output } from '@angular/core';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';

export interface TypeChange {
  value: string[];
}

@Component({
  selector: 'app-type-toggle',
  templateUrl: './type-toggle.component.html',
  styleUrls: ['./type-toggle.component.css']
})
export class TypeToggleComponent implements OnInit {

  @Input()
  public value: string[] = [];

  @Output()
  public change: EventEmitter<TypeChange> = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  }

  toggleChange(event: MatButtonToggleChange): void {
    this.change.emit({ value: event.value });
  }

}
