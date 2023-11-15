import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MesReservationsPageRoutingModule } from './mes-reservations-routing.module';

import { MesReservationsPage } from './mes-reservations.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MesReservationsPageRoutingModule,
    SharedModule
  ],
  declarations: [MesReservationsPage]
})
export class MesReservationsPageModule {}
