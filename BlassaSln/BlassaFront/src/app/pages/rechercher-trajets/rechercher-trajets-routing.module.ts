import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RechercherTrajetsPage } from './rechercher-trajets.page';

const routes: Routes = [
  {
    path: '',
    component: RechercherTrajetsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RechercherTrajetsPageRoutingModule {}
