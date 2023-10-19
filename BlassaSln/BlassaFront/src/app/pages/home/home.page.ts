import { Component, Input, NgZone, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AnnonceService } from 'src/app/services/annonce.service';
import { IonModal, LoadingController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@capacitor/geolocation';
import { RefreshService } from 'src/app/services/refresh.service';
import { StorageService } from 'src/app/services/storage.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TrajetAnnonceCriteresDto } from '../../classes/trajetAnnonceCriteresDto';
import { TrajetAnnonceTriTypeDto } from '../../classes/trajetAnnonceTriTypeDto';
import { TrajetsAnnoncesRechercheRetourDto } from '../../classes/trajetsAnnoncesRechercheRetourDto';
import { HeureDepartCritereTypeDto } from '../../classes/heureDepartCritereTypeDto';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit  {

  @ViewChild(IonModal) modal: IonModal;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string;

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onDidDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.tri = +this.filtreForm.value.tri;
      this.trajetAnnonceCriteresDto.heureDepart = +this.filtreForm.value.heureDepart;
    }
    else {
      //this.filtreForm.controls.tri.value = "0";
      this.tri = TrajetAnnonceTriTypeDto.DEPART_PLUS_TOT;
      this.trajetAnnonceCriteresDto.heureDepart = HeureDepartCritereTypeDto.TOUS;
    }

    this.filtreForm.patchValue({
      tri: this.tri.toString(),
      heureDepart: this.trajetAnnonceCriteresDto.heureDepart.toString()
    });

    this.currentPage = 1;
    this.loadAnnonces();
  }

  answer = "dpt";

  constructor(
    private router : Router,
    private annonceService : AnnonceService,
    public loadingController: LoadingController,
    private nativeGeocoder: NativeGeocoder,
    private ngZone: NgZone,
    private storage : StorageService,
    private formBuilder : FormBuilder,
  ) {

    this.filtreForm = this.formBuilder.group({
      tri: ["0"],
      heureDepart: ["0"]
    });

    this.loadAnnonces();
    this.storage.get('user').then(
      async data => {
        this.user = await data;
      }
    )
  }

  public lat: any;  public lng: any;
  showingCurrent: boolean = true;
  address: string;

  annonces : any;
  user :any;
  tel : any;


  depart?:any;
  destination?:any;

  Nom:any;
  MD:any;

  filtreForm:FormGroup;

  async ionViewWillEnter(){    
    this.ngOnInit();
  } 

  keys = ['cigarette', 'climatisation', 'max2', 'animal', 'leger', 'moyen', 'lourd', 'inst'];
  keys2 = ['superDriver', 'verifie'];

  trajetAnnonceCriteresDto: TrajetAnnonceCriteresDto;
  trajetsAnnoncesRechercheRetourDto: TrajetsAnnoncesRechercheRetourDto;

   async ngOnInit() {
    this.tel = this.user?.tel1;
    this.sexe = this.user?.sexe;
    console.log(this.annonces);

    this.setCurrentPosition();  

     // setInterval(this.refresh.refreshAnnonces , 10000);
   }



  //Tri
  triDepartTot(){
    //this.annonces.sort((a,b)=> (a.heure_Depart[0]*100+a.heure_Depart[1]) - (b.heure_Depart[0]*100+b.heure_Depart[1]) )
  }

  prixPlusBas(){
    //this.annonces.sort((a,b)=> a.prix - b.prix)
  }


  filtredAnnonces:any;
  unFiltredAnnonces:any;
  filtrer(id:string , niveau:string){

    //if(this.filtreForm.value[id]===true){
    //  console.log("true")
    //  if(niveau=='annonce'){
    //    const result = this.annonces.filter((obj) => {
    //        return obj[id] == true;
    //    });
    //    this.annonces = result;
    //  }else{
    //    const result = this.annonces.filter((obj) => {
    //        return obj.conducteur[id] == true;
    //      }
    //    );
    //    this.annonces= result;
    //  }
    //}else if(this.filtreForm.value[id]===false){
    //  console.log("false")
    //  let result = this.unFiltredAnnonces;
    //  for(let key of this.keys){
    //    if(this.filtreForm.value[key]==true){
    //       result = result.filter((obj) => {
    //        return obj[id] == true;
    //      }
    //    );
    //    }
    //  }
    //  for(let key of this.keys2){
    //    if(this.filtreForm.value[key]==true){
    //       result = result.filter((obj) => {
    //        return obj.conducteur[id] == true;
    //      }
    //    );
    //    }
    //  }
    //  this.annonces = result;
    //}
  
  }


  at:any;

  temps(temps1 , temps2){
  //  const result = this.unFiltredAnnonces.filter((obj) => {
  //    console.log(obj.date_Heure_Depart[3])
  //    return obj.date_Heure_Depart[3] > temps1 && obj.date_Heure_Depart[3] <= temps2;
  //  }
  //);
  //this.annonces= result;
  //  console.log(this.annonces)
  }



   //geo
   async setCurrentPosition() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.ngZone.run(() => {
      this.lat = coordinates.coords.latitude;
      this.lng = coordinates.coords.longitude;
      console.log(this.lat);
      console.log(this.lng);
      this.geocode();
    })
    this.showingCurrent = true;
  }

  async geocode() {
    if (this.address != "") {
      let options: NativeGeocoderOptions = {
        useLocale: true,
        maxResults: 5
      };
      this.nativeGeocoder.forwardGeocode(this.address, options)
        .then((result: NativeGeocoderResult[]) => {
          this.ngZone.run(() => {
            this.lat = parseFloat(result[0].latitude);
            this.lng = parseFloat(result[0].longitude);
          })
          this.showingCurrent = false;
          console.log(this.address)
          alert(this.address);
        })
        .catch((error: any) => console.log(error));
    }
    else {
      alert('Please add address to Geocode');
    }
  }

  showed:boolean = false;
  sexe:string;
  annonceSexe:string;

  afficherFiche(id){
    //this.annonceService.getAnnonceById(id).subscribe(async (data) => {
    //  await this.storage.set('fiche' , data);
    //  console.log(data)
    //  if(data.filles){this.annonceSexe = "F"}
    //  else if(data.garcons){this.annonceSexe = "H"}
    //  else {this.annonceSexe = "T"}

    //  if (this.annonceSexe == this.sexe || this.annonceSexe === "T"){
    //    this.router.navigate(['/fiche-trajet']);
    //  }
    //  else{
    //    console.log("annonce inaccessible");
    //    //annonce set undefined
    //  }
    //});
  }





  //plus proche
  distance(lat1, lon1, lat2, lon2) {
    const r = 6371; // km
    const p = Math.PI / 180;
  
    const a = 0.5 - Math.cos((lat2 - lat1) * p) / 2
                  + Math.cos(lat1 * p) * Math.cos(lat2 * p) *
                    (1 - Math.cos((lon2 - lon1) * p)) / 2;
  
    return 2 * r * Math.asin(Math.sqrt(a));
  }

  triPlusProchePointDep(){
    //this.annonces.sort( (a,b) => this.distance(0,0,a.trajet.latDep,a.trajet.lonDep) - this.distance(0,0,b.trajet.latDep,b.trajet.lonDep));
    //console.log("sorted");
    //console.log(this.annonces); 
  }


  //pagination
  public count = 0;
  public itemsPerPage = 10;
  public currentPage = 1;

  public onChange(event): void {
    console.dir(event);
    this.currentPage = event;
    this.loadAnnonces();
  }

  public tri = TrajetAnnonceTriTypeDto.DEPART_PLUS_TOT;

  private async loadAnnonces() {
    if (this.trajetAnnonceCriteresDto == null)
      this.trajetAnnonceCriteresDto = await this.storage.get('trajetAnnonceCriteresDto');
    this.annonceService.trajetsAnnoncesRecherchePost(this.trajetAnnonceCriteresDto, this.tri, this.currentPage).subscribe(
          async (res) => {
            this.trajetsAnnoncesRechercheRetourDto = await res;
            this.count = this.trajetsAnnoncesRechercheRetourDto.count;
            this.annonces = this.trajetsAnnoncesRechercheRetourDto.trajets;
          }
    );
  }
}
