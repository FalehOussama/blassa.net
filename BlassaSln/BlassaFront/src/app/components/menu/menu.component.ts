import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { InviteComponent } from '../invite/invite.component';
import { StorageService } from 'src/app/services/storage.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  implements OnInit  {

  constructor(
    private router : Router,
    private token : TokenStorageService,
    private inviteComponent : InviteComponent,
    private storage : StorageService,
    public menuCtrl: MenuController
  ) { 
      
  }

  async ngOnInit() {
    await this.storage.get('user').then(
      async data => {
        this.user = await data;
      }
    );
  }

  toggleSideMenu() { this.menuCtrl.toggle(); }

  method : any;
  imageUrl:any='';
  user:any;
  async ionViewWillEnter() {
    this.method = this.token.method;

//Informations personnelles par defaut
    if(this.method == "Facebook"){
      this.imageUrl = this.token.user.user.photoUrl;
    }
    if(this.method == "Google"){
      this.imageUrl = this.token.user.imageUrl;
    }
    if(this.method == "Invite"){
      this.imageUrl = "https://static.vecteezy.com/system/resources/previews/009/507/522/original/blue-avatar-sign-semi-flat-color-icon-customer-profile-anonymous-guest-full-sized-item-on-white-network-simple-cartoon-style-illustration-for-web-graphic-design-and-animation-vector.jpg"

    }
  }

  isAlertOpen = false;
  isInviteAlert = false;

  public alertButtons = [
    {
      text: 'Pas maintenant',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'Se connecter',
      role: 'confirm',
      handler: () => {
        this.router.navigate(['/']);
      },
    },
  ];


  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

  setOpen2(isInvite: boolean) {
    this.isInviteAlert = isInvite;
  }

  nouveauTrajet(){
    if(this.method!="Invite"){
      this.router.navigate(['/nouveau-trajet']);
    }else{
      console.log("invite")
      this.setOpen2(true);
    }
  }

  clicked(ev){}

  rechercherTrajet(){
    this.router.navigate(['/rechercher-trajets']);
  }

  monProfil(){
    if(this.method!="Invite"){
      this.router.navigate(['/profil']);
    }else{
      console.log("invite")
      this.setOpen2(true);
    }
  }

  mesTrajets(){

    if(this.method!="Invite"){
      this.router.navigate(['/mes-trajets']);
    }else{
      console.log("invite")
      this.setOpen2(true);
    }
  }

  async logout(){
    await this.storage.clear();
    this.router.navigate(['/']);
  }

  
}
