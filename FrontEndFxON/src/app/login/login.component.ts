import { Component, OnInit } from '@angular/core'; 
import { User } from '../user';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private user =new User( );
  constructor(private loginService: LoginService, private router: Router) {
    if(sessionStorage.length > 0){
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnInit() {
    
  }

  onLoginSubmit({value}: {value:User}){
    this.user = value;
    console.log(value);
    this.loginService.userLogin(this.user).subscribe(data=>{
        if(data['userId'] == 0){
            console.log("Invalid Login");
          }
        else{
          sessionStorage.setItem('curr_sess', JSON.stringify(data));
          console.log(sessionStorage.getItem('curr_sess'));
          this.router.navigate(['/dashboard']);
        }
      });

  }

  

}
