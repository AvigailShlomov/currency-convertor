import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ConverterService } from '../../services/converter.service';

@Component({
  selector: 'app-converter',
  imports: [FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule],
  templateUrl: './converter.component.html',
  styleUrl: './converter.component.css',
})
export class ConverterComponent implements OnInit {
  converterService = inject(ConverterService);

  convertForm = new FormGroup({
    amout: new FormControl<number>(1, Validators.required),
    from: new FormControl<string>('USD', Validators.required),
    to: new FormControl<string>('ILS', Validators.required),
  });
  currencies = signal<[string, string][]>([]);

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
}
