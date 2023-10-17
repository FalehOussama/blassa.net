/// <reference types="@types/googlemaps" />
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AnnonceStorageService } from 'src/app/services/annonce-storage.service';
import { AnnonceService } from 'src/app/services/annonce.service';
import { RefreshService } from 'src/app/services/refresh.service';
import { StorageService } from 'src/app/services/storage.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';
import { formatInTimeZone, format, utcToZonedTime } from 'date-fns-tz'
import { th } from 'date-fns/locale';



@Component({
  selector: 'app-nouveau-trajet',
  templateUrl: './nouveau-trajet.page.html',
  styleUrls: ['./nouveau-trajet.page.scss'],
})
export class NouveauTrajetPage implements OnInit  {

  @Input() depart:any;
  @Input() destination:any;
  @Input() prix: any = 0;
  @Input() passagers: any = 3;
  date:any=null;
  today : String = new Date().toISOString();
  heure:any;

  max:boolean = false;
  cig:boolean = false;
  climatisation:boolean = false;
  animaux:boolean = false;
  inst:boolean=true;
  vehicule:any;

  filles:boolean=false
  tous:boolean=false
  garcons:boolean=false
  gender:string
  verifies:boolean=false;


  location: any;
  etape : number = 1;
  dateAffiche:Date;

  @Input() Time = new Date();

  pref:any;
  user : any;
  car0:any;
  car1:any;
  car2:any;
  hasNoCar:boolean;
  sliced:string;
  role:string="inst";


  static lonDep: any;
  static latDep: any;
  static lonDes: any;
  static latDes: any;


  constructor(
    public zone: NgZone,
    private router : Router,
    private annonceService : AnnonceService,
    private userService : UserService,
    private navCtrl: NavController,
    private anstrg:AnnonceStorageService,
    private storage : StorageService,
    private formBuilder :FormBuilder,
    private formBuilder2 :FormBuilder,
    private formBuilder4 :FormBuilder,
  ) {

    this.storage.set("fiche",null)
 
    this.GoogleAutocompleteDep = new google.maps.places.AutocompleteService();
    this.autocompleteDep = { input: '' };
    this.autocompleteItemsDep = [];

    this.GoogleAutocompleteDes = new google.maps.places.AutocompleteService();
    this.autocompleteDes = { input: '' };
    this.autocompleteItemsDes = [];
  }


  toEtape4(){
    this.etape=4;
  }


  toEtape3(){
    if(this.bagageForm.value['lourd']==true){
      this.bagageForm.value['moyen']=true
      this.bagageForm.value['leger']=true
    }
    if(this.bagageForm.value['moyen']==true){
      this.bagageForm.value['leger']=true
    }
    this.etape=3;
  }

  toEtape2(){
    this.etape=2;
    this.sliced= this.today.toString()
  }

  toEtape1(){
    this.etape=1;
  }

  toggle(id:string){
    this.comm.value[id]=!this.comm.value[id]
    const btn = document.getElementById(id)
    if(btn!=null){
      if(this.comm.value[id]==true){
        btn.setAttribute("fill", "solid" )
      }
      else{
        btn.setAttribute("fill", "outline" )
      }
    }
  }

  async ionViewWillEnter(){
    await  this.storage.get('user').then(
     async data => this.user = await data
   )
    this.etape=1;
    this.ngOnInit();
  } 


  zonedTime:any;
  h:number;
  m:number;
  h2:any;
  h3:any;
  HoursArray:any=[];
  MinutesArray:any=[];

  createTime(h:any , m:any){
    h=h+2;

    if(m<15){
      this.MinutesArray = [15 , 30 , 45]
    }else if(m>15 && m<30){
      this.MinutesArray = [30 , 45]
    }else if(m>30 && m<45){
      this.MinutesArray = [45]
    }else if(m>45){
      h++;
      this.MinutesArray = ['00' , 15 , 30 , 45]
    }
    let C=0;
    for (let i = h; i < 25; i++) {
      if(i<10){
        this.HoursArray[C]="0"+i
        C++;
      }else{
        this.HoursArray[C]=i
        C++;
      }
    }


    console.log(this.HoursArray)
    console.log(this.MinutesArray)
  }

