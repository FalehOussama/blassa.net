import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { User } from 'src/app/classes/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(
    private fireauth: AngularFireAuth,
    private router: Router,
    private userService: UserService) { 
      this.user = new User();
    }

    user: User;

    email = '';
    password = '';
    error = '';
    username = '';
    image: number;

  ngOnInit() {
  }

  signup() {

    this.fireauth
    .createUserWithEmailAndPassword(this.email, this.password)
      .then(res => {
        if (res.user) {
          console.log(res.user);
          this.user.uid = res.user.uid;
          this.user.email = res.user.email;
          this.userService.save(this.user).subscribe();
        }
      })
      .catch(err => {
        console.log(`login failed ${err}`);
        this.error = err.message;
      });
  }


  toLogin(){
    this.router.navigate(['/login']);
  }

}
