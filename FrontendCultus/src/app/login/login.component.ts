import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { StatusService } from 'src/app/services/status.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  
  public loginError: boolean = false;
  public loginStatus: boolean = false;
  
  constructor(private api: AuthenticationService, private router: Router, private status: StatusService) {}
  
  sendLogin(credentials: any){

    return this.api.sendLogin(credentials).subscribe( 
      (res:any) => {
        var resultado = res.access_token;
        console.log(resultado); 
        localStorage.setItem('accessToken', JSON.stringify(res["access_token"]));
        this.status.isLoggedIn = true;
        this.router.navigateByUrl('/');

      },(error) => {
        this.loginError = true;
        console.log("Login Error: " + this.loginError);
      }
    );
  }
}
