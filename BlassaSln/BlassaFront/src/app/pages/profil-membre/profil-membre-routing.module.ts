import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilMembrePage } from './profil-membre.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilMembrePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilMembrePageRoutingModule {}
