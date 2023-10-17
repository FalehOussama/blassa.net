import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';


@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss'],
})
export class InviteComponent  implements OnInit {

  constructor(
    private token : TokenStorageService
  ) { }

  invite :boolean;
  public alertButtons = ['OK'];

  ngOnInit() {
    this.checkInvite();
  }

   checkInvite(){
    if(this.token.method =="Invite"){
      this.invite = true;
    }
    return this.invite;
  }

}
