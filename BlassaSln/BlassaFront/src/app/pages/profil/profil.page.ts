import { Component, OnDestroy, OnInit, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { StorageService } from 'src/app/services/storage.service';
import { MaskitoElementPredicateAsync, MaskitoOptions } from '@maskito/core';
import { AvisComponent } from '../../components/avis/avis.component';
import { AvisCondComponent } from '../../components/avis-cond/avis-cond.component';
import { BlassaAlertComponent } from '../../components/blassa-alert/blassa-alert.component';
import { Base64 } from 'js-base64';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit  {

  readonly phoneMask: MaskitoOptions = {
    mask: [/\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/],
  };

  readonly maskPredicate: MaskitoElementPredicateAsync = async (el) => (el as HTMLIonInputElement).getInputElement();

  @ViewChild(AvisComponent) compAvis: AvisComponent;
  @ViewChild(AvisCondComponent) compAvisCond: AvisCondComponent;

  constructor(
    private userService: UserService,
    private router : Router,
    private storage: StorageService,
    private blassaAlert: BlassaAlertComponent
  ) { 

    this.storage.get('user').then(
      async (data) => {
        let userStorage = await data;

        this.compAvis.userId = userStorage.id;
        this.compAvis.ngOnInit();

        this.compAvisCond.userId = userStorage.id;
        this.compAvisCond.ngOnInit();

        this.userService.getUserById(userStorage.id).subscribe(
          async (res) => {
            this.user = await res;
            this.userLoaded();
          }
        );
      }
    );    
  }

  async userLoaded() {
    await this.storage.set('user', this.user);
    this.user.preferences.voyageAvec = this.user.preferences.voyageAvec.toString();
    this.filePermisConduireProces();
    this.fileCinProces();
    this.filePasseportProces();
  }

  user: any = {
    nom: '',
    prenom: '',
    sexe: '',
    email: '',
    tel1: '',
    dateNaissance: new Date(),
    description: '',
    preferences: {
      passager: false,
      tel: false,
      whatsApp: false,
      messenger: false,
      instantane: false,
      voyageAvec: "0",
      leger: false,
      moyen: false,
      lourd: false,
      max2: false,
      cigarette: false,
      animaux: false,
      verifies: false
    },
    vehicules: []
  };
  aviStat: any;
  aviConducteurStat: any;

  async ionViewWillEnter() { }

  async ngOnInit() {  }

  async enregistrer() {
    await this.blassaAlert.confirm('Confirmer profil', 'Veuillez confirmer l\'enregistrement des changements apportées sur votre profil.', this.enregistrerConfim.bind(this));
  }

  async enregistrerConfim() {
    let prefs = this.user.preferences;
    this.user.preferences.voyageAvec = parseInt(this.user.preferences.voyageAvec);
    this.userService.updateUser(this.user).subscribe(
      async (resPut) => {
        this.userService.getUserById(this.user.id).subscribe(
          async (res) => {
            this.user = await res;
            this.userLoaded();
          }
        );
      },
      async (err) => {
        console.log(err);
        await this.blassaAlert.alert('Erreur enregistrement profil', err.error);
      }
    );
  }

  onFilePermisConduireChange(fileChangeEvent) {
    let file = fileChangeEvent.target.files[0];
    this.readFile(file, this.onFilePermisConduireLoaded);
  }

  onFilePermisConduireLoaded(fileBtoa: string) {
    this.user.filePermisConduire = fileBtoa;
  }

  onFileCinChange(fileChangeEvent) {
    let file = fileChangeEvent.target.files[0];
    this.readFile(file, this.onFileCinLoaded);
  }

  onFileCinLoaded(fileBtoa: string) {
    this.user.fileCin = fileBtoa;
  }

  onFilePasseportChange(fileChangeEvent) {
    let file = fileChangeEvent.target.files[0];
    this.readFile(file, this.onFilePasseportLoaded);
  }

  onFilePasseportLoaded(fileBtoa: string) {
    this.user.filePasseport = fileBtoa;
  }

  /*****************************************/

  public filePermisConduireObj: any;
  filePermisConduireProces() {
    this.filePermisConduireObj = null;
    if (!this.user.filePermisConduire)
      return;

    this.writeFile(this.user.filePermisConduire, this.onWFilePermisConduireLoaded);
  }

  onWFilePermisConduireLoaded(hRef: string, ext: string) {
    this.filePermisConduireObj = { href: hRef, ext: ext };;
  }

  deletePermisConduire() {
    this.filePermisConduireObj = null;
    this.user.filePermisConduire = null;
    this.blassaAlert.alert('Suppression Permis de conduire', 'Veuillez enregistrer pour que la suppression soit effective.');
  }

  /*****************************************/

  public fileCinObj: any;
  fileCinProces() {
    this.fileCinObj = null;
    if (!this.user.fileCin)
      return;

    this.writeFile(this.user.fileCin, this.onWFileCinLoaded);
  }

  onWFileCinLoaded(hRef: string, ext: string) {
    this.fileCinObj = { href: hRef, ext: ext };;
  }

  deleteCin() {
    this.fileCinObj = null;
    this.user.fileCin = null;
    this.blassaAlert.alert('Suppression Carte d\identité nationale', 'Veuillez enregistrer pour que la suppression soit effective.');
  }

  /*****************************************/

  public filePasseportObj: any;
  filePasseportProces() {
    this.filePasseportObj = null;
    if (!this.user.filePasseport)
      return;
      
    this.writeFile(this.user.filePasseport, this.onWFilePasseportLoaded);
  }

  onWFilePasseportLoaded(hRef: string, ext: string) {
    this.filePasseportObj = { href: hRef, ext: ext };;
  }

  deletePasseport() {
    this.filePasseportObj = null;
    this.user.filePasseport = null;
    this.blassaAlert.alert('Suppression passeport', 'Veuillez enregistrer pour que la suppression soit effective.');
  }

  /*****************************************/

  readFile(file, onLoad: (fileBtoa: string) => void) {
    const boundOnLoad = onLoad.bind(this);
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onload = function () {
      let arrayBuffer = <ArrayBuffer>reader.result;
      let uint8Array = new Uint8Array(arrayBuffer);

      let b64encoded = Base64.fromUint8Array(uint8Array);
      boundOnLoad(b64encoded);
    };

    reader.onerror = function () {
      console.log(reader.error);
    };

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
