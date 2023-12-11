import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MesVehiculesPageRoutingModule } from './mes-vehicules-routing.module';

import { MesVehiculesPage } from './mes-vehicules.page';
import { SharedModule } from '../../components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MesVehiculesPageRoutingModule,
    SharedModule
  ],
  declarations: [MesVehiculesPage]
})
export class MesVehiculesPageModule {}