  ngOnInit() {

    //Heure fix

    

    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const date = Date.now();
    this.zonedTime = utcToZonedTime(date, userTimeZone);
    this.sliced = this.zonedTime.toISOString().slice(0,16); 
    this.h2=this.zonedTime.toISOString()
    this.h = this.h2.substring(13,11)
    this.m = this.h2.substring(16,14)
    

    // this.createTime(Number(this.h) , Number(this.m))
    //Fin 
    if(this.user?.vehicules[0]!=null && this.user?.vehicules[0]!=null){this.vehicule = this.user?.vehicules[0]}

    this.vehiculeForm = this.formBuilder.group({
      mat: [''],
      marque: ['', [Validators.required]],
      model: ['', [Validators.required]],
      mis: [''],
      couleur: [null],
      type: [null],
      climatise: [false],
    });

    this.comm = this.formBuilder4.group({
      tel: [true],
      whatsapp: [false],
      messenger: [false],
    });

    this.bagageForm = this.formBuilder2.group({
      leger: [this.user?.prefs.leger],
      moyen: [this.user?.prefs.moyen] ,
      lourd: [this.user?.prefs.lourd],
    });


    
    
    //Chargement des prefs
    console.log(this.user?.prefs)

    if(this.user?.prefs.filles==null && this.user?.prefs.garcons==null && this.user?.prefs.tous==null){
      this.gender="T"
    }else{
      if(this.user?.prefs.filles==true){
        this.gender="F"
      }
      else if(this.user?.prefs.garcons==true){
        this.gender="H"
      }
      else if(this.user?.prefs.tous==true){
        this.gender="T"
      }
    }



    this.comm.value['tel']=this.user?.prefs.tel;
    this.comm.value['whatsapp']=this.user?.prefs.whatsapp;
    this.comm.value['messenger']=this.user?.prefs.messenger;

    if(this.user?.prefs.inst == null) {
      this.inst = true;
    }else{
      this.inst = this.user?.prefs.inst;
    }
    

    this.max=this.user?.prefs.max2;
    this.climatisation=this.user?.prefs.clim;
    this.cig=this.user?.prefs.cig;
    this.animaux=this.user?.prefs.animaux;

    this.filles=this.user?.prefs.filles;
    this.garcons=this.user?.prefs.garcons;
    this.tous=this.user?.prefs.tous;
    this.verifies=this.user?.prefs.verifies;

    this.car0 =this.user?.vehicules[0];
    this.car1 =this.user?.vehicules[1];
    this.car2 =this.user?.vehicules[2];
    //Chargement des prefs

    // if(this.pref != undefined){
    //   this.lourd=this.pref.lourd;
    //   this.moyen=this.pref.moyen;
    //   this.leger=this.pref.leger;
  
    //   this.animaux=this.pref.animaux;
    //   this.climatisation = this.pref.climatisation;
    //   this.cig = this.pref.cig;
    //   this.max = this.pref.max2;
    //   this.instantanee = this.pref.instantanee;
    //   this.manuelle = !this.pref.instantanee;
    //   this.tel = this.pref.tel;
    //   this.whatsapp = this.pref.whatsapp;
    //   this.messenger = this.pref.messenger;
    // }
  }

  addCar(){
    this.router.navigate(['/add-car']);
  }

  plusPa() {
    if (this.passagers < 8) { this.passagers++; }

  }

  minusPa() {
    if (this.passagers > 0) { this.passagers--; }
  }

  plusPrix() {
    if (this.prix < 999) { this.prix++; }
  }

  minusPrix() {
    if (this.prix > 0) { this.prix--; }
  }

  nouveauTrajet(){
  }

  autocompleteDep: { input: string; };
  autocompleteItemsDep: any[];
  GoogleAutocompleteDep: any;

  autocompleteDes: { input: string; };
  autocompleteItemsDes: any[];
  GoogleAutocompleteDes: any;
  placeid: any;

  
  getLatLngFromAddressDep(place_Id : any){

    var geocoder = new google.maps.Geocoder();
  
    geocoder.geocode( { 'placeId': place_Id}, function(results, status) {
  
      if (status == google.maps.GeocoderStatus.OK) {
        NouveauTrajetPage.latDep=results[0].geometry.location.lat();
        NouveauTrajetPage.lonDep=results[0].geometry.location.lng();
      } else {
        console.log("Geocode was not successful for the following reason: " + status);
      }
    });
  }

  SelectSearchResultDep(item) {
    ///WE CAN CONFIGURE MORE COMPLEX FUNCTIONS SUCH AS UPLOAD DATA TO FIRESTORE OR LINK IT TO SOMETHING
    // alert(JSON.stringify(item))      
    this.placeid = item.place_id
    this.depart= item.description
    this.autocompleteItemsDep = [];
    this.getLatLngFromAddressDep(this.placeid);


  }


  getLatLngFromAddressDes(place_Id : any){

    var geocoder = new google.maps.Geocoder();
  
    geocoder.geocode( { 'placeId': place_Id}, function(results, status) {
  
      if (status == google.maps.GeocoderStatus.OK) {
        NouveauTrajetPage.latDes=results[0].geometry.location.lat();
        NouveauTrajetPage.lonDes=results[0].geometry.location.lng();
      } else {
        console.log("Geocode was not successful for the following reason: " + status);
      }
    });
  }

