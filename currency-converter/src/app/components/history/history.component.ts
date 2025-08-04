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
import { TABLE_COLUMNS } from '../../utils/constants';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrl: './history.component.css',
  imports: [MatTableModule, MatPaginatorModule, DecimalPipe, DatePipe],
})
export class HistoryComponent implements OnInit {
  storageService = inject(StorageService);

  displayedColumns: string[] = [
    TABLE_COLUMNS.AMOUNT,
    TABLE_COLUMNS.FROM,
    TABLE_COLUMNS.TO,
    TABLE_COLUMNS.RESULT,
    TABLE_COLUMNS.DATE,
  ];
  ELEMENT_DATA = signal<ConversionStorage[]>([]);
  dataSource = computed(() => {
    return new MatTableDataSource<ConversionStorage>(this.ELEMENT_DATA());
  });
  @ViewChild(MatPaginator) /**@todo: improve this to signals */
  paginator: MatPaginator = new MatPaginator();

  ngOnInit(): void {
    this.ELEMENT_DATA.set(this.getConversionHistory());
  }

  getConversionHistory(): ConversionStorage[] {
    /**@todo: make this better */
    const conversionHistory = this.storageService.getItem(STORAGE_KEYS.HISTORY);
    if (conversionHistory) {
      return conversionHistory as ConversionStorage[];
    }
    return [];
  }

  ngAfterViewInit() {
    /**@todo: change this to signals */
    this.dataSource().paginator = this.paginator;
  }
}
