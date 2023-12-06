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
      icon: 'search-circle-outline',
      color: 'primary'
    },
    {
      title: 'Publier',
      url: '/nouveau-trajet',
      icon: 'add-circle-outline',
      color: 'success'
    },
    {
      title: 'Mes trajets',
      url: '/mes-trajets',
      icon: 'compass-outline',
      color: 'tertiary'
    },
    {
      title: 'Mes reservations',
      url: '/mes-reservations',
      icon: 'calendar-outline',
      color: 'warning'
    }
  ];

  PagesQuot = [
    {
      title: 'Rechecher',
      url: '/rechercher-trajets-quot',
      icon: 'search-circle-outline',
      color: 'primary'
    },
    {
      title: 'Publier',
      url: '/nouveau-trajet-quot',
      icon: 'add-circle-outline',
      color: 'success'
    },
    {
      title: 'Mes trajets',
      url: '/mes-trajets-quot',
      icon: 'compass-outline',
      color: 'tertiary'
    },
    {
      title: 'Mes reservations',
      url: '/mes-reservations-quot',
      icon: 'calendar-outline',
      color: 'warning'
    }
  ];

  PagesCompte = [
    {
      title: 'Mes véhicules',
      url: '/mes-vehicules',
      icon: 'car-outline',
      color: 'primary'
    },
    {
      title: 'Mes notes',
      url: '/nouveau-notes',
      icon: 'star-outline',
      color: 'warning'
    },
    {
      title: 'Mes notes de conduite',
      url: '/mes-notes-conduite',
      icon: 'star-outline',
      color: 'tertiary'
    },
    {
      title: 'Commetaires',
      url: '/commetaires',
      icon: 'chatbubbles-outline',
      color: 'primary'
    },
    {
      title: 'Conditions générales',
      url: '/gc',
      icon: 'shield-checkmark-outline', //<ion-icon name="shield-checkmark-outline"></ion-icon>
      color: 'success'
    }
  ];
  
  constructor(
    private router: Router,
    private storage : StorageService
  )
  {
    
  }

  user: any;

  async ngOnInit() {
    
    this.storage.get('user').then(
      async data => {
        if (data == undefined || data == null) {
          await this.storage.init();
          this.storage.get('user').then(
            async dataInit => {
              this.user = await dataInit;
            }
          );
        }
      }
    );  
  }

  ngAfterContentInit() {
    
  }

  async logout(){
    await this.storage.clear();
    this.router.navigate(['/']);
  }
  
}
