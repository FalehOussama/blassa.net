import { Component, Input, NgZone, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AnnonceService } from 'src/app/services/annonce.service';
import { IonModal, LoadingController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@capacitor/geolocation';
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
      this.trajetAnnonceCriteresDto.superDriver = this.filtreForm.value.superDriver;
      this.trajetAnnonceCriteresDto.profilVerifie = this.filtreForm.value.profilVerifie;
      this.trajetAnnonceCriteresDto.max2Arriere = this.filtreForm.value.max2Arriere;
      this.trajetAnnonceCriteresDto.reservationInst = this.filtreForm.value.reservationInst;
      this.trajetAnnonceCriteresDto.bLeger = this.filtreForm.value.bLeger;
      this.trajetAnnonceCriteresDto.bMoyen = this.filtreForm.value.bMoyen;
      this.trajetAnnonceCriteresDto.bLourd = this.filtreForm.value.bLourd;
      this.trajetAnnonceCriteresDto.climatisation = this.filtreForm.value.climatisation;
      this.trajetAnnonceCriteresDto.cigaretteAutorisee = this.filtreForm.value.cigaretteAutorisee;
      this.trajetAnnonceCriteresDto.animauxAutorises = this.filtreForm.value.animauxAutorises;
      let voyageAvecStr: string = this.filtreForm.value.voyageAvec;
      if (voyageAvecStr == '99')
        this.trajetAnnonceCriteresDto.voyageAvec = undefined;
      else
        this.trajetAnnonceCriteresDto.voyageAvec = +voyageAvecStr;
    }
    else {
      this.trajetAnnonceCriteresDto.heureDepart = HeureDepartCritereTypeDto.TOUS;
      this.trajetAnnonceCriteresDto.superDriver = false;
      this.trajetAnnonceCriteresDto.profilVerifie = false;
      this.trajetAnnonceCriteresDto.max2Arriere = false;
      this.trajetAnnonceCriteresDto.reservationInst = false;
      this.trajetAnnonceCriteresDto.bLeger = false;
      this.trajetAnnonceCriteresDto.bMoyen = false;
      this.trajetAnnonceCriteresDto.bLourd = false;
      this.trajetAnnonceCriteresDto.climatisation = false;
      this.trajetAnnonceCriteresDto.cigaretteAutorisee = false;
      this.trajetAnnonceCriteresDto.animauxAutorises = false;
      this.trajetAnnonceCriteresDto.voyageAvec = undefined;
    }

    this.filtreForm.patchValue({
      tri: this.tri.toString(),
      heureDepart: this.trajetAnnonceCriteresDto.heureDepart.toString(),
      superDriver: this.trajetAnnonceCriteresDto.superDriver,
      profilVerifie: this.trajetAnnonceCriteresDto.profilVerifie,
      max2Arriere: this.trajetAnnonceCriteresDto.max2Arriere,
      reservationInst: this.trajetAnnonceCriteresDto.reservationInst,
      bLeger: this.trajetAnnonceCriteresDto.bLeger,
      bMoyen: this.trajetAnnonceCriteresDto.bMoyen,
      bLourd: this.trajetAnnonceCriteresDto.bLourd,
      climatisation: this.trajetAnnonceCriteresDto.climatisation,
      cigaretteAutorisee: this.trajetAnnonceCriteresDto.cigaretteAutorisee,
      animauxAutorises: this.trajetAnnonceCriteresDto.animauxAutorises,
      voyageAvec: this.trajetAnnonceCriteresDto.voyageAvec != undefined ? this.trajetAnnonceCriteresDto.voyageAvec.toString() : '99'
    });

    this.currentPage = 1;
    this.loadAnnonces();
  }

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
      heureDepart: ["0"],
      superDriver: [false],
      profilVerifie: [false],
      max2Arriere: [false],
      reservationInst: [false],
      bLeger: [false],
      bMoyen: [false],
      bLourd: [false],
      climatisation: [false],
      cigaretteAutorisee: [false],
      animauxAutorises: [false],
      voyageAvec: ["99"]
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
  filtreForm: FormGroup;
  trajetAnnonceCriteresDto: TrajetAnnonceCriteresDto;
  trajetsAnnoncesRechercheRetourDto: TrajetsAnnoncesRechercheRetourDto;
  //pagination
  public count = 0;
  public itemsPerPage = 10;
  public currentPage = 1;
  public tri = TrajetAnnonceTriTypeDto.DEPART_PLUS_TOT;

  async ionViewWillEnter(){    
    this.ngOnInit();
  }

  async ngOnInit() {
    this.setCurrentPosition();  
     // setInterval(this.refresh.refreshAnnonces , 10000);
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

  afficherFiche(id) {
    this.storage.set('idTrajetAnnonce', id);
    this.router.navigate(['/fiche-trajet']);
  }

  //pagination
  public onChange(event): void {
    console.dir(event);
    this.currentPage = event;
    this.loadAnnonces();
  }

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
