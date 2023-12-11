import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MesVehiculesPage } from './mes-vehicules.page';

const routes: Routes = [
  {
    path: '',
    component: MesVehiculesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MesVehiculesPageRoutingModule {}
