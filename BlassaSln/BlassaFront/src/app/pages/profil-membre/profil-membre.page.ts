import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';
import { userModel } from '../../modules/user/user.module'
import { StorageService } from 'src/app/services/storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { RatingComponent } from 'src/app/components/rating/rating.component';
import { RatingModalComponent } from 'src/app/components/rating-modal/rating-modal.component';

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
    private modalCtrl : ModalController
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
  avis : any[];
  conduite : any[];
  commentaires : any[];
  nombreTrajets:number;
  commentaireForm :FormGroup;

  nombreAvis:number;
  nombreAvisConduite:number;

  noteAvis : any;
  noteConduite : any;

  avisStars: any[]=[];
  conduiteStars: any[]=[];

  async ionViewWillEnter(){

    await this.storage.get('membre').then(
      async data => {
        this.membre = await data;
        this.idMembre = await data.id_User;

        console.log(data.noteAvis)
        let j=0;
        for(let i = 4 ; i >= 0 ; i--){
          if(data.noteAvis>=1) this.avisStars[j] = 'star'
          else if(data.noteAvis<=0) this.avisStars[j] = 'star-outline'
          else if(data.noteAvis<1 && data.noteAvis >0)  this.avisStars[j] = 'star-half-outline'
          j++;
          data.noteAvis--;
        }

        let k=0;
        for(let i = 4 ; i >= 0 ; i--){
          if(data.noteConduite>=1) this.conduiteStars[k] = 'star'
          else if(data.noteConduite<=0) this.conduiteStars[k] = 'star-outline'
          else if(data.noteConduite<1 && data.noteConduite >0)  this.conduiteStars[k] = 'star-half-outline'
          k++;
          data.noteConduite--;
        }
      }
    )

    await this.userService.getNombreTrajets(this.membre?.uid).subscribe(
     async  (res)=>this.nombreTrajets = await res
    )
    await console.log(this.membre?.annonces)
    this.userService.getCommentaires(this.idMembre).subscribe(
      async (res)=>{
        this.commentaires = await res.reverse();
      }
    )
   await  this.ngOnInit();
  }
  async ngOnInit() {
    if(this.membre?.avis == undefined || this.membre?.avis == null){
      this.avis = userModel.avis;
    }
    else {
      this.avis = await this.membre?.avis;
      this.nombreAvis = this.avis[0] + this.avis[1] + this.avis[2] + this.avis[3] +this.avis[4]
    }

    if(this.membre?.conduite == undefined || this.membre?.conduite == null){
      this.conduite = userModel.conduite;
    }
    else {
      this.conduite = await this.membre?.conduite;
      this.nombreAvisConduite = this.conduite[0] + this.conduite[1] + this.conduite[2] + this.conduite[3] +this.conduite[4]
    }
      
      console.log(this.avis)
      console.log(this.conduite)
      console.log(this.nombreAvis)
      console.log(this.nombreAvisConduite)



      
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

  // Rating

    async openRatingModal(){
      const modal = await this.modalCtrl.create({
        component : RatingModalComponent,
        cssClass :  'ratingModal'
      })

      await modal.present();
    }
}
