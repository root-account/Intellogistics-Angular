import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';



import { TrackingComponent } from '../../pages/tracking/tracking.component';
import { NewCollectionComponent } from '../../pages/new-collection/new-collection.component';
import { NewQuoteComponent } from '../../pages/new-quote/new-quote.component';
import { MyAccountComponent } from '../../pages/my-account/my-account.component';
import { WaybillsComponent } from '../../pages/waybills/waybills.component';
import { SettingsComponent } from '../../pages/settings/settings.component';
import { HelpPageComponent } from '../../pages/help-page/help-page.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'new-collection',  component: NewCollectionComponent },
    { path: 'new-quote',  component: NewQuoteComponent },
    { path: 'track',  component: TrackingComponent },
    { path: 'waybills',  component: WaybillsComponent },
    { path: 'my-account',  component: MyAccountComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'settings',  component: SettingsComponent },
    { path: 'help',  component: HelpPageComponent },
   

];
