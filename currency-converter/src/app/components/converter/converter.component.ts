import { Component, computed, inject, OnInit, signal } from '@angular/core';
import {
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ConverterService } from '../../services/converter.service';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-converter',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule],
  templateUrl: './converter.component.html',
  styleUrl: './converter.component.css',
})
export class ConverterComponent implements OnInit {
  converterService = inject(ConverterService);

  convertForm = new FormGroup({
    amount: new FormControl<number>(1, [
      Validators.required,
      Validators.min(1),
    ]),
    from: new FormControl<string>('USD', Validators.required),
    to: new FormControl<string>('ILS', Validators.required),
  });
  currencies = signal<[string, string][]>([]);
  convertedResult = signal<number | null>(null);
  toCurrency = computed(() => {
    return this.currencies().find(([code]) => code === this.convertForm.controls.to.value) || ['not found', ''];
  });

  ngOnInit() {
    this.loadCurrencies();
  }

  loadCurrencies() {
    this.converterService.getCurrencies().subscribe({
      next: (currencies) => {
        this.currencies.set(Object.entries(currencies));
      },
      error: (err) => alert('Error while fetching currencies list'),
    });
  }

  convert() {
    if (!this.convertForm.valid) {
      return console.warn('Form invalid'); 
    } else {
      const { amount, from, to } = this.convertForm.value as {
        amount: number;
        from: string;
        to: string;
      };
      
      this.converterService.getConvertedAmount(from, to).subscribe({
        next: (converted) => {
          console.log(this.currencies());
          
          this.convertedResult.set(amount * converted.rates[to as string])
        },
      });
    }
  }
}
