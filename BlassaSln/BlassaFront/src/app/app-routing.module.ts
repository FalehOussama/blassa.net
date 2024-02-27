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
    path: 'gc',
    loadChildren: () => import('./pages/gc/gc.module').then( m => m.GCPageModule)
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
    path: 'fiche-trajet/:id',
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
  },  {
    path: 'mes-vehicules',
    loadChildren: () => import('./pages/mes-vehicules/mes-vehicules.module').then( m => m.MesVehiculesPageModule)
  },
  {
    path: 'mes-vehicules-fiche',
    loadChildren: () => import('./pages/mes-vehicules-fiche/mes-vehicules-fiche.module').then( m => m.MesVehiculesFichePageModule)
  },
  {
    path: 'mes-notes',
    loadChildren: () => import('./pages/mes-notes/mes-notes.module').then( m => m.MesNotesPageModule)
  },
  {
    path: 'mes-notes-conduite',
    loadChildren: () => import('./pages/mes-notes-conduite/mes-notes-conduite.module').then( m => m.MesNotesConduitePageModule)
  },
  {
    path: 'commentaires',
    loadChildren: () => import('./pages/commentaires/commentaires.module').then( m => m.CommentairesPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
