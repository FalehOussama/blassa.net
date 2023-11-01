import { Component, OnDestroy, OnInit, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AviService } from 'src/app/services/avi.service';
import { AviConducteurService } from 'src/app/services/aviConducteur.service';
import { StorageService } from 'src/app/services/storage.service';
import { MaskitoElementPredicateAsync, MaskitoOptions } from '@maskito/core';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit  {

  readonly phoneMask: MaskitoOptions = {
    mask: [/\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/],
  };

  readonly maskPredicate: MaskitoElementPredicateAsync = async (el) => (el as HTMLIonInputElement).getInputElement();


  constructor(
    private userService: UserService,
    private aviService: AviService,
    private aviConducteurService: AviConducteurService,
    private router : Router,
    private storage : StorageService
  ) { 

    this.storage.get('user').then(
      async (data) => {
        let userStorage = await data;

        this.userService.getUserById(userStorage.id).subscribe(
          async (res) => {
            this.user = await res;
            this.user.preferences.voyageAvec = this.user.preferences.voyageAvec.toString();

            await this.aviService.getStat(this.user.id).subscribe(
              async resAvi => {
                this.aviStat = resAvi;
              }
            );

            await this.aviConducteurService.getStat(this.user.id).subscribe(
              async resAviConducteur => {
                this.aviConducteurStat = resAviConducteur;
              }
            );
          }
        );
      }
    );
    
  }
  
  user: any = {
    nom: '',
    prenom: '',
    sexe: '',
    email: '',
    tel1: '',
    dateNaissance: new Date(),
    description: '',
    preferences: {
      passager: false,
      tel: false,
      whatsApp: false,
      messenger: false,
      instantane: false,
      voyageAvec: "0",
      leger: false,
      moyen: false,
      lourd: false,
      max2: false,
      cigarette: false,
      animaux: false,
      verifies: false
    },
    vehicules: []
  };
  aviStat: any;
  aviConducteurStat: any;

  async ionViewWillEnter(){

    
    this.ngOnInit()
  }

  async ngOnInit() {  }

  enregistrer() {
    let prefs = this.user.preferences;
  }

}
