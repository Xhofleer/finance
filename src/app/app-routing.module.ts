import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MortgagePayoffCalculatorComponent} from "./mortgage-payoff-calculator/mortgage-payoff-calculator.component";
import {TestComponent} from "./test/test.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";

const routes: Routes = [
  { path: 'hypotheek-aflossen', component: MortgagePayoffCalculatorComponent },
  { path: 'test', component: TestComponent},
  { path: '',   redirectTo: '/hypotheek-aflossen', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
