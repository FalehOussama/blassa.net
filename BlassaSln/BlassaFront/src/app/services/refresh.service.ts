import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { TokenStorageService } from './token-storage.service';
import { AnnonceService } from './annonce.service';
import { AnnonceStorageService } from './annonce-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RefreshService {

  constructor(
    private userService : UserService,
    private token : TokenStorageService,
    private annonceService : AnnonceService,
    private anstrg:AnnonceStorageService,
  ) { }

  public refreshUser() {
    if(this.token.method=="Facebook"){
      this.userService.getUserByUid(this.token.user.user.uid).subscribe(
        (res)=>{
          do{
            this.token.userback = res
          }while(res==undefined)
        }
      )
    }
    else if(this.token.method == "Google"){
      this.userService.getUserByUid(this.token.user.uid).subscribe(
        (res)=>{
          do{
            this.token.userback = res
          }while(res==undefined)
        }
      )
    }
    
  }

  // public refreshAnnonces(){
  //   this.annonceService.rechercher(this.anstrg.recherche[0] , this.anstrg.recherche[1],this.anstrg.recherche[2],this.anstrg.recherche[4] ,this.anstrg.recherche[3],this.anstrg.recherche[5]).subscribe(
  //     async data=>
  //     {
  //       localStorage.setItem('annonces' ,  JSON.stringify(data))

  //       while(this.anstrg.annonces == undefined){
  //         this.anstrg.annonces= await data;
  //       }
  //     }
  //   )
  // }
}
