import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/entities/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  register: boolean;
  home: boolean;
  triggerNameAlert: boolean;
  triggerSurnameAlert: boolean;
  triggerEmailAlert: boolean;
  triggerPassAlert: boolean;
  triggerRepeatPassAlert: boolean;
  triggerCheck: boolean;
  triggerSuccess: boolean;
  user: User;
  triggerFormatEmail: boolean;
  triggerSearchEmail: boolean;
  progress: boolean;
  buttonOk: boolean;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.buttonOk = true;
    this.progress = false;
    this.triggerFormatEmail = false;
    this.triggerSuccess = false;
    this.user = null;
    this.triggerSearchEmail = false;
    this.triggerRepeatPassAlert = false;
    this.register = false;
    this.home = true;
    this.triggerNameAlert = false;
    this.triggerEmailAlert = false;
    this.triggerPassAlert = false;
    this.triggerSurnameAlert = false;
    this.triggerCheck = false;

  }
  registerOk() {
    this.register = true;
    this.home = false;
  }
  checkNewUser(name: string, surname: string, email: string, password: any, repeatPass: any, check: any, id: number) {
    this.checkEmail(email);
    this.checkName(name);
    this.checkSurname(surname);
    this.checkPAss(password);
    this.checkCheck(check);

    if (password === repeatPass && name != undefined && surname != undefined && email != undefined
      && password != undefined
      && check != false && check != undefined) {
      this.validateEmail(email);
      this.progress = true;

      if (this.triggerFormatEmail === false) {
        setTimeout(() => {
          this.saveUser(name, surname, email, password, id);
        }, 3000);


      }

    }

    if (password != repeatPass) {
      this.triggerRepeatPassAlert = true;
    }
  }

  saveUser(name: string, surname: string, email: any, password: any, id: number) {
    let user = new User(id, name, surname, email, password);
    this.userService.saveUser(user).subscribe((res) => {
      this.user = res.body as User;
      setTimeout(() => { this.triggerSuccess = true; }, 1500);
      this.progress = false;
      this.buttonOk = false;
      this.triggerCheck = false;
      this.triggerNameAlert = false;
      this.triggerPassAlert = false;
      this.triggerSurnameAlert = false;
      this.triggerEmailAlert = false;

      setTimeout(() => {
        location.reload();
      }, 5000);

    }, (err) => {
      this.triggerSearchEmail = true;
    });

  }
  checkName(name: string) {
    if (name === undefined || name === "") {
      this.triggerNameAlert = true;
    }
  }
  checkSurname(surname: string) {
    if (surname === undefined || surname === "") {
      this.triggerSurnameAlert = true;
    }
  }
  checkEmail(email: any) {
    if (email === undefined || email === "") {
      this.triggerEmailAlert = true;
    }
  }
  checkPAss(pass: any) {
    if (pass === undefined || pass === "") {
      this.triggerPassAlert = true;
    }
  }
  checkCheck(check: any) {
    if (check === undefined || check === false) {
      this.triggerCheck = true;
    }
  }
  onSelectedFile(event: any) {
    //  this.file = event.target.files[0];

  }
  validateEmail(email: string) {
    if (email.includes("@") && email.includes(".")) {
      this.triggerFormatEmail = false;
    }
    else this.triggerFormatEmail = true;
  }
}
