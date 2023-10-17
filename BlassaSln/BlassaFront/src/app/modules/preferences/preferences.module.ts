import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class PreferencesModule { }

 export const preferences ={
  filles : false,
  garcons : false,
  tous : false,

  lourd : false,
  moyen : false,
  leger : false,

  max2 : false,
  climatise : false,
  cig : false,
  animaux : false,

  verifies :false,
  passager : false,

  tel : true,
  whatsapp : false,
  messenger : false,
}

export const avis = [0,0,0,0,0]