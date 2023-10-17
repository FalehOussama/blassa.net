import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MesTrajetsPageRoutingModule } from './mes-trajets-routing.module';

import { MesTrajetsPage } from './mes-trajets.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MesTrajetsPageRoutingModule,
    SharedModule
  ],
  declarations: [MesTrajetsPage]
})
export class MesTrajetsPageModule {}
