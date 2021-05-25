import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactionToggleComponent } from './faction-toggle.component';

describe('FactionToggleComponent', () => {
  let component: FactionToggleComponent;
  let fixture: ComponentFixture<FactionToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FactionToggleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FactionToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
