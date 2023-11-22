import { Component, Input } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

enum COLORS {
  GREY = "#E0E0E0",
  GREEN = "#76FF03",
  YELLOW = "#FFCA28",
  RED = "#DD2C00"
}

@Component({
  selector: 'app-avis-modal',
  templateUrl: './avis-modal.component.html',
  styleUrls: ['./avis-modal.component.scss'],
})
export class AvisModalComponent {

  @Input() membre: any;
  @Input() isConduite: boolean;
  ratingAvis: number = 0;
  descAvi: string = '-';
  textesAvi: string[] = ['Très décevant', 'Décevant', 'Correct', 'Bien', 'Excellent'];

  constructor(private navParams: NavParams, private modalController: ModalController) {
    console.log(this.navParams.get('membre'));
  }

  rateAvis(index: number) {
    this.ratingAvis = index;
    this.descAvi = this.textesAvi[index - 1];
  }

  getColorAvis(index: number) {
    if (this.isAboveRatingAvis(index)) {
      return COLORS.GREY;
    }
    switch (this.ratingAvis) {
      case 1:
      case 2:
        return COLORS.RED;
      case 3:
        return COLORS.YELLOW;
      case 4:
      case 5:
        return COLORS.GREEN;
      default:
        return COLORS.GREY;
    }
  }

  isAboveRatingAvis(index: number): boolean {
    return index > this.ratingAvis
  }

  valider() {
    this.modalController.dismiss({ ratingAvis: this.ratingAvis }, 'confirm');
  }

  closeModal() { this.modalController.dismiss(); }

}
