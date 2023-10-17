import { Component, Input, NgZone, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Sim, SimCard } from '@jonz94/capacitor-sim';
import { Geocoder } from 'ionic-native';
import { AnnonceStorageService } from 'src/app/services/annonce-storage.service';
import { AnnonceService } from 'src/app/services/annonce.service';
import { StorageService } from 'src/app/services/storage.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-rechercher-trajets',
  templateUrl: './rechercher-trajets.page.html',
  styleUrls: ['./rechercher-trajets.page.scss'],
})
export class RechercherTrajetsPage implements OnInit {
  static lonDep: any;
  static latDep: any;
  static lonDes: any;
  static latDes: any;

  constructor(
    private router: Router,
    public zone: NgZone,
    private annonceService : AnnonceService,
    private annonceStorage : AnnonceStorageService,
    private userService : UserService,
    private token : TokenStorageService,
    private storage : StorageService,
    public formBuilder: FormBuilder,
  ) { 
    this.storage.get('user').then(
      async data => {
        this.user = await data;
      }
    )

    this.GoogleAutocompleteDep = new google.maps.places.AutocompleteService();
    this.autocompleteDep = { input: '' };
    this.autocompleteItemsDep = [];

    this.GoogleAutocompleteDes = new google.maps.places.AutocompleteService();
    this.autocompleteDes = { input: '' };
    this.autocompleteItemsDes = [];
  }

  autocompleteDep: { input: string; };
  autocompleteItemsDep: any[];
  GoogleAutocompleteDep: any;

  autocompleteDes: { input: string; };
  autocompleteItemsDes: any[];
  GoogleAutocompleteDes: any;
  
  placeid: any;
  lonDes:any;
  latDes:any;


  //Maj

  today : String = new Date().toISOString();

  user:any;
  recherche: FormGroup;
  listeRecherches:any;

  //Maj

  @Input() depart:any;
  @Input() dest:any;
  Date:number = Date.now();
  date:any=null;
  @Input() passagers: any = 1;

  

  isAlertOpen = false;
  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }


  sliced:any;
  ngOnInit() {
    this.date = this.today;
    this.recherche = this.formBuilder.group({
      nbrPassager: [this.passagers, ],
      date:[this.today.toString().slice(0,19),],
      depart:["-",],
      destination:["-",]
    });

  }

  parseDate(date) {
    const newDate = new Date();      
      newDate.setFullYear(date[0] , date[1] , date[2]);
      return newDate
  }

  convertDate(date){
    if(date[1]>10){
      return date[0] +"-"+ date[1] +"-"+ date[2] +"T"+ date[3] +":"+ date[4] +":00"   
    }else{
      return date[0] +"-0"+ date[1] +"-"+ date[2] +"T"+ date[3] +":"+ date[4] +":00" 
    }
    
  }

  rechercheParHistorique(dep:any , des:any , nbp:any , date:any){
    
    this.annonceService.rechercher2(dep , des , nbp , this.recherche.value['date'] ).subscribe(
      async data=>
      {
      console.log(data);
      await this.storage.set('annonces' , data);
      this.listeTrajets();
      }
    )

  }

  rechercher(){
    console.log(this.recherche.value['depart'])
    console.log(this.depart) 

    if(this.depart == undefined ) this.recherche.value['depart']="-"
    if(this.dest == undefined ) this.recherche.value['destination']="-"

    this.annonceService.rechercher(this.user?.id_User , this.recherche.value['depart'] , this.recherche.value['destination']  ,this.recherche.value['nbrPassager']  , "2020-01-01T10:10:10"  ).subscribe(
      async data=>
      {
        await this.storage.set('annonces' , data);
        await this.userService.getUserById(this.user?.id_User).subscribe(
          async (res)=> await this.storage.set('user',res)
          
        )
      console.log(this.storage.get('annonces'));
      this.listeTrajets();
      }
    )
  }



  get errorControl() {
    return this.recherche.controls;
  }



  //Code Champ nombre passager
  plusPa() { if (this.passagers < 8) this.passagers++; }
  minusPa() {if (this.passagers > 0) this.passagers--; }
  //Fin

  //Code Google Maps

  SelectSearchResultDep(item) {
    ///WE CAN CONFIGURE MORE COMPLEX FUNCTIONS SUCH AS UPLOAD DATA TO FIRESTORE OR LINK IT TO SOMETHING
    // alert(JSON.stringify(item))      
    this.placeid = item.place_id;
    this.recherche.value['depart']= item.structured_formatting["main_text"];
    this.depart = item.description
    this.autocompleteItemsDep = [];
    // this.getLatLngFromAddressDep(item.place_id);
    console.log(RechercherTrajetsPage.lonDep);
}
  

  SelectSearchResultDes(item) {   
    this.dest=item.description
    console.log(item)
    this.placeid = item.place_id;
    this.recherche.value['destination']= item.structured_formatting["main_text"];
    this.lonDes = item;
    this.latDes = item.latitude;
    this.autocompleteItemsDes = [];
  }


  UpdateSearchResultsDes(){
    if (this.autocompleteDes.input == '') {
      this.autocompleteItemsDes = [];
      return;
    }
    this.GoogleAutocompleteDes.getPlacePredictions({ input: this.autocompleteDes.input },
    (predictions, status) => {
      this.autocompleteItemsDes = [];
      this.zone.run(() => {
        predictions.forEach((prediction) => {
          this.autocompleteItemsDes.push(prediction);
        });
      });
    });
  }

  UpdateSearchResultsDep(){
    if (this.autocompleteDep.input == '') {
      this.autocompleteItemsDep = [];
      return;
    }
    this.GoogleAutocompleteDep.getPlacePredictions({ input: this.autocompleteDep.input },
    (predictions, status) => {
      this.autocompleteItemsDep = [];
      this.zone.run(() => {
        predictions.forEach((prediction) => {
          this.autocompleteItemsDep.push(prediction);
        });
      });
    });
  }
  

  //Redirection
  listeTrajets(){
    this.router.navigate(['/home']);
  }



  
  //  getLatLngFromAddressDep(place_Id : any ){

  //   var geocoder = new google.maps.Geocoder();
  
  //   geocoder.geocode( { 'placeId': place_Id}, function(results, status) {
  
  //     if (status == google.maps.GeocoderStatus.OK) {
  //       RechercherTrajetsPage.lonDep =results[0].geometry.location.lng();
  //       RechercherTrajetsPage.latDep =results[0].geometry.location.lat();
  
  //     } else {
  //       console.log("Geocode was not successful for the following reason: " + status);
  //     }
  //   });

  // }
}
