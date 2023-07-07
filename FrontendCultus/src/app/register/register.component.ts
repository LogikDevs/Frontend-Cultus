import { Component } from '@angular/core';
import { PostRegisterService } from '../services/post-register.service';
import { Router } from '@angular/router';
import { StatusService } from '../services/status.service';
import { catchError} from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  
  constructor(private api: PostRegisterService, private router: Router, private status: StatusService, private apiauth: AuthenticationService){};
PostRegister(inputdata:any){
  this.api.PostRegister(inputdata).subscribe(
    (res:any)=>{console.log("Cuenta Creada")});
  this.apiauth.sendLogin(inputdata).subscribe( 
    (res:any) => {
      localStorage.setItem('accessToken', (res["access_token"]));
      this.status.isLoggedIn = true;
      this.router.navigateByUrl('/optionsdata');
      console.log("IsLoggedIn: "+this.status.isLoggedIn);
    }
  );
  }
}