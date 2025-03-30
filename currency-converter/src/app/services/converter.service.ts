import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CurrencyMap } from '../models/currency.models';
import {  URLS } from '../config/app.constants';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ConverterService {
  private readonly http = inject(HttpClient);

  currenies = toSignal<CurrencyMap>(this.http.get<CurrencyMap>(URLS.CURRENCIES));

  getCurrencies(){
    return this.http.get<CurrencyMap>(URLS.CURRENCIES);
  }
  
}
