import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddCarPageRoutingModule } from './add-car-routing.module';

import { AddCarPage } from './add-car.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddCarPageRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [AddCarPage]
})
export class AddCarPageModule {}
