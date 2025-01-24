import { Routes } from '@angular/router';
import { PlacesComponent } from './pages/places.component';
import { LoginComponent } from './pages/login.component';
import { HomeComponent } from './pages/home.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'places', component: PlacesComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];
