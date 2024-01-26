import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { routing, appRoutingProviders } from './app.routing';
import { CommonModule, DatePipe } from '@angular/common';

import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { PGPGComponent } from './components/pgpg/pgpg.component';
import { ErrorComponent } from './components/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ReportesComponent,
    PGPGComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule, 
    routing, 
    FormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [
    appRoutingProviders,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
