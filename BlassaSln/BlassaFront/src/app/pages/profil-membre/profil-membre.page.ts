import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AviService } from 'src/app/services/avi.service';
import { AviConducteurService } from 'src/app/services/aviConducteur.service';
import { CommentaireService } from 'src/app/services/commentaire.service';
import { StorageService } from 'src/app/services/storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { AvisComponent } from '../../components/avis/avis.component';
import { AvisCondComponent } from '../../components/avis-cond/avis-cond.component';
import { AvisModalComponent } from '../../components/avis-modal/avis-modal.component';
import { BlassaAlertComponent } from '../../components/blassa-alert/blassa-alert.component';

@Component({
  selector: 'app-profil-membre',
  templateUrl: './profil-membre.page.html',
  styleUrls: ['./profil-membre.page.scss'],
})
export class ProfilMembrePage implements OnInit {

  @ViewChild(AvisComponent) compAvis: AvisComponent;
  @ViewChild(AvisCondComponent) compAvisCond: AvisCondComponent;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private aviService: AviService,
    private aviConducteurService: AviConducteurService,
    private commentaireService: CommentaireService,
    private storage : StorageService,
    private formBuilder :FormBuilder,
    private modalCtrl: ModalController,
    private blassaAlert: BlassaAlertComponent,
    private toastController: ToastController
  ) {
    this.storage.get('user').then(
      async data => {
        this.user = await data;
      }
    );
    this.storage.get('idMembre').then(
      async data => {
        this.idMembre = await data;

        this.compAvis.userId = this.idMembre;
        this.compAvis.ngOnInit();

        this.compAvisCond.userId = this.idMembre;
        this.compAvisCond.ngOnInit();
        this.loadMembre();        
      }
    );
  }

  loadMembre() {
    this.userService.getUserMembre(this.idMembre).subscribe(
      async (res) => {
        this.membre = await res;
      }
    );
  }

  idMembre:bigint;
  membre:any;
  user:any;
  commentaireForm :FormGroup;

  async ionViewWillEnter(){
   await  this.ngOnInit();
  }

  async ngOnInit() {
    this.commentaireForm = this.formBuilder.group({
      commentaire: ['']
    });

  }

  async presentToast(msg: string, position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position: position,
    });

    await toast.present();
  }

  //Commenter
  commenter() {
    let comm = { userId: this.membre.id, userCommId: this.user.id, texte: this.commentaireForm.value.commentaire };
    this.commentaireService.post(comm).subscribe(
      async (res) => {
        this.loadMembre();
        this.commentaireForm.patchValue({ commentaire: '' });
        await this.presentToast('Commentaire enregistré avec succès !', 'bottom');
      },
      async (err) => {
        console.log(err);
        await this.blassaAlert.alert('Erreur ajout commentaire', err.error);
      }
    );
  }

  // Rating
  async openAvisModal(isConduite: boolean) {
    const modal = await this.modalCtrl.create({
      component: AvisModalComponent,
      componentProps: { membre: this.membre, isConduite: isConduite }
    })

    await modal.present();
    modal.onDidDismiss().then((modelData) => {
      if (modelData !== null && modelData.data !== undefined && modelData.data.ratingAvis > 0) {
        //this.modelData = modelData.data;
        console.log('Modal Data : ' + modelData.data);
        console.log('ratingAvis : ' + modelData.data.ratingAvis);
        let avi = { userId: this.membre.id, userAviId: this.user.id, categorie: (modelData.data.ratingAvis - 1) };
        if (isConduite) {
          this.aviConducteurService.post(avi).subscribe(
            async (res) => {
              this.compAvisCond.ngOnInit();
              this.loadMembre();
              await this.presentToast('Avi conduite enregistré avec succès !', 'bottom');
            },
            async (err) => {
              console.log(err);
              await this.blassaAlert.alert('Erreur ajout avi conduite', err.error);
            }
          );
        }
        else {
          this.aviService.post(avi).subscribe(
            async (res) => {
              this.compAvis.ngOnInit();
              this.loadMembre();
              await this.presentToast('Avi enregistré avec succès !', 'bottom');
            },
            async (err) => {
              console.log(err);
              await this.blassaAlert.alert('Erreur ajout avi', err.error);
            }
          );
        }
      }
    });
  }
}
