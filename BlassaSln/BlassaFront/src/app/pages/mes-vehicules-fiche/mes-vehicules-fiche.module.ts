import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MesVehiculesFichePageRoutingModule } from './mes-vehicules-fiche-routing.module';

import { MesVehiculesFichePage } from './mes-vehicules-fiche.page';
import { SharedModule } from '../../components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MesVehiculesFichePageRoutingModule,
    SharedModule
  ],
  declarations: [MesVehiculesFichePage]
})
export class MesVehiculesFichePageModule {}
