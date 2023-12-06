
import { Component, NgZone, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

import { FirebaseAuthentication } from '@robingenz/capacitor-firebase-authentication';

import { getAuth, signInAnonymously } from "firebase/auth";

import { preferences , avis } from 'src/app/modules/preferences/preferences.module';
import { userModel } from '../../modules/user/user.module'
import { StorageService } from 'src/app/services/storage.service';
import { MenuController } from '@ionic/angular';


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


  constructor(
    private fireauth: AngularFireAuth,
    private router: Router,
    private userService: UserService,
    public menuCtrl: MenuController,
    private storage : StorageService
    
  ) { 

    
    this.storage.get('user').then(
      async data => {
        this.value = await data;
        this.redirectByUser(this.value);
      }
    )
  }

  
  ngOnInit() {
      
  }
  ionViewDidEnter() {
    GoogleAuth.initialize();
    this.menuCtrl.enable(false);
  }


  //Invité
  loginAno() {
    this.signInAnonymously().then(
      (userData) => {
        //this.tokenStorage.user = userData;
        //this.tokenStorage.method="Invite";
        userModel.nom = "Invité";
        userModel.imgUrl="https://static.vecteezy.com/system/resources/previews/009/507/522/original/blue-avatar-sign-semi-flat-color-icon-customer-profile-anonymous-guest-full-sized-item-on-white-network-simple-cartoon-style-illustration-for-web-graphic-design-and-animation-vector.jpg"
        /*this.tokenStorage.userback = userModel;*/
        this.router.navigate(['/rechercher-trajets']); 
      }
    ).catch(err => {
      if (err) {
        console.log(err)
      }

    })
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
    const user = await GoogleAuth.signIn();
    if (user) { 
      this.uid = user.id;
      this.email = user.email;
      this.img = user.imageUrl;
      this.prenom = user.givenName;
      this.nom = user.familyName;
      this.method = "Google";

      //temp
      this.uid = "uId2";
      this.email = "user2@gmail.com";
      this.img = "../../assets/images/profil.png";
      this.prenom = "PUser2";
      this.nom = "User2";
      this.method = "Google";

      this.getUser(this.uid, this.email);
     }
  }


  // Facebook login
  async signInWithF(){
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
    );
    
  }


// Check save user or/and get user from database
  async getUser(uid : any , email : any){
    await this.userService.getUserByUid(this.uid).subscribe(
      async (res) => {
        let user = await this.storage.get('user');
        if(res==null){
          let newUser : any = {};
          newUser.uid = uid;
          newUser.email = email;
          newUser.imgUrl = this.img;
          newUser.avis = avis;
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
