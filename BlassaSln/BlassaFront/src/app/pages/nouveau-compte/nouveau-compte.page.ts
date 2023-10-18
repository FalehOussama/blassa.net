import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimationController, IonContent } from '@ionic/angular';
import type { Animation } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { VehiculeService } from 'src/app/services/vehicule.service';
import { Vehicule } from '../../classes/vehicule';

import { MaskitoOptions, MaskitoElementPredicateAsync } from '@maskito/core';
import { StorageService } from 'src/app/services/storage.service';


@Component({
  selector: 'app-nouveau-compte',
  templateUrl: './nouveau-compte.page.html',
  styleUrls: ['./nouveau-compte.page.scss'],
})


export class NouveauComptePage implements OnInit {

  colors : any[] = ["Noir","Blanc", "Gris_Fonce", "Gris", "Bordeaux", "Rouge", "Bleu_Fonce","Bleu",
  "Vert_Foncé", "Vert" ,"Marron" , "Beige" , "Orange" , "Jaune" , "Violet" , "Rose"]
 
 types : any[] = ["Compacte","Berline","Cabriolet", "Break","Suv","Monospace"]

 readonly phoneMask: MaskitoOptions = {
  mask: [ /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/],
};

readonly maskPredicate: MaskitoElementPredicateAsync = async (el) => (el as HTMLIonInputElement).getInputElement();

  @ViewChild('content1', { read: ElementRef }) content1: ElementRef;
  @ViewChild('content2', { read: ElementRef }) content2: ElementRef;

  private animation: Animation;
  private animation2: Animation;
  ionicForm1: FormGroup;
  ionicForm2: FormGroup;
  vehiculeForm: FormGroup;
  preferences: FormGroup;



  constructor(
    private animationCtrl: AnimationController,
    public formBuilder: FormBuilder,
    public formBuilder1: FormBuilder,
    public formBuilder2: FormBuilder,
    public formBuilder3: FormBuilder,
    public userService: UserService,
    public vehiculeService: VehiculeService,
    public router : Router,
    private storage : StorageService,
    ) {

      this.storage.get('user').then(
        async data => {
          while(this.user==undefined){
            this.user = await data;
          }
        }
      )
    }


    @Input() role:string;
    @Input() audience : string="";
    @Input() sexe : string;
    user: any;
    vehicule: Vehicule;
  
  ngOnInit() {

    this.ionicForm1 = this.formBuilder.group({
      description: ['', ],
    });
    this.ionicForm2 = this.formBuilder.group({
      tel1: ['', [Validators.required]],
    });

    this.preferences = this.formBuilder.group({
      tel: [true, [Validators.required]],
      whatsapp: [false, []],
      messenger: [false, []],
      passager: [true, []],
    });

    this.vehiculeForm = this.formBuilder2.group({
      matricule: ['', [Validators.required]],
      marque: ['', [Validators.required]],
      model: ['', [Validators.required]],
      miseEnCirculation: ['', [Validators.required]],
      couleur: ['', [Validators.required]],
      type: ['', [Validators.required]],
      climatise: [false , [Validators.required]],
      verifie:[false]
    });
  }

  get errorControl() {
    return this.ionicForm2.controls;
  }

  get errorControl2() {
    return this.vehiculeForm.controls;
  }
  submitForm = () => {
    if (this.ionicForm2.valid) {
      console.log(this.ionicForm2.value);
      return false;
    } else {
      return console.log('Please provide all the required values!');
    }
  };


  //etape 1 cards

  //etape 1 cards


  ngAfterViewInit() {
    this.animation = this.animationCtrl
      .create()
      .addElement(this.content1.nativeElement)
      .duration(500)
      .fromTo('transform', 'translateX(0px)', 'translateX(-300px)')
      .fromTo('opacity', '1', '0');

      this.animation2 = this.animationCtrl
      .create()
      .addElement(this.content2.nativeElement)
      .duration(500)
      .fromTo('transform', 'translateX(0px)', 'translateX(-300px)')
      .fromTo('opacity', '1', '0');
  }

  async play() {
    await this.animation.play();
    const box = document.getElementById('content2');
    if(box!=null){
      box.style.position = 'absolute';
      box.style.zIndex = '2';
      this.etape3=true;
    }

    console.log(this.role)
    if(this.role=="conducteur"){
      this.audience="passagers"
    }
    else if(this.role=="Passager"){
      this.audience="conducteurs"
    }
  }

  async play2() {
    await this.animation2.play();
  }

  //Etape 3

  etape3:boolean=false;
  @Input() verifie:boolean = false;

  getVehicule(){
    console.log(this.vehiculeForm.value)
  }


  async enregistrerPassager(){
    
    await this.updateUserFront();
    this.enregistrer();
    this.storage.set('user' , this.user);

  }

  async enregistrerConducteur(){
    
    await this.updateUserFront();
    this.enregistrer();
    this.storage.set('user' , this.user);

  }


  updateUserFront(){

    this.user.sexe = this.sexe;    
    this.user.tel1 = this.ionicForm2.value['tel1'];
    this.user.description = this.ionicForm1.value['description'];

    this.user.preferences.passager = this.preferences.value.passager;
    this.user.preferences.tel = this.preferences.value.tel;
    this.user.preferences.tel = this.preferences.value.tel;
    this.user.preferences.whatsApp = this.preferences.value.whatsapp;
    this.user.preferences.messenger = this.preferences.value.messenger;

    this.user.nouveau = false;
    
    if (this.role == 'conducteur') {
      this.vehicule = new Vehicule();
      this.vehicule.userId = this.user.id;
      this.vehicule.matricule = this.vehiculeForm.value.matricule;
      this.vehicule.marque = this.vehiculeForm.value.marque;
      this.vehicule.modele = this.vehiculeForm.value.model;
      this.vehicule.climatise = this.vehiculeForm.value.climatise;
      this.vehicule.verifie = false;
      this.vehicule.miseEnCirculation = new Date(this.vehiculeForm.value.miseEnCirculation);
      let indexCouleur = this.colors.indexOf(this.vehiculeForm.value.couleur);
      this.vehicule.couleur = indexCouleur;
      let indexTypeV = this.types.indexOf(this.vehiculeForm.value.type);
      this.vehicule.typeVehicule = indexTypeV;
    }
  }

  enregistrer(){
     this.userService.updateUser(this.user).subscribe(
       async (res) => {
         console.log(this.user);
         if (this.vehicule != null) {
           this.vehiculeService.post(this.vehicule).subscribe(
             async (resV) => {
               this.router.navigate(['/rechercher-trajets']);
             }
             );
         }
         else
           this.router.navigate(['/rechercher-trajets']);
      }
    )
  }

  checkBoxs(){
    if(this.preferences.value['tel']==false && this.preferences.value['whatsapp']==false &&  this.preferences.value['messenger']==false){
      return false;
    }
    else return true;
  }
}
