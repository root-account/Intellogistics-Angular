import { Routes } from '@angular/router';

import { LoginComponent } from '../../pages/login/login.component';
import { WelcomeComponent } from '../../pages/welcome/welcome.component';
import { RegisterComponent } from '../../pages/register/register.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'login',          component: LoginComponent },
    { path: 'welcome',          component: WelcomeComponent },
    { path: 'register',       component: RegisterComponent }
];
