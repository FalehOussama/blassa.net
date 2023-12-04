import { Component, Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-blassa-toast',
  template: ''
})
@Injectable({
  providedIn: 'root'
})
export class BlassaToastComponent {

  constructor(private toastController: ToastController) { }

  async present(msg: string, position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position: position,
    });

    await toast.present();
  }

}
