import { Component, Input, OnInit } from '@angular/core';
import { AviConducteurService } from 'src/app/services/aviConducteur.service';

@Component({
  selector: 'app-avis-cond',
  templateUrl: './avis-cond.component.html',
  styleUrls: ['./avis-cond.component.scss'],
})
export class AvisCondComponent  implements OnInit {

  constructor(private aviConducteurService: AviConducteurService) { }

  @Input() userId?: bigint;
  @Input() sameRow: boolean;
  aviConducteurStat: any;

  ngOnInit() {
    if (this.userId) {
      this.aviConducteurService.getStat(this.userId).subscribe(
        async resAviConducteur => {
          this.aviConducteurStat = resAviConducteur;
        }
      );
    }
  }

}
