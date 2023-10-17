import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NouveauTrajetPage } from './nouveau-trajet.page';

const routes: Routes = [
  {
    path: '',
    component: NouveauTrajetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NouveauTrajetPageRoutingModule {}
