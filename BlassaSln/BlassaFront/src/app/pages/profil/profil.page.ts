import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';
import { userModel } from '../../modules/user/user.module';
import { StorageService } from 'src/app/services/storage.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit  {

  constructor(
    private userService : UserService,
    private router : Router,
    private storage : StorageService,
    private formBuilder : FormBuilder
  ) { 

    
  }

  user:any;

  async ionViewWillEnter(){

    await this.storage.get('user').then(
      async data => this.user = await data
    )
    this.ngOnInit()
  }

  async ngOnInit() {
    // console.log(this.user.prefs)
    this.sexe=this.user?.sexe
    this.updateProfile = this.formBuilder.group({
      nom: [this.user?.nom],
      desc: [this.user?.description],
      sim: [this.user?.tel1],
      dateNaissance:[this.user?.date_Naissance]
    })

    if(this.user?.date_Naissance==null){
      this.updateProfile.value['dateNaissance']='';
    }
  }

  toggleResMode(){
    if(this.user?.prefs.inst == null){
      this.user.prefs.inst = false
      this.storage.set('user' , this.user)
      this.userService.updateUser(this.user).subscribe();
    }else{
      this.user.prefs.inst = !this.user.prefs.inst;
      this.storage.set('user' , this.user)
      this.userService.updateUser(this.user).subscribe();
    }
    
  }

  @ViewChild(IonModal) modal: IonModal;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  
  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }
  
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss('confirm');
  }


  @ViewChild(IonModal) modal2: IonModal;

  message2 = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  onWillDismissEdit(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message2 = `Hello, ${ev.detail.data}!`;
    }
  }
  
  cancelEdit() {
    this.modal2.dismiss('cancel');
  }



  confirmEdit() {
    console.log(this.updateProfile.value['nom'])
    this.user.sexe=this.sexe;
    this.user.nom=this.updateProfile.value['nom']
    this.user.description=this.updateProfile.value['desc']
    this.user.tel1=this.updateProfile.value['sim']
    this.user.date_Naissance=this.updateProfile.value['dateNaissance']

    this.userService.updateUser(this.user).subscribe(
      async ()=>{
        await this.storage.set('user' , this.user)
        console.log("updated!");
        this.modal2.dismiss('confirm');
      }
    );
    
  }

  //Edit profile

  updateProfile:FormGroup
  sexe:string = 'H';
  modeRes:boolean=false;



}
