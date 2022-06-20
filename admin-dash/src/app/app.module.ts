import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from "ngx-spinner";
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { DataTablesModule } from 'angular-datatables';


import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { WaybillsComponent } from './pages/waybills/waybills.component';
import { DriversComponent } from './pages/drivers/drivers.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { RatesComponent } from './pages/rates/rates.component';
import { BranchesComponent } from './pages/branches/branches.component';
import { TrackingComponent } from './pages/tracking/tracking.component';
import { NewCollectionComponent } from './pages/new-collection/new-collection.component';
import { ClearPaymentComponent } from './pages/clear-payment/clear-payment.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { SettingsComponent } from './pages/settings/settings.component';
// import { UserProfileComponent } from './pages/user-profile/user-profile.component';

// services
import {WaybillService} from './services/waybills.service';
import { NewQuoteComponent } from './pages/new-quote/new-quote.component';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    GooglePlaceModule,
    DataTablesModule,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    WaybillsComponent,
    DriversComponent,
    CustomersComponent,
    RatesComponent,
    BranchesComponent,
    TrackingComponent,
    NewCollectionComponent,
    ClearPaymentComponent,
    StatisticsComponent,
    SettingsComponent,
    NewQuoteComponent,
    // UserProfileComponent
  ],
  providers: [WaybillService],
  bootstrap: [AppComponent]
})
export class AppModule { }
