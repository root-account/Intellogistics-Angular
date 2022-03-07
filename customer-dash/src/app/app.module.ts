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
import { MyAccountComponent } from './pages/my-account/my-account.component';
// import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { HelpPageComponent } from './pages/help-page/help-page.component';
import { TrackingComponent } from './pages/tracking/tracking.component';
import { NewCollectionComponent } from './pages/new-collection/new-collection.component';
import { SettingsComponent } from './pages/settings/settings.component';

// services
import {WaybillService} from './services/waybills.service';
import { NewQuoteComponent } from './pages/new-quote/new-quote.component';
import { AuthGuard } from './routerGuards/auth.guard';


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
    MyAccountComponent,
    TrackingComponent,
    NewCollectionComponent,
    SettingsComponent,
    NewQuoteComponent,
    HelpPageComponent,
    // UserProfileComponent
  ],
  providers: [WaybillService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
