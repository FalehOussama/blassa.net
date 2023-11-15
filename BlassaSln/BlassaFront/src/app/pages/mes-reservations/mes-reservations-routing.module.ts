import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MesReservationsPage } from './mes-reservations.page';

const routes: Routes = [
  {
    path: '',
    component: MesReservationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MesReservationsPageRoutingModule {}
