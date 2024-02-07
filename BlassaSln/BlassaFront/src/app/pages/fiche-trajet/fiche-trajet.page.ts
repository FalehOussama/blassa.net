import {  Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal, Platform } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { AnnonceService } from 'src/app/services/annonce.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
//import { type } from 'cordova-plugin-inappbrowser/src/browser';
import { AppAvailability } from '@ionic-native/app-availability';
import { StorageService } from 'src/app/services/storage.service';
import { VoyageAvecType } from '../../classes/voyageAvecType';
import { ReservationStatusType } from '../../classes/reservationStatusType';
import { AvisComponent } from '../../components/avis/avis.component';
import { AvisCondComponent } from '../../components/avis-cond/avis-cond.component';
import { BlassaAlertComponent } from '../../components/blassa-alert/blassa-alert.component';
import { BlassaToastComponent } from '../../components/blassa-toast/blassa-toast.component';
import { Base64 } from 'js-base64';

declare var cordova: any;

@Component({
  selector: 'app-fiche-trajet',
  templateUrl: './fiche-trajet.page.html',
  styleUrls: ['./fiche-trajet.page.scss'],
})


export class FicheTrajetPage implements OnInit , OnDestroy {

  @ViewChild(IonModal) modal: IonModal;
  @ViewChild(AvisComponent) compAvis: AvisComponent;
  @ViewChild(AvisCondComponent) compAvisCond: AvisCondComponent;

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(null, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
    }
    this.isModalOpen = false;
  }
  
  constructor(
    private router : Router,
    private annonceService:AnnonceService , 
    private reservationService: ReservationService,
    public token : TokenStorageService,
    private callNumber: CallNumber,
    public platform: Platform,
    private storage: StorageService,
    private blassaAlert: BlassaAlertComponent,
    private blassaToast: BlassaToastComponent
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
       let browser = cordova.InAppBrowser.open(httpUrl + username, '_system', 'location=yes'); //new InAppBrowser(httpUrl + username, '_system');  
     return;  
   }  
 
   AppAvailability.check(app).then(() => { // success callback  
     let browser = cordova.InAppBrowser.open(appUrl + username, '_system', 'location=yes'); //new InAppBrowser(appUrl + username, '_system');  
         console.log("app launch", appUrl + username);  
       },  
       () => { // error callback  
         let browser = cordova.InAppBrowser.open(httpUrl + username, '_system', 'location=yes'); //new InAppBrowser(httpUrl + username, '_system');  
         console.log("url launch", httpUrl + username);  
       }  
      );  
   }

  user: any;
  months: any[] = ["Jan", "Fev", "Mar", "Avr", "Mai", "Juin", "Jui", "Aout", "Sep", "Oct", "Nov", "Dec"];
  id : any;
  annonce: any;
  aviStat: any;
  aviConducteurStat: any;
  idTrajetAnnonce: any;
  reservations : any;
  canBook : boolean;

  enAttente=0;
  acceptes=0;
  refuses=0;
  style = "tous";

  haveResAttente = false;
  haveResConfirmee = false;
  haveResRefusee = false;

  styleColors: string[] = [
    "black",
    "white",
    "gray",
    "lightgray",
    "purple", //BORDEAUX
    "red",
    "darkblue",
    "blue",
    "darkgreen",
    "green",
    "maroon",
    "beige",
    "orange",
    "yellow",
    "blueviolet",
    "hotpink"];

  async ionViewWillEnter() { }

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
                this.setImageVehicule();

                for (let reservation of this.annonce.reservations) {
                  if (reservation.status == 0) {
                    this.enAttente++;
                    if (this.user.id == reservation.userId) this.haveResAttente = true;
                  }
                  else if (reservation.status == 1) {
                    this.acceptes++;
                    if (this.user.id == reservation.userId) this.haveResConfirmee = true;
                  }
                  else if (reservation.status == 2) {
                    this.refuses++;
                    if (this.user.id == reservation.userId) this.haveResRefusee = true;
                  }                    
                }
                console.log(this.acceptes);

                this.style = this.annonce.voyageAvec == VoyageAvecType.FILLES ? "filles" :
                  (this.annonce.voyageAvec == VoyageAvecType.GARCONS ? "garcons" : "tous");

                console.log(this.annonce)
                this.reservations = this.annonce.reservations;
                this.canBook = this.annonce.userId != this.user.id;

                this.compAvis.userId = this.annonce.userId;
                this.compAvis.ngOnInit();

                this.compAvisCond.userId = this.annonce.userId;
                this.compAvisCond.ngOnInit();
              }
            );

          }
        );

      }
    );    
  }

  //Alert Logic

  //Reservation Logic
  async promptReserver() {
    await this.blassaAlert.confirm('Confirmer réservation', 'Veuillez confirmer votre réservation.', this.reserver.bind(this));
  }

  async reserver(){
      if(this.token.method == "Invite"){
        await this.blassaAlert.confirm('Mode invité', 'Veuillez vous connecter', this.inviteToConnect.bind(this));
      }
      else{
        this.reservationService.postReservation({ userId: this.user?.id, trajetAnnonceId: this.annonce?.id }).subscribe(
          async (res) => {
            location.reload();
            this.blassaToast.present('Reservation enregistrée avec succès !', 'bottom');
          },
          async (err) => {
            console.log(err);
            await this.blassaAlert.alert('Erreur ajout réservation', err.error);
          }
        );
      }
  }

  inviteToConnect() {
    this.router.navigate(['/']);
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
    this.storage.set('idMembre', idMembre);
    this.router.navigate(['/profil-membre']);  
  }

  isModalOpen = false;

  openModal(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  resParam: any;
  async promptAccepterRes(res) {
    this.resParam = res;
    await this.blassaAlert.confirm("Confirmer la réservation de " + res.userRes.prenom + " ?",
      'Veuillez confirmer la réservation.',
      this.accepterRes.bind(this));
  }

  async accepterRes() {
    this.resParam.status = ReservationStatusType.COMFIRMEE;
    console.log(this.resParam);
    this.reservationService.putReservation(this.resParam).subscribe(
      async (resp) => {
        this.acceptes++;
        this.enAttente--;
        this.annonce.nombrePlacesDispo--;
        console.log(resp)
      },
      async (err) => {
        console.log(err);
        await this.blassaAlert.alert('Acceptation réservation', err.error);
      }
    );
  }

  async promptRefuserRes(res) {
    this.resParam = res;
    await this.blassaAlert.confirm("Refuser la réservation de " + res.userRes.prenom + " ?",
      'Veuillez confirmer le refu de la réservation.',
      this.refuserRes.bind(this));
  }

  async refuserRes() {
    this.resParam.status = ReservationStatusType.REFUSEE;
    console.log(this.resParam);
    this.reservationService.putReservation(this.resParam).subscribe(
      async (resp) => {
        this.refuses++;
        this.enAttente--;
        console.log(resp)
      },
      async (err) => {
        console.log(err);
        await this.blassaAlert.alert('Refus réservation', err.error);
      }
    );
  }

  async promptEnAttenteRes(res: any) {
    this.resParam = res;
    await this.blassaAlert.confirm("Mettre la réservation de " + res.userRes.prenom + " en attente ?",
      'Veuillez confirmer la mise en attente de la réservation.',
      this.enAttenteRes.bind(this));
  }

  enAttenteRes() {
    let statusRes = this.resParam.status;
    this.resParam.status = ReservationStatusType.EN_ATTENTE;
    console.log(this.resParam);
    this.reservationService.putReservation(this.resParam).subscribe(
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
        this.resParam.status = statusRes;
        await this.blassaAlert.alert('Mise en attente réservation', err.error);
      }
    );
  }

  getStyleColor(index: number) {
    return this.styleColors ? "color-" + this.styleColors[index] : '';
  }

  async setImageVehicule() {
    if (this.annonce.vImage1) {
      this.writeFile(this.annonce.vImage1, this.onWFileImageLoaded);
    }
  }

  onWFileImageLoaded(hRef: string, ext: string) {
    this.annonce.vImage1Href = hRef;
  }

  writeFile(fileStr: string, onLoad: (hRef: string, ext: string) => void) {
    const boundOnLoad = onLoad.bind(this);

    let fileType = this.detectMimeType(fileStr);
    let ext = this.detectExtension(fileStr);

    let uint8Array = Base64.toUint8Array(fileStr);
    let arrayBuffer = uint8Array.buffer;
    const dataView = new DataView(arrayBuffer);
    const blob = new Blob([dataView], { type: fileType });

    const reader = new FileReader();

    reader.onload = function () {
      let hRef: string = <string>reader.result;
      if (boundOnLoad)
        boundOnLoad(hRef, ext);
    };

    reader.onerror = function () {
      console.log(reader.error);
    };

    reader.readAsDataURL(blob);
  }

  detectMimeType(base64String: string) {
    const signatures = {
      JVBERi0: "application/pdf",
      R0lGODdh: "image/gif",
      R0lGODlh: "image/gif",
      iVBORw0KGgo: "image/png",
      TU0AK: "image/tiff",
      "/9j/": "image/jpg",
      UEs: "application/vnd.openxmlformats-officedocument.", //?? doc - docx - ppt - xls
      PK: "application/zip",
    };

    for (let s in signatures) {
      if (base64String.indexOf(s) === 0) {
        let x = signatures[s];

        // return
        return x;
      }
    }
    return '';
  }

  detectExtension(base64String: string) {
    const extSign = {
      JVBERi0: ".pdf",
      R0lGODdh: ".gif",
      R0lGODlh: ".gif",
      iVBORw0KGgo: ".png",
      TU0AK: ".tiff",
      "/9j/": ".jpg",
      UEs: ".docx", //?? doc - docx - ppt - xls
      PK: ".zip",
    };

    for (let s in extSign) {
      if (base64String.indexOf(s) === 0) {
        let ext = extSign[s];

        // return
        return ext;
      }
    }
    return '';
  }

}

