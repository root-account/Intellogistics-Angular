import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
// import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TrackingComponent } from '../../pages/tracking/tracking.component';
import { NewCollectionComponent } from '../../pages/new-collection/new-collection.component';
import { NewQuoteComponent } from '../../pages/new-quote/new-quote.component';
import { MyAccountComponent } from '../../pages/my-account/my-account.component';
import { WaybillsComponent } from '../../pages/waybills/waybills.component';
import { SettingsComponent } from '../../pages/settings/settings.component';
import { HelpPageComponent } from '../../pages/help-page/help-page.component';
import { AuthGuard } from 'src/app/routerGuards/auth.guard';


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent, canActivate : [AuthGuard] },
    { path: 'new-collection',  component: NewCollectionComponent },
    { path: 'new-quote',  component: NewQuoteComponent },
    { path: 'track',  component: TrackingComponent },
    { path: 'waybills',  component: WaybillsComponent, canActivate : [AuthGuard] },
    { path: 'my-account',  component: MyAccountComponent, canActivate : [AuthGuard] },
    // { path: 'profile',   component: UserProfileComponent, canActivate : [AuthGuard] },
    { path: 'settings',  component: SettingsComponent , canActivate : [AuthGuard]},
    { path: 'help',  component: HelpPageComponent },
   

];
