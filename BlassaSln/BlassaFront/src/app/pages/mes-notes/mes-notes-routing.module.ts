import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MesNotesPage } from './mes-notes.page';

const routes: Routes = [
  {
    path: '',
    component: MesNotesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MesNotesPageRoutingModule {}
