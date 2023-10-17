import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';
import { car } from '../../modules/car/car.module'
import { NavController } from '@ionic/angular';
import { RefreshService } from 'src/app/services/refresh.service';
import { StorageService } from 'src/app/services/storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.page.html',
  styleUrls: ['./add-car.page.scss'],
})
export class AddCarPage implements OnInit {

  constructor(
    private userService : UserService,
    private router : Router,
    private location : Location,
    private navCtrl: NavController,
    private storage : StorageService,
    private formBuilder : FormBuilder
  ) {
    this.storage.get('user').then(
      async data => {
          this.user = await data;
      }
    )
  }


  colors : any[] = ["Noir","Blanc", "Gris_Fonce", "Gris", "Bordeaux", "Rouge", "Bleu_Fonce","Bleu",
   "Vert_Foncé", "Vert" ,"Marron" , "Beige" , "Orange" , "Jaune" , "Violet" , "Rose"]
  
  types : any[] = ["Compacte","Berline","Cabriolet", "Break","Suv","Monospace"]

  user:any;
  vehiculeForm:FormGroup;

  ionViewWillEnter(){
    this.ngOnInit()
  }
  async ngOnInit() {

    
    this.vehiculeForm = this.formBuilder.group({
      matricule: ['', [Validators.required]],
      marque: ['', [Validators.required]],
      model: ['', [Validators.required]],
      miseEnCirculation: [''],
      couleur: ['' , [Validators.required]],
      type: ['' , [Validators.required]],
      climatise: [false],
      verifie: [false],
    });
  }

  vehicule:any;
  addVehicule(){


    this.userService.addVehicule(this.user.id_User , this.vehiculeForm.value['climatise'], this.vehiculeForm.value['verifie'] , this.vehiculeForm.value['couleur']  , this.vehiculeForm.value['type'] , this.vehiculeForm.value['miseEnCirculation'] , this.vehiculeForm.value['model'] , this.vehiculeForm.value['marque'] , this.vehiculeForm.value['matricule'] ).subscribe(
      async (res)=>{
        console.log("car added success");
        this.user.vehicules[this.user.vehicules.length] = car;
        await this.storage.set('user',this.user)
        while(this.user == undefined){
          this.user = await res;
        }
        this.router.navigate(['/profil']);
      }
    )
  }
}
