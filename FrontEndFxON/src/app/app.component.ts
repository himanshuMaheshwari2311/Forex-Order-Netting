import { Component } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public location: Location) {}

  ngOnInit(){
  }

  isMap(path){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    titlee = titlee.slice( 1 );
    if(path == titlee){
      return false;
    }
    else {
      return true;
    }
  }

  isLoggedIn(){
    if(sessionStorage['curr_sess'] == null){
        return false;
    }
    else {
      return true;
    }
  }

  isClient(){
    var obj = JSON.parse(sessionStorage.getItem("curr_sess"));
    if(obj['roleId'] == 2){
      return true;
    }
    else {
      return false;
    }
  }

}
