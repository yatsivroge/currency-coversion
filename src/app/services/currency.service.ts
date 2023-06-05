import { Injectable } from '@angular/core';
import {ExchangeCurrency} from "../models/exchange-currency.interface";
import {BehaviorSubject} from "rxjs";
import { DepositInfo} from "../models/deposit.interface";

const currencyArray = [
  {
    fullCurrencyName: 'Test US Dollar',
    shortCurrencyName: 'TUSD',
    percentageInYear: 12,
  },
  {
    fullCurrencyName: 'Test Euro',
    shortCurrencyName: 'TEUR',
    percentageInYear: 13,
  },
  {
    fullCurrencyName: 'Test Chinese Yuan',
    shortCurrencyName: 'TCNY',
    percentageInYear: 20,
  },
  {
    fullCurrencyName: 'Test Indian Rupee',
    shortCurrencyName: 'TINR',
    percentageInYear: 33,
  },
  {
    fullCurrencyName: 'Test Brazilian Real',
    shortCurrencyName: 'TBRL',
    percentageInYear: 21,
  },
  {
    fullCurrencyName: 'Test Indonesian Rupiah',
    shortCurrencyName: 'TIDR',
    percentageInYear: 80,
  },
  {
    fullCurrencyName: 'Test US Dollar',
    shortCurrencyName: 'TUSD',
    percentageInYear: 12,
  },
  {
    fullCurrencyName: 'Test Euro',
    shortCurrencyName: 'TEUR',
    percentageInYear: 13,
  },
  {
    fullCurrencyName: 'Test Chinese Yuan',
    shortCurrencyName: 'TCNY',
    percentageInYear: 20,
  },
  {
    fullCurrencyName: 'Test Indian Rupee',
    shortCurrencyName: 'TINR',
    percentageInYear: 33,
  },
  {
    fullCurrencyName: 'Test Brazilian Real',
    shortCurrencyName: 'TBRL',
    percentageInYear: 21,
  },
  {
    fullCurrencyName: 'Test Indonesian Rupiah',
    shortCurrencyName: 'TIDR',
    percentageInYear: 80,
  }
]
@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  public userDepositState: BehaviorSubject<DepositInfo | null>= new BehaviorSubject<DepositInfo | null>(null)
  private readonly _availableCurrency: ExchangeCurrency[] = currencyArray;
  constructor() {}


  public getCurrency(): ExchangeCurrency[] {
    return this._availableCurrency;
  }

  public convertCurrency(amount: number, percentage: number, monthPeriod: number): any {
    const monthInYear = (monthPeriod * 30)/365;
    const percent = percentage / 100;
    const result = Math.round(amount * (1 + percent * monthInYear));
    const profit = Math.round(result - amount);
    this.setDeposit({profit, percent: percentage});
    console.log(this.userDepositState.value)
  }

  public setDeposit(depositData: DepositInfo): void {
    this.userDepositState.next(depositData);
  }
}
