import {
  Component,
  computed,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DatePipe, DecimalPipe } from '@angular/common';
import { StorageService } from '../../services/storage.service';
import { ConversionStorage } from '../../models/currency.models';
import { STORAGE_KEYS } from '../../config/app.constants';

@Component({
  selector: 'app-history',
  imports: [MatTableModule, MatPaginatorModule, DecimalPipe, DatePipe],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css',
})
export class HistoryComponent implements OnInit {
  storageService = inject(StorageService);

  displayedColumns: string[] = ['amount', 'from', 'to', 'result', 'date'];
  ELEMENT_DATA = signal<ConversionStorage[]>([]);
  dataSource = computed(() => {
    return new MatTableDataSource<ConversionStorage>(this.ELEMENT_DATA());
  });
  @ViewChild(MatPaginator)
  paginator: MatPaginator = new MatPaginator();

  ngOnInit(): void {
    this.ELEMENT_DATA.set(this.getConversionHistory());
  }

  getConversionHistory(): ConversionStorage[] {
    const conversionHistory = this.storageService.getItem(STORAGE_KEYS.HISTORY);
    if (conversionHistory) {
      return conversionHistory as ConversionStorage[];
    }
    return [];
  }

  ngAfterViewInit() {
    this.dataSource().paginator = this.paginator;
  }
}
