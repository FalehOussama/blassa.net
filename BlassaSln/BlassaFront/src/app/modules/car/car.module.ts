import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CarModule { }

export const car = {
  climatise: null,
  couleur: null,
​​​  id_Vehicule: null,
​​  marque: null,
​​​  matricule: null,
​​​  miseEnCirculation: null,
​​​  model: null,
​​​  type: null,
​​​  verifie: false,
}
