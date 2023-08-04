import { Component, Input } from '@angular/core';
import { PostRegisterService } from '../../services/post-register.service';
import { Router } from '@angular/router';
import { StatusService } from '../../services/status.service';
import { AuthenticationService } from '../../services/authentication.service';
import { GetUserService } from 'src/app/services/get-user.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
	@Input() InputError:any;
	constructor(private getUser: GetUserService, private registerService: PostRegisterService, private router: Router, private status: StatusService, private apiauth: AuthenticationService) { };

	PostRegister(inputdata: any) {
		this.registerService.PostRegister(inputdata).subscribe((res) => {
			this.RegisterLogin(inputdata);
		})
	}
	RegisterLogin(inputdata:any){
		this.apiauth.sendLogin(inputdata).subscribe((res: any) => {
			localStorage.setItem('accessToken', (res["access_token"]));
			this.status.isLoggedIn = true;
			this.getUser.UserIdIntoStorage();
			this.router.navigateByUrl('/optionsdata');
		},(error:HttpErrorResponse)=>{
			console.log(error);
			if (error.error && error.error.error_description) {
				const errorDescription = error.error.error_description;
				this.InputError = errorDescription;
				this.ErrorReset();
			}
		})
	}
	private ErrorReset(): void {
		setTimeout(() => {
		  this.InputError = '';
		}, 3000); // 3 seconds (3000 milliseconds)
	  }
}