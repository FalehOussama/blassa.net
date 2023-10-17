import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnnonceStorageService } from 'src/app/services/annonce-storage.service';
import { AnnonceService } from 'src/app/services/annonce.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.page.html',
  styleUrls: ['./loading-screen.page.scss'],
})
export class LoadingScreenPage implements OnInit , OnDestroy{

  constructor(
    private userService : UserService,
    private tokenStorage : TokenStorageService,
    private router : Router,
    private route : ActivatedRoute,
    private annonceService : AnnonceService,
    private storedAnnonce : AnnonceStorageService,
  ) { }


  ngOnDestroy(): void {
    this.methodId=0;
  }


  uid:any;
  methodId : any;
  annonceId : any;


   ngOnInit() {

    this.methodId = this.route.snapshot.paramMap.get('id2');

    if(this.methodId == 1){
      console.log(this.methodId);
      this.uid = this.route.snapshot.paramMap.get('id');
      this.userService.getUserByUid(this.uid).subscribe(
        res=>{
          console.log(res);
          this.tokenStorage.userback = res;
          if(res.conditionsGenerales==true){this.router.navigate(['/rechercher-trajets']);}
          else{this.router.navigate(['/gc']);}
        }
      );
      this.methodId = this.route.snapshot.paramMap.get('0');
    
    }
    else if(this.methodId == 2){
      console.log(this.methodId);
      this.annonceId = this.route.snapshot.paramMap.get('id');
      this.annonceService.getAnnonceById(this.annonceId).subscribe(data => {
        this.storedAnnonce.annonce= data;
        this.router.navigate(['/tablinks/fiche-trajet']);
      });
    }
    // else if(this.methodId == 0){
    //   this.router.navigate(['/rechercher-trajets']);
    // }

    // this.router.navigate(['/rechercher-trajets']);

    
  }



}
