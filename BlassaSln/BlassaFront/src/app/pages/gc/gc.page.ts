import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
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
    private router: Router,
    private storage : StorageService
  ) { }

  async ngOnInit() {
    let user = await this.storage.get('user');

    if (user.uId !=null){
      this.userService.getUserByUid(user.uId).subscribe(
        res =>{
          return this.userback = res;
        }
      );
    }
    else if(user.id!=null){
      this.userService.getUserById(user.id).subscribe(
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

  async onSubmit() {
    this.userback.conditionsGenerales = true;
    this.userService.updateUser(this.userback).subscribe(
      async (res) => {
        await this.storage.set('user', this.userback);
        this.userback = await this.storage.get('user');
        
        this.redirectByUser(this.userback);
      }
    );
  }

  private redirectByUser(user: any) {
    if (user == undefined)
      return;
    if (user?.nouveau)
      this.router.navigate(['/nouveau-compte']);
    else
      this.router.navigate(['/rechercher-trajets']);
  }
}
