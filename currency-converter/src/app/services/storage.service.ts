import { Injectable } from '@angular/core';
import { ConversionStorage } from '../models/currency.models';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  setItem(key: string, value: any): void {
    try {
      const jsonValue = JSON.stringify(value);
      const oldData = this.getItem(key);
      
      localStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error('Error saving to local storage', error);
    }
  }

  getItem<T>(key: string): T | [] | null {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : [];
    } catch (error) {
      console.error('Error reading from local storage', error);
      return null;
    }
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
  clear(): void {
    localStorage.clear();
  }
}
