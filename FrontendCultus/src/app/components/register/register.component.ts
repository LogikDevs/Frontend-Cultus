import { Component } from '@angular/core';
import { PostRegisterService } from '../../services/post-register.service';
import { Router } from '@angular/router';
import { StatusService } from '../../services/status.service';
import { AuthenticationService } from '../../services/authentication.service';
import { GetUserService } from 'src/app/services/get-user.service';
@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

	constructor(private getUser: GetUserService, private registerService: PostRegisterService, private router: Router, private status: StatusService, private apiauth: AuthenticationService) { };

	PostRegister(inputdata: any) {
		this.registerService.PostRegister(inputdata).subscribe((res) => {
			this.RegisterLogin(inputdata);
		})
	}
	RegisterLogin(inputdata:any){
		this.apiauth.sendLogin(inputdata).subscribe((res2: any) => {
			localStorage.setItem('accessToken', (res2["access_token"]));
			this.status.isLoggedIn = true;
			this.router.navigateByUrl('/optionsdata');
			this.getUser.UserIdIntoStorage();
		})
	}
}