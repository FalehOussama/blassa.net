import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProfilPageRoutingModule } from './profil-routing.module';
import { ProfilPage } from './profil.page';
import { SharedModule } from 'src/app/components/shared.module';
import { MaskitoModule } from '@maskito/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilPageRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MaskitoModule
  ],
  declarations: [ProfilPage]
})
export class ProfilPageModule {}
