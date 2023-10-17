import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class UserModule { }

export const userModel = {
  imgUrl:"",
  description:null,
  conditionsGenerales:true,
  id_User: null,
  avis:[0,0,0,0,0],
  noteAvis:null,
  reservations:[],
  vehicules:[],
  prefs:{
    passager:false,
    tel:true,
    whatsapp:false,
    messenger:false,
    filles:false,
    garcons:false,
    tous:false,
    cig:false,
    animaux:false,
    max2:false,
    climatise:false,
    lourd:false,
    moyen:false,
    leger:false,
    verifies:false,
    id_Preferences:null
  },
  date_Creation:null,
  numSerieTel:null,
  platforme:null,
  tel1:null,
  uid:"",
  email:"",
  marque:null,
  prenom:null,
  sexe:null,
  nom:"",
  tel2:null,
  verifie:null,
  superDriver:null,
  conduite:[0,0,0,0]
}

