import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ChartYearMonthsComponent } from './chart-year-months/chart-year-months.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartYearMonthsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
