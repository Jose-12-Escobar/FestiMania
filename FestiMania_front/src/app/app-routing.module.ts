import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FestivalsRecent } from './pages/festivalsRecent/festivalsRecent.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { loginGuard } from './guards/login.guard';


const app_routes: Routes = [
  { path: 'auth',  loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
  { path: 'festival', canActivate: [loginGuard], loadChildren: () => import('./modules/festivals/festivals.module').then(m => m.FestivalsModule) },
  { path: 'home', component: HomeComponent },
  { path: 'festivalsRecent', component: FestivalsRecent },
  { path: 'notFound', component: NotFoundComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', pathMatch: 'full', redirectTo: 'notFound' },
]
@NgModule({
  imports: [RouterModule.forRoot(app_routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
