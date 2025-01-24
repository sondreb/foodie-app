import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { PlacesComponent } from './pages/places.component';
import { LoginComponent } from './pages/login.component';
import { LogoutComponent } from './pages/logout.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'places', component: PlacesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];
