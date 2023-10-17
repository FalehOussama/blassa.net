import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Location } from '@angular/common';
import { StorageService } from 'src/app/services/storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-car-info',
  templateUrl: './car-info.page.html',
  styleUrls: ['./car-info.page.scss'],
})
export class CarInfoPage implements OnInit {

  @Input() marque:any;
  @Input() model:any;
  @Input() mis:any;
  @Input() couleur:any;
  @Input() type:any;
  @Input() mat:any;
  @Input() climatise:any;
  @Input() verifie:Boolean = false;

  colors : any[] = ["Noir","Blanc", "Gris_Fonce", "Gris", "Bordeaux", "Rouge", "Bleu_Fonce","Bleu",
   "Vert_Foncé", "Vert" ,"Marron" , "Beige" , "Orange" , "Jaune" , "Violet" , "Rose"]
  
  types : any[] = ["Compacte","Berline","Cabriolet", "Break","Suv","Monospace"]
  vehiculeForm:FormGroup;


  constructor(
    private route: ActivatedRoute,  
    private userService : UserService,
    private location : Location,
    private storage :StorageService,
    private formBuilder : FormBuilder
    ) { 

    }
    
    user:any;
    i:any;
    vehicule:any;
    
    async ionViewWillEnter(){

      await this.storage.get('user').then(
        async data => {
            this.user = await data;
            this.vehicule = await data.vehicules[this.i]
            console.log(this.vehicule)
        }
      )
    
      this.ngOnInit()
    }

    today = Date.now();

  async ngOnInit() {
  
      this.i = this.route.snapshot.paramMap.get('i');

      this.vehiculeForm = this.formBuilder.group({
        matricule: [this.vehicule?.matricule],
        marque: [this.vehicule?.marque, [Validators.required]],
        model: [this.vehicule?.model, [Validators.required]],
        miseEnCirculation: [this.vehicule?.miseEnCirculation],
        couleur: [this.vehicule?.couleur],
        type: [this.vehicule?.type],
        climatise: [this.vehicule?.climatise],
      });
      

     

      console.log(this.vehiculeForm.value)

  }

  async deleteCar(){

    const newVehicules: any[] = [];

    for(let j =0 ; j <this.user.vehicules.length ; j++){
      if(j!=this.i){
        newVehicules.push(this.user.vehicules[j]);
      }
    }

    this.user.vehicules = newVehicules;
    await this.storage.set('user' , this.user);

    this.userService.updateUser(this.user).subscribe(
      ()=>{
        console.log(" car deleted!");
        this.location.back();
        this.ngOnInit()
      }
    );
  }

  async updateCar(){

    this.user.vehicules[this.i] = this.vehiculeForm.value;
    console.log(this.vehiculeForm.value)
    await this.storage.set('user' , this.user);

    this.userService.updateUser(this.user).subscribe(
      ()=>{
        console.log(" car updated!");
        this.location.back();
        this.ngOnInit()
      }
    );
  }

}
