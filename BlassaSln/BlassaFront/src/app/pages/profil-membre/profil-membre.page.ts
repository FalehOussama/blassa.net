import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';
import { userModel } from '../../modules/user/user.module'
import { StorageService } from 'src/app/services/storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profil-membre',
  templateUrl: './profil-membre.page.html',
  styleUrls: ['./profil-membre.page.scss'],
})
export class ProfilMembrePage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private userService : UserService,
    private storage : StorageService,
    private formBuilder :FormBuilder,
  ) {
    this.storage.get('user').then(
      async data => {
        this.user = await data;
      }
    )
  }

  idMembre:number;
  membre:any;
  user:any;
  rating : any[];
  commentaires : any[];
  nombreTrajets:number;
  commentaireForm :FormGroup;

  async ionViewWillEnter(){

    await this.storage.get('membre').then(
      async data => {
        this.membre = await data;
        this.idMembre = await data.id_User;
        console.log(data.annonces)
      }
    )

    await this.userService.getNombreTrajets(this.membre?.uid).subscribe(
     async  (res)=>this.nombreTrajets = await res
    )
    await console.log(this.membre?.annonces)
    this.userService.getCommentaires(this.idMembre).subscribe(
      async (res)=>{
        this.commentaires = await res.reverse();
        console.log(res)
      }
    )
   await  this.ngOnInit();
  }
  async ngOnInit() {
    if(this.membre?.avis == undefined || this.membre?.avis == null){
      this.rating = userModel.avis;
    }
    else {
      this.rating = await this.membre?.avis;
    }
      
      console.log(this.rating)



      
    this.commentaireForm = this.formBuilder.group({
      commentaire: [''],
      dateCommentaire: [Date.now()],
      de: [this.user],
      pour: [this.membre],
    });

  }


  //Noter

  isNoterOpen = false;
  public alertButtons = [
    {
      text: 'Annuler',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'Noter',
      role: 'confirm',
      handler: () => {
        
      },
    },
  ];

  public alertInputs = [
    {
      type: 'radio',
      value : 1,
      label : "Très décevant"
    },
    {
      type: 'radio',
      value : 2,
      label : "Décevant"
    },
    {
      type: 'radio',
      value : 3,
      label : "Correct"
    },
    {
      type: 'radio',
      value : 4,
      label : "Bien"
    },
    {
      type: 'radio',
      value : 5,
      label : "Excellent"
    },
  ];

  openNoter(isOpen: boolean , ev) {
    this.isNoterOpen = isOpen;

    if(ev.detail.role == "confirm"){
      console.log(this.alertInputs)
    }
  }


  //Commenter

  commenter(){
    this.userService.addCommentaire(this.commentaireForm.value).subscribe(
     ()=> location.reload()
    )
  }
}
