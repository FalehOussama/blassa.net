import { Component, Input, OnInit } from '@angular/core';
import { AviService } from 'src/app/services/avi.service';

@Component({
  selector: 'app-avis',
  templateUrl: './avis.component.html',
  styleUrls: ['./avis.component.scss'],
})
export class AvisComponent  implements OnInit {

  constructor(private aviService: AviService) {

  }

  @Input() userId?: bigint;
  @Input() sameRow: boolean;
  aviStat: any;

  ngOnInit() {
    if (this.userId) {
      this.aviService.getStat(this.userId).subscribe(
        async resAvi => {
          this.aviStat = resAvi;
        }
      );
    }    
  }

}
