import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GCPage } from './gc.page';

const routes: Routes = [
  {
    path: '',
    component: GCPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GCPageRoutingModule {}
