import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
 
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'gc',
    loadChildren: () => import('./pages/gc/gc.module').then( m => m.GCPageModule)
  },
  {
    path: 'tablinks',
    loadChildren: () => import('./pages/tablinks/tablinks.module').then( m => m.TablinksPageModule)
  },
  {
    path: 'loading-screen/:id/:id2',
    loadChildren: () => import('./pages/loading-screen/loading-screen.module').then( m => m.LoadingScreenPageModule)
  },
  {
    path: 'nouveau-trajet',
    loadChildren: () => import('./pages/nouveau-trajet/nouveau-trajet.module').then( m => m.NouveauTrajetPageModule)
  },
  {
    path: 'nouveau-trajet',
    loadChildren: () => import('./pages/nouveau-trajet/nouveau-trajet.module').then( m => m.NouveauTrajetPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'fiche-trajet',
    loadChildren: () => import('./pages/fiche-trajet/fiche-trajet.module').then( m => m.FicheTrajetPageModule)
  },
  {
    path: 'rechercher-trajets',
    loadChildren: () => import('./pages/rechercher-trajets/rechercher-trajets.module').then( m => m.RechercherTrajetsPageModule)
  },
  {
    path: 'profil',
    loadChildren: () => import('./pages/profil/profil.module').then( m => m.ProfilPageModule)
  },
  {
    path: 'add-car',
    loadChildren: () => import('./pages/add-car/add-car.module').then( m => m.AddCarPageModule)
  },
  {
    path: 'car-info/:i',
    loadChildren: () => import('./pages/car-info/car-info.module').then( m => m.CarInfoPageModule)
  },
  {
    path: 'profil-membre',
    loadChildren: () => import('./pages/profil-membre/profil-membre.module').then( m => m.ProfilMembrePageModule)
  },
  {
    path: 'mes-trajets',
    loadChildren: () => import('./pages/mes-trajets/mes-trajets.module').then( m => m.MesTrajetsPageModule)
  },
  {
    path: 'nouveau-compte',
    loadChildren: () => import('./pages/nouveau-compte/nouveau-compte.module').then( m => m.NouveauComptePageModule)
  },
  {
    path: 'mes-reservations',
    loadChildren: () => import('./pages/mes-reservations/mes-reservations.module').then( m => m.MesReservationsPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
