import { Component, OnInit } from '@angular/core';
import { CurrencyService } from "../services/currency.service";
import {map, Observable, startWith} from "rxjs";
import { ExchangeCurrency } from "../models/exchange-currency.interface";
import {FormBuilder, Validators} from "@angular/forms";

const depositPeriod = [ 1, 3, 6, 12, 24];
@Component({
  selector: 'app-currency-convert-form',
  templateUrl: './currency-convert-form.component.html',
  styleUrls: ['./currency-convert-form.component.scss']
})
export class CurrencyConvertFormComponent implements OnInit{
  public depositList : number[] = [];
  public currencyConvertForm = this.fb.group({
    amount: [1000,  [Validators.max(1000000), Validators.min(1000)]],
    currency: '',
    period: 0
  })
  public filteredOptions!: Observable<ExchangeCurrency[]> | any;
  private currencyList = this.currencyService.getCurrency();

  constructor(private readonly currencyService: CurrencyService, private readonly fb: FormBuilder) {}
  public ngOnInit() {
    this.depositList = depositPeriod;
    this._watchFormChanges();


    this.filteredOptions = this.currencyConvertForm.get('currency')?.valueChanges.pipe(
      startWith(''),
      map( value => this._filter(value || ''))
    )
  }

  public amountHandler(isAdd: boolean = true): void {
    if (!this.currencyConvertForm.value?.amount) {
      return;
    }

    let newAmount = this.currencyConvertForm.value.amount;
    isAdd ? newAmount += 1000 : newAmount -= 1000;
    this.currencyConvertForm.get('amount')?.setValue(newAmount);
  }

  private _filter(value: string): ExchangeCurrency[] {
    const filterValue = value.toLowerCase();
    return this.currencyList.filter(option => option.fullCurrencyName.toLowerCase().includes(filterValue));
  }

  private _watchFormChanges(): void {
      this.currencyConvertForm.valueChanges.subscribe(data => {
        console.log('data.currency', data.currency)
        this.currencyService.convertCurrency(
          data.amount ?? 0,
          0,
          data.period ?? 0
        );
      })
  }
}
