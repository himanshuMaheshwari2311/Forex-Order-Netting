import { Component, OnInit } from '@angular/core'; 
import { User } from '../user';
import { LoginService } from './login.service';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private user =new User( );
  constructor(private loginService: LoginService) { }

  ngOnInit() {
    
  }

  onLoginSubmit({value}: {value:User}){
    this.user = value;
    console.log(value);
    this.loginService.userLogin(this.user).subscribe(data=>{
          if(data == null){
            console.log("Invalid Login");
          }
          console.log(data['userName']);
      });

  }

}
