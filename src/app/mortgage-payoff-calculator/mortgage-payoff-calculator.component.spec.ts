import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MortgagePayoffCalculatorComponent } from './mortgage-payoff-calculator.component';

describe('MortgagePayoffCalculatorComponent', () => {
  let component: MortgagePayoffCalculatorComponent;
  let fixture: ComponentFixture<MortgagePayoffCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MortgagePayoffCalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MortgagePayoffCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
