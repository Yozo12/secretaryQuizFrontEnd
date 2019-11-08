import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/entities/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  triggerPassAlert: boolean;
  user: User;
  constructor(private userService: UserService, private route: Router) { }

  ngOnInit() {
    this.user=null;
    this.triggerPassAlert = false;

  }
  login(email: string, password: string) {

    this.userService.login(email, password).subscribe((res) => {
      this.user = res;
      this.route.navigate(['test', this.user.id]);
    }, (err) => {
      this.triggerPassAlert = true;
      console.log(err);
    });
  }

}
