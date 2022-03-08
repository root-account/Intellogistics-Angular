import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';


import { TrackingComponent } from '../../pages/tracking/tracking.component';
import { NewCollectionComponent } from '../../pages/new-collection/new-collection.component';
import { NewQuoteComponent } from '../../pages/new-quote/new-quote.component';
import { ClearPaymentComponent } from '../../pages/clear-payment/clear-payment.component';

import { WaybillsComponent } from '../../pages/waybills/waybills.component';
import { DriversComponent } from '../../pages/drivers/drivers.component';
import { CustomersComponent } from '../../pages/customers/customers.component';
import { RatesComponent } from '../../pages/rates/rates.component';
import { BranchesComponent } from '../../pages/branches/branches.component';
import { StatisticsComponent } from '../../pages/statistics/statistics.component';
import { SettingsComponent } from '../../pages/settings/settings.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },

    { path: 'new-collection',  component: NewCollectionComponent },
    { path: 'new-quote',  component: NewQuoteComponent },
    { path: 'clear-payment',  component: ClearPaymentComponent },
    { path: 'track',  component: TrackingComponent },
    { path: 'waybills',  component: WaybillsComponent },
    { path: 'drivers',  component: DriversComponent },
    { path: 'customers',  component: CustomersComponent },
    { path: 'rates',  component: RatesComponent },
    { path: 'branches',  component: BranchesComponent },
    { path: 'statistics',  component: StatisticsComponent },
    { path: 'settings',  component: SettingsComponent },
    { path: 'profile',   component: UserProfileComponent },
];
