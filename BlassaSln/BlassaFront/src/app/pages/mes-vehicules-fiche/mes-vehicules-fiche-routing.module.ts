import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MesVehiculesFichePage } from './mes-vehicules-fiche.page';

const routes: Routes = [
  {
    path: '',
    component: MesVehiculesFichePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MesVehiculesFichePageRoutingModule {}
