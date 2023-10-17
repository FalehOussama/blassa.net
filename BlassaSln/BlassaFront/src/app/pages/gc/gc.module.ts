import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GCPageRoutingModule } from './gc-routing.module';

import { GCPage } from './gc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GCPageRoutingModule
  ],
  declarations: [GCPage]
})
export class GCPageModule {}
