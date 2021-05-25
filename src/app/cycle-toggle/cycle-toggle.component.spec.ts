import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CycleToggleComponent } from './cycle-toggle.component';

describe('CycleToggleComponent', () => {
  let component: CycleToggleComponent;
  let fixture: ComponentFixture<CycleToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CycleToggleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CycleToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
