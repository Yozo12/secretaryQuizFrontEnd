import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { User } from 'src/app/entities/user';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  idUserSearch: number;
  user: User;

  constructor(private userService: UserService, private routing: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.user = null;
    this.idUserSearch = null;
    this.routing.paramMap.subscribe((params: ParamMap) => {
      this.idUserSearch = parseInt(params.get('id'));

    });
    this.searchUSer(this.idUserSearch);
  }

  searchUSer(id: number) {
    this.userService.getUserById(id).subscribe((res) => {
      this.user = res;
    }, (err) => {
      console.log(err);
    })

  }
}


