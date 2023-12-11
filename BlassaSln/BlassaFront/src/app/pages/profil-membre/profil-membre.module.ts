import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilMembrePageRoutingModule } from './profil-membre-routing.module';

import { ProfilMembrePage } from './profil-membre.page';
import { SharedModule } from 'src/app/components/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilMembrePageRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  declarations: [ProfilMembrePage]
})
export class ProfilMembrePageModule {}
