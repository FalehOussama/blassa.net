import {  Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonModal, Platform } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { AnnonceStorageService } from 'src/app/services/annonce-storage.service';
import { AnnonceService } from 'src/app/services/annonce.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { AppAvailability, InAppBrowser } from 'ionic-native';
import { StorageService } from 'src/app/services/storage.service';

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
  
  constructor(
    private route: ActivatedRoute , 
    private router : Router,
    private annonceService:AnnonceService , 
    private reservationService : ReservationService,
    public token : TokenStorageService,
    private userService : UserService,
    // public storedAnnonce : AnnonceStorageService,
    private callNumber: CallNumber,
    public platform: Platform,
    private storage : StorageService
    ) { 
      
    }

    user :any;
    months : any[] = ["Jan" , "Fev" , "Mar" , "Avr" , "Mai" , "Juin" , "Jui" , "Aout" , "Sep" , "Oct" , "Nov" , "Dec"]

    @HostListener('unloaded')
    async ngOnDestroy() {
      console.log("fiche destroyed")
      await this.storage.set('fiche', null)
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
 


  id : any;
  annonce : any;
  reservations : any;
  canBook : boolean;
  reserverDisabled : boolean = false;

  enAttente=0;
  acceptes=0;
  refuses=0;
  style="tous";

async ionViewWillEnter(){

  

 await this.storage.get('user').then(
    async data =>this.user = await data
  )

  await this.storage.get('fiche').then(
    async data => {
      this.annonce = await data;
      if(data.filles==true){
        this.style="filles";
       }
       else if(data.garcons){
        this.style="garcons";
       }else{
        this.style="tous"
       }
      for(let res of this.annonce?.reservations ){
        if(this.user?.id_User == res?.user.id_User){
          this.reserverDisabled= true;
        }
      }
    }
  )

  await this.annonceService.getAnnonceById(this.annonce?.id_Annonce).subscribe(
    async res => 
    {
      this.annonce = await res 
        for(let reservation of res.reservations){
          if(reservation.user.id_User==this.user?.id_User){this.reserverDisabled=true}
        }
    }
  )

  for(let res of this.annonce?.reservations){
    if(res.status=="EN_ATTENTE") this.enAttente++
    else if(res.status=="COMFIRMEE") this.acceptes++
    else if(res.status=="REFUSEE") this.refuses++
  }

  console.log(this.acceptes)


  this.ngOnInit();
}
async ngOnInit() {


  console.log(this.annonce)
  this.reservations = this.annonce?.reservations;
  this.canBook = await !(this.annonce?.id_User == this.user?.id_User);

  if(this.annonce?.inst){
    if(this.annonce?.reservations.length >= this.annonce?.nombrePlaces){
      this.reserverDisabled = true;
    }
  }
  

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
  messageConfirm=""
  res1:any
  setRes(res){
    this.res1=res
  }
  openAccepter(isOpen: boolean , ev) {
    this.messageConfirm="Confirmer la réservation de " + this.res1.user.nom + " ?"
    this.accepterOpen = isOpen;
    console.log(`Dismissed with role: ${ev.detail.role}`);

    if(ev.detail.role == "confirm"){
      console.log(this.res1)
      this.reservationService.confirmerReservation(this.res1.id_Reservation).subscribe(
        async(res)=>{
          this.res1.status="COMFIRMEE"
          this.acceptes++;
          this.enAttente--;
          console.log(res)
        }
      );
    }
  }


  refuserOpen = false;
  messageConfirmRef=""
  openRefuser(isOpen: boolean , ev) {
    this.messageConfirmRef="Refuser la réservation de " + this.res1.user.nom + " ?"
    this.refuserOpen = isOpen;
    console.log(`Dismissed with role: ${ev.detail.role}`);

    if(ev.detail.role == "confirm"){
      console.log(this.res1)
      this.reservationService.refuserReservation(this.res1.id_Reservation).subscribe(
        async (res)=>{
          this.res1.status="REFUSEE"
          this.refuses++;
          this.enAttente--;
          console.log(res)
        }
      );
    }
  }

  
  reserverOpen = false;
  messageReserver=""
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

