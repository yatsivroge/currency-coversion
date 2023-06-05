import {Component, OnInit} from '@angular/core';
import {CurrencyService} from "../services/currency.service";
import {DepositInfo} from "../models/deposit.interface";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-currency-display',
  templateUrl: './currency-display.component.html',
  styleUrls: ['./currency-display.component.scss']
})
export class CurrencyDisplayComponent implements OnInit {
  public depositInfo!: BehaviorSubject<DepositInfo | null>;
  constructor(private readonly currencyService: CurrencyService) {}

  ngOnInit() {
    this.depositInfo = this.currencyService.userDepositState;
  }
}
