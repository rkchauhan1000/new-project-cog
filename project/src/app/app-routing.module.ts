import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { OffersComponent } from './components/offers/offers.component';

const routes: Routes = [

  {
    path : 'login',
    component : LoginComponent,
  },

  {
    path : 'offersPage',
    component : OffersComponent,
  },

  {
    path : '',
    component : LoginComponent,
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
