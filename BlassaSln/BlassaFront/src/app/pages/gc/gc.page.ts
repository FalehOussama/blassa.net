import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';
import { browserRefresh } from '../../app.component';



@Component({
  selector: 'app-gc',
  templateUrl: './gc.page.html',
  styleUrls: ['./gc.page.scss'],
})
export class GCPage implements OnInit {

  checkbox:boolean=false;
  userback : any ;
  public browserRefresh: boolean;
  constructor(
    private userService : UserService,
    private token : TokenStorageService,
    private router: Router,
    private storage : StorageService
  ) { }

  async ngOnInit() {
    const userStr = await this.storage.get('user');
    let user = this.token.user;

    if(user.uid!=null){
      this.userService.getUserByUid(user.uid).subscribe(
        res =>{
          return this.userback = res;
        }
      );
    }
    else if(user.id!=null){
      this.userService.getUserByUid(user.id).subscribe(
        res =>{
          return this.userback = res;
        }
      );
    }
    else{
      this.userService.getUserByUid(user.user.uid).subscribe(
        res =>{
          return this.userback = res;
        }
      );
    }
  }

  onCheck(){
    this.checkbox = !this.checkbox;
    console.log(this.checkbox);
  }

  async onSubmit(){
   await this.userService.conditionsGenerales(this.userback.id_User).subscribe(
    res => this.token.userback.conditionsGenerales=true
   );
   await this.storage.set('user' , this.userback)
    this.router.navigate(['/nouveau-compte']);

  }

}
