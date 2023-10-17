import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FicheTrajetPage } from './fiche-trajet.page';

const routes: Routes = [
  {
    path: '',
    component: FicheTrajetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FicheTrajetPageRoutingModule {}
