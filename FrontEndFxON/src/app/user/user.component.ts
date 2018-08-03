import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  fname; lname; code; name;
  constructor() { }

  ngOnInit() {
    var obj = JSON.parse(sessionStorage.getItem('curr_sess'));
    var temp = obj['name'].split(' ');
    this.fname = temp[0];
    this.lname = temp[1];
    this.code = obj['userName'];
    this.name = obj['name']
  }

}
