import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';
import { preferences } from '../../modules/preferences/preferences.module'
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.page.html',
  styleUrls: ['./preferences.page.scss'],
})
export class PreferencesPage implements OnInit {

  constructor(
    private userService : UserService,
    private navCtrl: NavController,
    private storage : StorageService,
    ) { 
  
      this.storage.get('user').then(
        async data => {
            this.user = await data;
            this.prefs = await data.prefs

            if(this.prefs?.filles==true){
              this.gender= "F"
            }
            else if(this.prefs?.garcons==true){
              this.gender= "H"
            }
            else if(this.prefs?.tous==true){
              this.gender= "T"
            }

            if(this.prefs?.lourd==true){
              this.prefs.moyen=true
              this.prefs.leger=true
              document.getElementById('moyen')?.setAttribute('checked' , 'true')
              document.getElementById('moyen')?.setAttribute('disabled' , 'true')
              document.getElementById('leger')?.setAttribute('checked' , 'true')
              document.getElementById('leger')?.setAttribute('checked' , 'true')
            }

            if(this.prefs?.moyen==true){
              document.getElementById('leger')?.setAttribute('checked' , 'true')
              document.getElementById('leger')?.setAttribute('disabled' , 'true')
              this.prefs.leger=true
            }

          
        }
      ) 
    }


  prefs:any={};
  user:any;

   ionViewWillEnter(){
    this.ngOnInit()
  }
  gender:string;
  async ngOnInit() {

  }


  isAlertOpen = false;
  public alertButtons = ['OK'];

  addSuccess(isOpen : boolean) {
    this.isAlertOpen = true;
  }





  refresh(){

    if(this.gender=="T"){
      this.prefs.tous=true
      this.prefs.filles=false
      this.prefs.garcons=false
    }
    else if(this.gender=="F"){
      this.prefs.tous=false
      this.prefs.filles=true
      this.prefs.garcons=false
    }else if(this.gender=="H")
    {
      this.prefs.tous=false
      this.prefs.filles=false
      this.prefs.garcons=true
    }

    this.user.prefs = this.prefs;
    this.storage.set('user',this.user)
    this.userService.updatePrefs(this.user).subscribe(
      ()=>{
        this.addSuccess(this.isAlertOpen);
        this.navCtrl.back();
        console.log("updated");
      }
    )
  }


  updateCheckBox(id){

    const leger = document.getElementById("leger")
    const moyen = document.getElementById("moyen")
    const lourd = document.getElementById("lourd")

    if(id=="lourd"){
      if(this.prefs.lourd!=true){
        this.prefs.moyen=true
        moyen?.setAttribute("checked" , "true")
        moyen?.setAttribute("disabled", "true")

        this.prefs.leger=true
        leger?.setAttribute("checked" , "true")
        leger?.setAttribute("disabled", "true")

      }else{
        moyen?.setAttribute("disabled", "false")
        this.prefs.moyen=true
        this.prefs.leger=true
      }
    }

    if(id=="moyen"){
      if(this.prefs.moyen==false){
        leger?.setAttribute("checked", "true")
        leger?.setAttribute("disabled", "true")
        this.prefs.leger=true
      }
      else 
      {
        this.prefs.moyen=true
        leger?.setAttribute("disabled", "false")
      }
    }
  }

}
