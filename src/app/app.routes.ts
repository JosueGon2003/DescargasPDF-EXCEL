import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TablasComponent } from './components/tablas/tablas.component';
import { NavbarComponent } from './components/navbar/navbar.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'tablas', component: TablasComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: '**', redirectTo: '/home' }
];
