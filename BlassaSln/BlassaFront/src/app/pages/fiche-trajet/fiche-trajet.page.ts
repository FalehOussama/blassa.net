import {  Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonModal, Platform, AlertController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { AnnonceService } from 'src/app/services/annonce.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { AppAvailability, InAppBrowser } from 'ionic-native';
import { StorageService } from 'src/app/services/storage.service';
import { VoyageAvecType } from '../../classes/voyageAvecType';
import { ReservationStatusType } from '../../classes/reservationStatusType';

@Component({
  selector: 'app-fiche-trajet',
  templateUrl: './fiche-trajet.page.html',
  styleUrls: ['./fiche-trajet.page.scss'],
})


export class FicheTrajetPage implements OnInit , OnDestroy {

  @ViewChild(IonModal) modal: IonModal;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string;

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  public alertButtons1 = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        console.log('Alert confirmed');
      },
    },
  ];

  public alertButtons2 = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        console.log('Alert confirmed');
      },
    },
  ];

  public alertButtons3 = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        console.log('Alert confirmed');
      },
    },
  ];
  
  constructor(
    private route: ActivatedRoute , 
    private router : Router,
    private annonceService:AnnonceService , 
    private reservationService : ReservationService,
    public token : TokenStorageService,
    private userService : UserService,
    private callNumber: CallNumber,
    public platform: Platform,
    private storage: StorageService,
    private alertController: AlertController
    ) { 
      
  }

  @HostListener('unloaded')
  async ngOnDestroy() {
    console.log("fiche destroyed");
    await this.storage.set('fiche', null);
  }  

  // MESSENGER
  openFacebook() {  
    this.launchExternalApp('fb://profile', 'com.facebook.katana', 'fb://profile/', 'https://www.facebook.com/', "profile.php?id=100091911310808");  
  }  
 
  launchExternalApp(iosSchemaName: string, androidPackageName: string, appUrl: string, httpUrl: string, username: string) {  
     let app: string;  
     if (this.platform.is("ios"))  {  
            app = iosSchemaName;  
     } else if (this.platform.is("android")) {  
            app = androidPackageName; 
     } else {  
            let browser = new InAppBrowser(httpUrl + username, '_system');  
     return;  
   }  
 
   AppAvailability.check(app).then(() => { // success callback  
         let browser = new InAppBrowser(appUrl + username, '_system');  
         console.log("app launch", appUrl + username);  
       },  
       () => { // error callback  
         let browser = new InAppBrowser(httpUrl + username, '_system');  
         console.log("url launch", httpUrl + username);  
       }  
      );  
   }

  user: any;
  months: any[] = ["Jan", "Fev", "Mar", "Avr", "Mai", "Juin", "Jui", "Aout", "Sep", "Oct", "Nov", "Dec"];
  id : any;
  annonce: any;
  idTrajetAnnonce: any;
  reservations : any;
  canBook : boolean;
  reserverDisabled : boolean = false;

  enAttente=0;
  acceptes=0;
  refuses=0;
  style="tous";

  async ionViewWillEnter() {

       
  }

  async ngOnInit() {

    await this.storage.get('user').then(
      async data => {
        this.user = await data;

        await this.storage.get('idTrajetAnnonce').then(
          async dataId => {
            this.idTrajetAnnonce = await dataId;

            await this.annonceService.getTrajetAnnonceById(this.idTrajetAnnonce).subscribe(
              async res => {
                this.annonce = await res

                for (let reservation of this.annonce.reservations) {
                  if (reservation.userRes.id == this.user.id) { this.reserverDisabled = true }

                  if (reservation.status == 0) this.enAttente++;
                  else if (reservation.status == 1) this.acceptes++;
                  else if (reservation.status == 2) this.refuses++;
                }
                console.log(this.acceptes);

                this.style = this.annonce.voyageAvec == VoyageAvecType.FILLES ? "filles" :
                  (this.annonce.voyageAvec == VoyageAvecType.GARCONS ? "garcons" : "tous");

                console.log(this.annonce)
                this.reservations = this.annonce.reservations;
                this.canBook = this.annonce.userId != this.user.id;

                if (this.annonce.instantane) {
                  if (this.annonce.reservations.length >= this.annonce.nombrePlacesDispo) {
                    this.reserverDisabled = true;
                  }
                }
              }
            );

          }
        );

      }
    ); 

    
  }

  //Alert Logic

  //Reservation Logic 
  reserver(){
      if(this.token.method == "Invite"){
        this.setOpen2(true);
        return 0;
      }
      else{
        if(this.reserverDisabled == false){
          if(this.annonce?.reservations.length < 10){
            if(this.annonce?.inst){
              return this.reservationService.saveInst(this.annonce?.id_Annonce , this.user?.id_User).subscribe(
                async ()=>{
                  location.reload();
                  this.reserverDisabled = await true;
                  this.setInstToastOpen(true);
                }
              );
            }
            else{
              return this.reservationService.save(this.annonce?.id_Annonce , this.user?.id_User).subscribe(
               async  ()=>{
                  location.reload();
                  this.reserverDisabled = await true;
                  this.setToastOpen(true);
                }
              );
            }

          }else{
            console.log("max reservations")
            return 0;
          }
        }else{
          console.log("reservation refusée")
          return 0;
        }
      }
  }

  refuser(ev , idRes: any){
      console.log("refused")
      this.refuses++;
      if(ev.detail.role == "confirm"){
        console.log("refused")
        this.reservationService.refuserReservation(idRes).subscribe(
          ()=>{
          }
        );
      }
  }

  call(){
      this.callNumber.callNumber(this.user?.tel1, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }

  nouveauTrajet(){
      this.router.navigate(['/nouveau-trajet']);
  }

  whatsapp(){
      window.location.replace("https://api.whatsapp.com/send?phone="+ this.user?.tel1);
  }

  afficherMembre(idMembre){
      console.log(idMembre);
      this.userService.getUserById(idMembre).subscribe(
         async res => {
            console.log(res);
            await  this.storage.set('membre',res)
            this.router.navigate(['/profil-membre']);
          }
      )    
  }

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

  setOpen2(isInvite: boolean) {
    this.isInviteAlert = isInvite;
  }

  isModalOpen = false;

  openModal(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  setResult(ev) {
    console.log(`Dismissed with role: ${ev.detail.role}`);
  }

  accepterOpen = false;
  messageConfirm = "";
  res1: any;

  setRes(res){
    this.res1=res
  }

  openAccepter(isOpen: boolean, ev) {
    this.messageConfirm="Confirmer la réservation de " + this.res1.userRes.prenom + " ?"
    this.accepterOpen = isOpen;
    console.log(`Dismissed with role: ${ev.detail.role}`);

    if (ev.detail.role == "confirm") {
      this.res1.status = ReservationStatusType.COMFIRMEE;
      console.log(this.res1)
      this.reservationService.putReservation(this.res1).subscribe(
        async(res)=>{          
          this.acceptes++;
          this.enAttente--;
          this.annonce.nombrePlacesDispo--;
          console.log(res)
        },
        async (err) => {
          console.log(err);
          this.res1.status = ReservationStatusType.EN_ATTENTE;
          const alert = await this.alertController.create({
            header: 'Blassa message',
            subHeader: 'Acceptation réservation',
            message: err.error,
            buttons: ['OK'],
          });

          await alert.present();
        }
      );
    }
  }

  refuserOpen = false;
  messageConfirmRef = "";

  openRefuser(isOpen: boolean , ev) {
    this.messageConfirmRef="Refuser la réservation de " + this.res1.userRes.prenom + " ?"
    this.refuserOpen = isOpen;
    console.log(`Dismissed with role: ${ev.detail.role}`);

    if(ev.detail.role == "confirm"){
      this.res1.status = ReservationStatusType.REFUSEE;
      console.log(this.res1);
      this.reservationService.putReservation(this.res1).subscribe(
        async (res) => {
          this.refuses++;
          this.enAttente--;
          console.log(res)
        },
        async (err) => {
          console.log(err);
          this.res1.status = ReservationStatusType.EN_ATTENTE;
          const alert = await this.alertController.create({
            header: 'Blassa message',
            subHeader: 'Refus réservation',
            message: err.error,
            buttons: ['OK'],
          });

          await alert.present();          
        }
      );
    }
  }

  enAttenteOpen = false;
  messageConfirmAtt = "";
  openEnAttente(isOpen: boolean, ev) {
    this.messageConfirmAtt = "Mettre la réservation de " + this.res1.userRes.prenom + " en attente ?"
    this.enAttenteOpen = isOpen;
    console.log(`Dismissed with role: ${ev.detail.role}`);

    if (ev.detail.role == "confirm") {
      let statusRes = this.res1.status;
      this.res1.status = ReservationStatusType.EN_ATTENTE;
      console.log(this.res1);
      this.reservationService.putReservation(this.res1).subscribe(
        async (res) => {
          if (statusRes == ReservationStatusType.COMFIRMEE) {
            this.acceptes--;
            this.annonce.nombrePlacesDispo++;
          }
          if (statusRes == ReservationStatusType.REFUSEE)
            this.refuses--;
          this.enAttente++;
          console.log(res)
        },
        async (err) => {
          console.log(err);
          this.res1.status = statusRes;
          const alert = await this.alertController.create({
            header: 'Blassa message',
            subHeader: 'Mise en attente réservation',
            message: err.error,
            buttons: ['OK'],
          });

          await alert.present();
        }
      );
    }
  }

  
  reserverOpen = false;
  messageReserver = "";
  openReserver(isOpen: boolean , ev) {
    
    this.messageReserver="Demander une reservation ?"
    this.reserverOpen = isOpen;
    console.log(`Dismissed with role: ${ev.detail.role}`);

    if(ev.detail.role == "confirm"){
      this.reserver();
    }
  }

  reservationDemandeToastOpen = false;
  setToastOpen(isOpen: boolean) {
    this.reservationDemandeToastOpen = isOpen;
  }

  reservationInstToastOpen = false;
  setInstToastOpen(isOpen: boolean) {
    this.reservationInstToastOpen = isOpen;
  }

}

