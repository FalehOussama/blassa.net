import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NouveauComptePageRoutingModule } from './nouveau-compte-routing.module';

import { NouveauComptePage } from './nouveau-compte.page';

import { MaskitoModule } from '@maskito/angular';
import { SharedModule } from '../../components/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NouveauComptePageRoutingModule,
    ReactiveFormsModule,
    MaskitoModule,
    SharedModule,
  ],
  declarations: [NouveauComptePage]
})
export class NouveauComptePageModule {}
