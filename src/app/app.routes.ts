import { Routes } from '@angular/router';
import { PlacesComponent } from './pages/places/places.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  { path: 'places', component: PlacesComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/places', pathMatch: 'full' }
];
