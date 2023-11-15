import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService } from './services/storage.service';


export let browserRefresh = false;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{

  activeIndex=0; 
  activePageTitle = 'Rechercher';
  Pages = [
    {
      title: 'Rechecher',
      url: '/rechercher-trajets',
      icon: 'search-circle'
    },
    {
      title: 'Publier',
      url: '/nouveau-trajet',
      icon: 'add-circle'
    },
    {
      title: 'Mes trajet',
      url: '/mes-trajets',
      icon: 'compass'
    },
    {
      title: 'Mes reservations',
      url: '/mes-reservations',
      icon: 'compass'
    }
  ];

  
  constructor(
    private router: Router,
    private storage : StorageService
    ) {}
  user:any;
  async ngOnInit() {
    this.storage.get('user').then(
      async data => {
        if(data==undefined || data==null){
          await this.storage.init();
        }
      }
    )
    
  }

  async logout(){
    await this.storage.clear();
    this.router.navigate(['/']);
  }

  
}
