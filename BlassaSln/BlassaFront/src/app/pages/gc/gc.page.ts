import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';
import { browserRefresh } from '../../app.component';
import { MenuController } from '@ionic/angular';



@Component({
  selector: 'app-gc',
  templateUrl: './gc.page.html',
  styleUrls: ['./gc.page.scss'],
})
export class GCPage implements OnInit {

  checkbox:boolean=false;
  user : any ;
  userback : any ;
  public browserRefresh: boolean;

  constructor(
    private userService : UserService,
    private router: Router,
    public menuCtrl: MenuController,
    private storage : StorageService
  ) { }


  async ionViewWillEnter(){
    this.menuCtrl.enable(false);
    await this.storage.get('user').then(
      async data => this.user = await data
    )
    console.log(this.user);
  }

  async ngOnInit() {
    if (this.user?.uId !=null){
      this.userService.getUserByUid(this.user?.uId).subscribe(
        async res =>{
          return this.user = await res;
        }
      );
    }
  }

  onCheck(){
    this.checkbox = !this.checkbox;
    console.log(this.checkbox);
  }

  async onSubmit() {
    this.user.conditionsGenerales = true;
    this.userService.updateUser(this.user).subscribe(
      async (res) => {
        await this.storage.set('user', this.user);
        this.user = await this.storage.get('user');
        
        this.redirectByUser(this.user);
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