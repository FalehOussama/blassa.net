import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FicheTrajetPageRoutingModule } from './fiche-trajet-routing.module';

import { FicheTrajetPage } from './fiche-trajet.page';
import { SharedModule } from 'src/app/components/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FicheTrajetPageRoutingModule,
    SharedModule,
    FontAwesomeModule
  ],
  declarations: [FicheTrajetPage]
})
export class FicheTrajetPageModule {}
