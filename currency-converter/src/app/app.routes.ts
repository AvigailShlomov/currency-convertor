import { Routes } from '@angular/router';
import { ConverterComponent } from './components/converter/converter.component';
import { HistoryComponent } from './components/history/history.component';
import { ChartComponent } from './components/chart/chart.component';

export const routes: Routes = [
    {
        path:'',
        component:ConverterComponent
    },
    {
        path:'history',
        component:HistoryComponent /**@todo: implamemt lazy loading */
    },
    {
        path:'chart',
        component:ChartComponent /**@todo: implamemt lazy loading */
    }
];
