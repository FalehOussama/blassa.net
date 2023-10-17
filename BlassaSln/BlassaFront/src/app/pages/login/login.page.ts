
import { Component, NgZone, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

import { FirebaseAuthentication } from '@robingenz/capacitor-firebase-authentication';

import { getAuth, signInAnonymously } from "firebase/auth";

import { preferences , avis } from 'src/app/modules/preferences/preferences.module';
import { userModel } from '../../modules/user/user.module'
import { StorageService } from 'src/app/services/storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit   {

  email = '';
  password = '';
  error = '';
  username = '';
  image: number;
  emailControl = new FormControl('');
  userback : any ;
  uid:any;
  img:any;
  nom:any;
  coords: any;
  method:any;


  constructor(
    private fireauth: AngularFireAuth,
    private router: Router,
    private tokenStorage : TokenStorageService,
    private userService : UserService,
    private storage : StorageService
    
  ) { 

    
  this.storage.get('user').then(
    async data => {
      this.value = await data;
      if(data){
        console.log('to rechercher')
        console.log(this.value)
        this.router.navigate(['/rechercher-trajets']);
      }
      else{
        
        console.log(this.value)
        console.log('to login');
      }
    }
  )

  }

  value:any;
  ngOnInit() {
      
  }
  ionViewDidEnter() {
    GoogleAuth.initialize();
  }


  //Invité
  loginAno() {
    this.signInAnonymously().then(
      (userData) => {
        this.tokenStorage.user = userData;
        this.tokenStorage.method="Invite";
        userModel.nom = "Invité";
        userModel.imgUrl="https://static.vecteezy.com/system/resources/previews/009/507/522/original/blue-avatar-sign-semi-flat-color-icon-customer-profile-anonymous-guest-full-sized-item-on-white-network-simple-cartoon-style-illustration-for-web-graphic-design-and-animation-vector.jpg"
        this.tokenStorage.userback = userModel;
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
      this.tokenStorage.method="Google";
      this.tokenStorage.user = user;
      this.uid = user.id;
      this.img = user.imageUrl;
      this.nom = user.givenName;
      this.method="Google"
      this.getUser(this.tokenStorage.user.id , this.tokenStorage.user.email);
     }
  }


  // Facebook login
  async signInWithF(){
    await FirebaseAuthentication.signInWithFacebook().then(
      (user)=>{
        console.log(user)
        if (user) { 
          this.tokenStorage.method="Facebook";
          this.tokenStorage.user = user;
          this.uid = user.user?.uid;
          this.img = user.user?.photoUrl;
          this.nom = user.user?.displayName;
          this.method="Facebook";
          this.getUser(user.user?.uid , user.user?.email);
         }
      }
    );
    
  }


// Check save user or/and get user from database
  async getUser(uid : any , email : any){
    await this.userService.getUserByUid(this.uid).subscribe(
      async (res) => {
        if(res==null){
          let newUser : any = {};
          newUser.uid = uid;
          newUser.email = email;
          newUser.imgUrl = this.img;
          newUser.avis = avis;
          newUser.nom = this.nom;
          newUser.methode = this.method;
          this.userService.save(newUser).subscribe(
            async (res)=>{
              while(this.tokenStorage.userback == undefined){
                this.tokenStorage.userback = await res;
                await this.storage.set('user', this.tokenStorage.userback);
                console.log(res)
              }              
            }
          );
        }
        else{
          do{
              console.log(res)
              this.tokenStorage.userback = await res;
              this.tokenStorage.userback.imgUrl = this.img;
              await this.storage.set('user', this.tokenStorage.userback);
            }while(this.tokenStorage.userback == undefined)
        }

        if (this.tokenStorage.userback.conditionsGenerales)
          this.router.navigate(['/rechercher-trajets']);
        else
          this.router.navigate(['/gc']);

      }
    );
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
