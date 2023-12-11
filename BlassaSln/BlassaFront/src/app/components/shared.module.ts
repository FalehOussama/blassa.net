import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { InputComponent } from './input/input.component';
import { ButtonComponent } from './button/button.component';
import { IconButtonComponent } from './icon-button/icon-button.component';
import { IconButton2Component } from './icon-button2/icon-button2.component';
import { AnnonceItemComponent } from './annonce-item/annonce-item.component';
import { InfoConducteurComponent } from './ficheTrajet/info-conducteur/info-conducteur.component';
import { InfoTrajetComponent } from './ficheTrajet/info-trajet/info-trajet.component';
import { InfoReservationsComponent } from './ficheTrajet/info-reservations/info-reservations.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { CreerAnnonceStepsComponent } from './creerAnnonce/creer-annonce-steps/creer-annonce-steps.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MenuComponent } from './menu/menu.component';
import { CarCardComponent } from './car-card/car-card.component';
import { InviteComponent } from './invite/invite.component';
import { RouterModule } from '@angular/router';
import { AvisComponent } from './avis/avis.component';
import { AvisCondComponent } from './avis-cond/avis-cond.component';
import { AvisModalComponent } from './avis-modal/avis-modal.component';
import { BlassaAlertComponent } from './blassa-alert/blassa-alert.component';
import { BlassaToastComponent } from './blassa-toast/blassa-toast.component';
import { CommentaireItemComponent } from './commentaire-item/commentaire-item.component';

@NgModule({
  declarations: [
    CommentaireItemComponent,
    BlassaToastComponent,
    BlassaAlertComponent,
    AvisModalComponent,
    InviteComponent,
    AvisComponent,
    AvisCondComponent,
    CarCardComponent,
    MenuComponent,
    InputComponent,
    ButtonComponent,
    IconButtonComponent,
    IconButton2Component,
    AnnonceItemComponent,
    InfoConducteurComponent,
    InfoTrajetComponent,
    InfoReservationsComponent,
    CreerAnnonceStepsComponent],
  imports: [CommonModule, IonicModule , FontAwesomeModule , NgxPaginationModule , RouterModule],
  providers :[CallNumber],
  exports: [
    CommentaireItemComponent,
    BlassaToastComponent,
    BlassaAlertComponent,
    AvisModalComponent,
    InviteComponent,
    AvisComponent,
    AvisCondComponent,
    CarCardComponent,
    MenuComponent,
    InputComponent,
    ButtonComponent,
    IconButtonComponent,
    IconButton2Component,
    AnnonceItemComponent,
    InfoConducteurComponent,
    InfoTrajetComponent,
    InfoReservationsComponent,
    CreerAnnonceStepsComponent],
})
export class SharedModule {}
