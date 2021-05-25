import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardListTableComponent } from './card-list-table.component';

describe('CardListTableComponent', () => {
  let component: CardListTableComponent;
  let fixture: ComponentFixture<CardListTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardListTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
