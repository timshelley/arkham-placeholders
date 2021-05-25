import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPlaceholdersComponent } from './card-placeholders.component';

describe('CardPlaceholdersComponent', () => {
  let component: CardPlaceholdersComponent;
  let fixture: ComponentFixture<CardPlaceholdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardPlaceholdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardPlaceholdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
