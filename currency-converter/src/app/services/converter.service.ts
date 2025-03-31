import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ConverterResponse, CurrencyMap } from '../models/currency.models';
import { URLS } from '../config/app.constants';

@Injectable({
  providedIn: 'root',
})
export class ConverterService {
  private readonly http = inject(HttpClient);

  getCurrencies() {
    return this.http.get<CurrencyMap>(URLS.CURRENCIES);
  }

  getConvertedAmount(from: string | null, to: string | null) {
    return this.http.get<ConverterResponse>(
      `${URLS.CONVERTED_AMOUNT}${from}&symbols=${to}`
    );
  }
}
