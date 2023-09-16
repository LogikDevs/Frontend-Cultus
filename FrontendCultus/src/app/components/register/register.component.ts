import { Component, Input } from '@angular/core';
import { PostRegisterService } from '../../services/post-register.service';
import { Router } from '@angular/router';
import { StatusService } from '../../services/status.service';
import { AuthenticationService } from '../../services/authentication.service';
import { GetUserService } from 'src/app/services/get-user.service';
import { HttpResponse } from '@angular/common/http';


@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
	
	@Input() InputEmailError:any;
	@Input() InputPasswordError:any;
	@Input() InputNameError:any;
	@Input() InputSurnameError:any;
	@Input() InputAgeError:any;

	ErrorResetTimeout:any;
	secondsToReset:number = 8000;
	
	constructor(
		private getUser: GetUserService, 
		private registerService: PostRegisterService, 
		private router: Router, 
		private status: StatusService, 
		private apiauth: AuthenticationService
	) { };

	PostRegister(inputdata: any) {
		this.registerService.PostRegister(inputdata).subscribe((res: any) => {
			if (res.status === 201) this.RegisterLogin(inputdata);

			if (res.status !== 201) this.handleErrorResponse(res);
		})
	}
	RegisterLogin(inputdata:any){
		this.apiauth.sendLogin(inputdata).subscribe((res: any) => {
			localStorage.setItem('accessToken', (res["access_token"]));
			this.status.isLoggedIn = true;
			this.router.navigateByUrl('/SelectUserData');
		})
	}
	handleErrorResponse(response: HttpResponse<any>) {
		if (response.body) {
			const Errors = {
				emailError: response.body.email,
				passwordError: response.body.password,
				nameError: response.body.name,
				surnameError: response.body.surname,
				ageError: response.body.age,
			}
			this.InputEmailError = Errors.emailError && (Errors.emailError[1] || Errors.emailError[0]) || '';
			this.InputPasswordError = Errors.passwordError && Errors.passwordError[0] || '';
			this.InputNameError = Errors.nameError || '';
			this.InputSurnameError = Errors.surnameError || '';
			this.InputAgeError = Errors.ageError || '';
		}
	}
}