import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerificationProfilPageRoutingModule } from './verification-profil-routing.module';

import { VerificationProfilPage } from './verification-profil.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerificationProfilPageRoutingModule,
    SharedModule
  ],
  declarations: [VerificationProfilPage]
})
export class VerificationProfilPageModule {}
