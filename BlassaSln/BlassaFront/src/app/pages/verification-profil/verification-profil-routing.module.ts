import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerificationProfilPage } from './verification-profil.page';

const routes: Routes = [
  {
    path: '',
    component: VerificationProfilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerificationProfilPageRoutingModule {}
