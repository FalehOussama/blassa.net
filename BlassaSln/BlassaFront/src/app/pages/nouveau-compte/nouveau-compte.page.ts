import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import { Animation, MenuController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

import { MaskitoOptions, MaskitoElementPredicateAsync } from '@maskito/core';
import { StorageService } from 'src/app/services/storage.service';


@Component({
  selector: 'app-nouveau-compte',
  templateUrl: './nouveau-compte.page.html',
  styleUrls: ['./nouveau-compte.page.scss'],
})


export class NouveauComptePage implements OnInit {

 readonly phoneMask: MaskitoOptions = {
  mask: [ /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/],
};

readonly maskPredicate: MaskitoElementPredicateAsync = async (el) => (el as HTMLIonInputElement).getInputElement();

  @ViewChild('content1', { read: ElementRef }) content1: ElementRef;
  @ViewChild('content2', { read: ElementRef }) content2: ElementRef;

  private animation: Animation;

  constructor(
    private animationCtrl: AnimationController,
    public formBuilder: FormBuilder,
    public formBuilder1: FormBuilder,
    public formBuilder2: FormBuilder,
    public formBuilder3: FormBuilder,
    public userService: UserService,
    public router : Router,
    private storage: StorageService,
    public menuCtrl: MenuController
    ) {

      
    }


    @Input() role:string;
    @Input() audience : string = "";
    @Input() sexe: string = "H";
    @Input() description: string;
    @Input() tel1: string;
    @Input() tel: boolean = true;
    @Input() whatsApp: boolean;
    @Input() messenger: boolean;
    user: any;

  ionViewWillEnter() {
    this.storage.get('user').then(
      async data => {
        while (this.user == undefined) {
          this.user = await data;
        }
      }
    );
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
  }

  //etape 1 cards

  ngAfterViewInit() {
    this.animation = this.animationCtrl
      .create()
      .addElement(this.content1.nativeElement)
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
    }

    if(this.role=="conducteur"){
      this.audience="passagers"
    }
    else if(this.role=="Passager"){
      this.audience="conducteurs"
    }
  }

  //Etape 3

  updateUserFront(){

    this.user.sexe = this.sexe;
    this.user.description = this.description;
    this.user.tel1 = this.tel1;

    this.user.preferences.tel = this.tel;
    this.user.preferences.whatsApp = this.whatsApp;
    this.user.preferences.messenger = this.messenger;

    this.user.nouveau = false;
  }

  enregistrer() {
    this.updateUserFront();
     this.userService.updateUser(this.user).subscribe(
       async (res) => {
         this.menuCtrl.enable(true);

         if (this.role == "conducteur") {
           this.router.navigate(['/mes-vehicules-fiche']);
         }
         else if (this.role == "Passager") {
           this.router.navigate(['/rechercher-trajets']);
         }         
      }
    )
  }

  conducteurClick() {
    this.role = "conducteur";
    this.user.preferences.passager = false;
  }

  passagerClick() {
    this.role = "passager";
    this.user.preferences.passager = true;
  }

  isForm2Valid() {
    return (this.tel1 !== undefined && this.tel1 !== null && this.tel1.length === 10) &&
            (this.tel || this.whatsApp || this.messenger);
  }

}
