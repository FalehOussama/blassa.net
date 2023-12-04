import { Component, Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-blassa-alert',
  template: ''
})

@Injectable({
  providedIn: 'root'
})
export class BlassaAlertComponent {

  constructor(private alertController: AlertController) { }
  
  async alert(subHeader: string, msg: string) {
    await this.alertDismiss(subHeader, msg, () => { });
  }

  async alertDismiss(subHeader: string, msg: string, _onDidDismiss: (data: any) => void) {
    const alert = await this.alertController.create({
      header: 'Blassa message',
      subHeader: subHeader,
      message: msg,
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'Ok',
          cssClass: 'alert-button-ok'
        }]
    });

    alert.onDidDismiss().then(_onDidDismiss);

    await alert.present();
  }

  async confirm(subHeader: string, msg: string, onConfirm: () => void) {
    const alert = await this.alertController.create({
      header: 'Blassa message',
      subHeader: subHeader,
      message: msg,
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'Annuler',
          cssClass: 'alert-button-cancel'
        },
        {
          text: 'Confirmer',
          cssClass: 'alert-button-confirm',
          handler: () => {
            onConfirm();
          },
        }
      ],
    });

    await alert.present();
  }

}
