import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NouveauTrajetPageRoutingModule } from './nouveau-trajet-routing.module';

import { NouveauTrajetPage } from './nouveau-trajet.page';
import { SharedDirectivesModule } from 'src/app/directives/shared-directives.module';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NouveauTrajetPageRoutingModule,
    SharedDirectivesModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [NouveauTrajetPage]
})
export class NouveauTrajetPageModule {}
