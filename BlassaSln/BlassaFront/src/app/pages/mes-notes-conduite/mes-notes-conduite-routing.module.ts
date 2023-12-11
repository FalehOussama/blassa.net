import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MesNotesConduitePage } from './mes-notes-conduite.page';

const routes: Routes = [
  {
    path: '',
    component: MesNotesConduitePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MesNotesConduitePageRoutingModule {}
