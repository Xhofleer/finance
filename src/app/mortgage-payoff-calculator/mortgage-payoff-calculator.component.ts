import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-mortgage-payoff-calculator',
  templateUrl: './mortgage-payoff-calculator.component.html',
  styleUrls: ['./mortgage-payoff-calculator.component.scss']
})
export class MortgagePayoffCalculatorComponent implements OnInit {

  public form = this.fb.group({
    originalTotalLoan: [200000, Validators.required],
    originalLoanTerm: [30, Validators.required],
    interest: [3, Validators.required],
    remainingYears: [25, Validators.required],
    remainingMonths: [0, Validators.required],
  });
  public payments: MonthlyPayment[] = [];
  public paymentsPerYear: MonthlyPayment[] = [];

  private readonly MONTHS_IN_A_YEAR = 12;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

  }

  onSubmit() {
    this.payments = this.createMonthlyPaymentsLinear();
    this.paymentsPerYear = this.sumPerYear(this.payments);
  }


  private createMonthlyPaymentsLinear() {
    const result = [];
    const paymentAmounts = this.form.value.originalLoanTerm * this.MONTHS_IN_A_YEAR;
    const monthlyPaymentAmount = this.form.value.originalTotalLoan / paymentAmounts;
    for (let i = 1; i <= paymentAmounts; i++) {
      const amountPayedBack = monthlyPaymentAmount * i;
      const remainingLoan = this.form.value.originalTotalLoan - amountPayedBack;
      const interest = remainingLoan * (this.form.value.interest/100) / this.MONTHS_IN_A_YEAR;
      result.push(new MonthlyPayment(remainingLoan, monthlyPaymentAmount, interest));
    }
    return result;
  }

  private sumPerYear(payments: MonthlyPayment[]) {
    const paymentsByYear = this.chunkArray(payments, this.MONTHS_IN_A_YEAR);
    return paymentsByYear.map(paymentsForYear => {
      let remainingLoanEndOfYear = 0;
      let totalPaymentAmount = 0;
      let totalInterest = 0;
      for (const monthlyPayment of paymentsForYear) {
        remainingLoanEndOfYear = monthlyPayment.remainingLoan;
        totalPaymentAmount += monthlyPayment.paymentAmount;
        totalInterest += monthlyPayment.interestAmount;
      }
      return new MonthlyPayment(remainingLoanEndOfYear, totalPaymentAmount, totalInterest);
    });
  }

  private chunkArray<T>(array: T[], chunkSize: number): T[][] {
    const results: T[][] = [];

    while (array.length) {
      results.push(array.splice(0, chunkSize));
    }

    return results;
  }
}

export class MonthlyPayment {
  private readonly _remainingLoan: number;
  private readonly _paymentAmount: number;
  private readonly _interestAmount: number;

  constructor(remainingLoan: number, paymentAmount: number, interestAmount: number) {
    this._remainingLoan = remainingLoan;
    this._paymentAmount = paymentAmount;
    this._interestAmount = interestAmount;
  }

  get remainingLoan(): number {
    return this._remainingLoan;
  }

  get paymentAmount(): number {
    return this._paymentAmount;
  }

  get interestAmount(): number {
    return this._interestAmount;
  }
}
