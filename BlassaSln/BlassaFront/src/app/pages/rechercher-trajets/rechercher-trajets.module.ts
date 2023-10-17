import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RechercherTrajetsPageRoutingModule } from './rechercher-trajets-routing.module';

import { RechercherTrajetsPage } from './rechercher-trajets.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RechercherTrajetsPageRoutingModule,
    SharedModule,
  ],
  declarations: [RechercherTrajetsPage]
})
export class RechercherTrajetsPageModule {}
