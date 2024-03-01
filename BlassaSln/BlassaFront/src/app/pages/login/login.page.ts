import { Component, NgZone, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

import { GoogleAuth, InitOptions } from '@codetrix-studio/capacitor-google-auth';

import { FirebaseAuthentication } from '@capacitor-firebase/authentication';

import { FacebookAuthProvider, getAuth, signInAnonymously } from "firebase/auth";

import { StorageService } from 'src/app/services/storage.service';
import { MenuController, LoadingController } from '@ionic/angular';
import { BlassaAlertComponent } from '../../components/blassa-alert/blassa-alert.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit   {

  email : any;
  password = '';
  error = '';
  username = '';
  image: number;
  emailControl = new FormControl('');
  userback : any ;
  uid:any;
  img:any;
  nom: any;
  prenom: any;
  coords: any;
  method: any;
  tel1: any;
  value: any;
  loading: any;


  constructor(
    private fireauth: AngularFireAuth,
    private router: Router,
    private userService: UserService,
    public menuCtrl: MenuController,
    private loadingCtrl: LoadingController,
    private storage: StorageService,
    private blassaAlert: BlassaAlertComponent
    
  ) { 
        
    this.storage.get('user').then(
      async data => {
        this.value = await data;
        //this.redirectByUser(this.value);
      }
    )
  }

  
  ngOnInit() {
      
  }
  ionViewDidEnter() {
    let gOptions: InitOptions = {
      clientId: '361433567189-j7u13f9q53m2mnn0tcu0mgeunpgr85gs.apps.googleusercontent.com',
      grantOfflineAccess: false
    };
    GoogleAuth.initialize(gOptions);
    this.menuCtrl.enable(false);
  }


  //Invité
  loginAno() {
    //this.signInAnonymously().then(
    //  (userData) => {
    //    //this.tokenStorage.user = userData;
    //    //this.tokenStorage.method="Invite";
    //    userModel.nom = "Invité";
    //    userModel.imgUrl = "../../assets/images/profil.png";
    //    /*this.tokenStorage.userback = userModel;*/
    //    this.router.navigate(['/rechercher-trajets']);
    //  }
    //).catch(err => {
    //  if (err) {
    //    console.log(err)
    //  }
    //});
  }
  private signInAnonymously() {
    return new Promise<any>((resolve, reject) => {
      this.fireauth.signInAnonymously().then((data) => {
        resolve(data);

      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        reject(`login failed ${error.message}`);
        // ...
      });
    });
  }



  //

  //google login
  async doLogin() {
    this.loading = await this.loadingCtrl.create({
      message: 'Authentification Google...',
      cssClass: 'custom-loading',
      mode: 'ios'
    });
    this.loading.present();

    try {
      const user = await GoogleAuth.signIn();
      if (user) {
        this.uid = user.id;
        this.email = user.email;
        this.img = user.imageUrl;
        this.prenom = user.givenName;
        this.nom = user.familyName;
        this.method = "Google";

        //temp
        //this.uid = "uId29";
        //this.email = "user29@gmail.com";
        //this.img = "../../assets/images/profil.png";
        //this.prenom = "PUser29";
        //this.nom = "User29";
        //this.method = "Google";

        this.getUser(this.uid, this.email);
      }
      else {
        this.loading.dismiss();
        this.blassaAlert.alert("Erreur connexion Google", "User non défini");
      }
    }
    catch (error) {
      this.loading.dismiss();
      let errorMessage = '';
      // Handle Errors.
      if (typeof error === "string") {
        errorMessage = error.toString();
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      this.blassaAlert.alert("Erreur connexion Google", errorMessage);
    }
    
  }


  // Facebook login
  async signInWithF() {
    this.loading = await this.loadingCtrl.create({
      message: 'Authentification Facebook...',
      cssClass: 'custom-loading',
      mode: 'ios'
    });
    this.loading.present();

    await FirebaseAuthentication.signInWithFacebook().then(
      (user)=>{
        console.log(user)
        if (user) { 
          this.uid = user.user?.uid;
          this.img = user.user?.photoUrl;
          //this.nom = user.user?.displayName;
          this.prenom = user.user?.displayName;
          this.email = user.user?.email;
          this.tel1 = user.user?.phoneNumber;
          this.method="Facebook";
          this.getUser(this.uid, this.email);
         }
      }
    ).catch((error) => {
      this.loading.dismiss();
      // Handle Errors.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // AuthCredential type that was used.
      const credential = FacebookAuthProvider.credentialFromError(error);
      this.blassaAlert.alert("Erreur connexion Google", errorCode + ": " + errorMessage);
    });
    
  }


// Check save user or/and get user from database
  async getUser(uid: any, email: any) {
    this.loading.dismiss();
    this.loading = await this.loadingCtrl.create({
      message: 'Chargement en cours...',
      cssClass: 'custom-loading',
      mode: 'ios'
    });
    this.loading.present();

    await this.userService.getUserByUid(this.uid).subscribe(
      async (res) => {
        let user = await this.storage.get('user');
        if(res==null){
          let newUser : any = {};
          newUser.uid = uid;
          newUser.email = email;
          newUser.imgUrl = this.img;
          newUser.nom = this.nom;
          newUser.prenom = this.prenom;
          newUser.tel1 = this.tel1;
          newUser.methode = this.method;
          this.userService.save(newUser).subscribe(
            async (res)=>{
              while (user == undefined){
                await this.storage.set('user', await res);
                user = await this.storage.get('user');
              }
              console.log(res);
              this.redirectByUser(user);            
            }
          );
        }
        else{
          do{
              console.log(res)
            let userback = await res;
            let userBackChanged = (userback.imgUrl != this.img) ||
              (userback.email != this.email) ||
              (userback.nom != this.nom) ||
              (userback.prenom != this.prenom) ||
              (!userback.tel1 && userback.tel1 != this.tel1);
            if (userBackChanged) {
              userback.email = this.email;
              userback.imgUrl = this.img;
              userback.nom = this.nom;
              userback.prenom = this.prenom;
              if (!userback.tel1)
                userback.tel1 = this.tel1;
              this.userService.updateUser(userback).subscribe(
                async (res) => {
                  await this.storage.set('user', userback);
                  user = await this.storage.get('user');
                  console.log(user);
                  this.redirectByUser(user);
                }
              );
            }
            else {
              await this.storage.set('user', await res);
              user = await this.storage.get('user');
              this.redirectByUser(user);
            }
              
          } while (user == undefined)
        }

      }
    );
  }

  private redirectByUser(user: any) {
    this.loading.dismiss();
    if (user == undefined)
      return;
    if (user?.conditionsGenerales) {
      if (user?.nouveau)
        this.router.navigate(['/nouveau-compte']);
      else {
        this.menuCtrl.enable(true);
        this.router.navigate(['/rechercher-trajets']);
      }        
    }      
    else
      this.router.navigate(['/gc']);
  }
  

    toRegister(){
      this.router.navigate(['/register']);
    }

    toCG(){
      this.router.navigate(['/CG']);
    }



      //  ************PASSWORD-EMAIL-LOGIN**************

  //  async login() {
  //    await this.fireauth.signInWithEmailAndPassword(this.email, this.password)
  //     .then( res => {
  //       if (res.user) {
  //         this.tokenStorage.user = res.user;
  //         console.log(this.tokenStorage.user);
  //         this.uid = res.user.uid;
  //       }
  //     })
  //     .catch(err => {
  //       console.log(`login failed ${err}`);
  //       alert(err);
  //       this.error = err.message;
  //     });

  //     this.getUser(this.tokenStorage.user.uid , null);
 
  // } 

    //  ************PASSWORD-EMAIL-LOGIN**************


}