  SelectSearchResultDes(item) {
    ///WE CAN CONFIGURE MORE COMPLEX FUNCTIONS SUCH AS UPLOAD DATA TO FIRESTORE OR LINK IT TO SOMETHING
    // alert(JSON.stringify(item))      
    this.placeid = item.place_id
    this.destination= item.description
    this.autocompleteItemsDes = [];

    this.getLatLngFromAddressDes(this.placeid);
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

  getCar(a){
    this.vehicule=this.user?.vehicules[a];
  }

  isAlertOpen = false;
  public alertButtons = ['OK'];

  addSuccess(isOpen : boolean) {
    this.isAlertOpen = true;
  }

  validationTrajet(){
    return (this.depart!=null && this.depart!="" ) && (this.destination!=null && this.destination!="") 
  }

  validationVehicule(){
    if(this.car0!=undefined) return true
    else{
      return (this.vehiculeForm.value['marque']!="" ) && (this.vehiculeForm.value['model']!="" ) 
    }

  }




  async publierAnnonce(){
      if(this.climatisation==null)  this.climatisation=false
      if(this.animaux==null)  this.animaux=false
      if(this.max==null)  this.max=false
      if(this.cig==null)  this.cig=false

      if(this.gender=="T"){
        this.tous=true
        this.filles=false
        this.garcons=false
      }
      else if(this.gender=="F"){
        this.tous=false
        this.filles=true
        this.garcons=false
      }else if(this.gender=="H")
      {
        this.tous=false
        this.filles=false
        this.garcons=true
      }

    console.log(this.vehiculeForm.value)
    if(this.vehicule == null || this.vehicule==undefined){
      this.vehicule = this.vehiculeForm.value;
      this.ajouterVehicule();
    }
    
    await  this.annonceService.saveAnnonce(
      this.prix,
      this.depart,
      this.destination,
      NouveauTrajetPage.lonDes,
      NouveauTrajetPage.lonDep,
      NouveauTrajetPage.latDes,
      NouveauTrajetPage.latDep,
      this.user?.id_User,
      this.today.toString().slice(0,16),
      this.passagers,
      this.climatisation,
      this.bagageForm.value['lourd'],
      this.bagageForm.value['moyen'],
      this.bagageForm.value['leger'],
      this.cig,
      this.max,
      this.animaux,
      this.inst,
      this.vehicule,
      this.filles,
      this.garcons,
      this.tous,
      this.verifies,
      this.user

    ).subscribe(async (res)=>
      {
        await this.storage.set('fiche',await res)
        await console.log("ajoutée")
        await 100;
        this.router.navigateByUrl('/fiche-trajet')
      },(error)=> alert(error)
    );
  }


  //Ajouter vehicule
  vehiculeForm: FormGroup;

  get errorControl() {
    return this.vehiculeForm.controls;
  }

  ajouterVehicule(){
    this.userService.addVehicule(this.user.id_User , this.vehiculeForm.value['climatise'], this.vehiculeForm.value['verifie'] , this.vehiculeForm.value['couleur']  , this.vehiculeForm.value['type'] , this.vehiculeForm.value['mis'] , this.vehiculeForm.value['model'] , this.vehiculeForm.value['marque'] , this.vehiculeForm.value['mat'] ).subscribe(
      async (res)=>{
        console.log("car added success");
        this.user.vehicules[this.user?.vehicules.length] = this.vehiculeForm.value;
        this.storage.set('user' , this.user);
      }
    )
  }

  //Bagage form

  bagageForm : FormGroup;
  
  get errorControl2() {
    return this.vehiculeForm.controls;
  }

  updateCheckBox(id){

    const leger = document.getElementById("leger")
    const moyen = document.getElementById("moyen")
    const lourd = document.getElementById("lourd")

    if(id=="lourd"){
      if(this.bagageForm.value['lourd']!=true){
        this.bagageForm.value['moyen']=true
        moyen?.setAttribute("checked" , "true")
        moyen?.setAttribute("disabled", "true")

        this.bagageForm.value['leger']=true
        leger?.setAttribute("checked" , "true")
        leger?.setAttribute("disabled", "true")

      }else{
        moyen?.setAttribute("disabled", "false")
        this.bagageForm.value['moyen']=true
        this.bagageForm.value['leger']=true
      }
    }

    if(id=="moyen"){
      if(this.bagageForm.value['moyen']==false){
        leger?.setAttribute("checked", "true")
        leger?.setAttribute("disabled", "true")
        this.bagageForm.value['leger']=true
      }
      else 
      {
        this.bagageForm.value['moyen']=true
        leger?.setAttribute("disabled", "false")
      }
    }
  }

  //Mode reservation form

  reservation : FormGroup;
  
  get errorControl3() {
    return this.reservation.controls;
  }



  //Comm form

  comm :FormGroup;

  get errorControl4() {
    return this.comm.controls;
  }
}
