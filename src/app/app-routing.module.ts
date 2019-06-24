import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BonsComponent } from './components/bons/bons.component';
import { DemandesComponent } from './components/demandes/demandes.component';
import { AuthGuardService } from '../../projects/jli-auth/src/lib/services/auth-services/auth-guard.service';
import { CallbackComponent } from './components/callback/callback.component';
import { LogoutComponent } from './components/logout/logout/logout.component';

const routes: Routes = [
    { path: 'callback', component: CallbackComponent, pathMatch: 'full' },
    { path: 'home', component: HomeComponent, pathMatch: 'full' },
    { 
      path: 'bons',
      canActivate: [AuthGuardService],
      data: { 'auth': [{ Name: 'CanReadBon' }] },
      component: BonsComponent, 
      pathMatch: 'full' },
    { 
      path: 'demandes', 
      canActivate: [AuthGuardService],
      data: { 'auth': [{ Name: 'CanReadDemande' }, { Name: 'CanWriteDemande'}] },
      component: DemandesComponent,
      pathMatch: 'full'
    },
    {
      path: 'logout',
      canActivate: [AuthGuardService],
      data: { 'auth': [] },
      component: LogoutComponent,
      pathMatch: 'full'
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
