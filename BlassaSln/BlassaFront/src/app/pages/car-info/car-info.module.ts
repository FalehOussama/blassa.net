import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarInfoPageRoutingModule } from './car-info-routing.module';

import { CarInfoPage } from './car-info.page';
import { SharedModule } from 'src/app/components/shared.module';
import { SharedDirectivesModule } from 'src/app/directives/shared-directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarInfoPageRoutingModule,
    SharedModule,
    SharedDirectivesModule,
    ReactiveFormsModule
  ],
  declarations: [CarInfoPage]
})
export class CarInfoPageModule {}
