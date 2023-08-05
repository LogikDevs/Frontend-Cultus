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
	
	constructor(private getUser: GetUserService, private registerService: PostRegisterService, private router: Router, private status: StatusService, private apiauth: AuthenticationService) { };

	PostRegister(inputdata: any) {
		this.registerService.PostRegister(inputdata).subscribe((res: HttpResponse<Object>) => {
			console.log(res);
			if (res.status === 201) this.RegisterLogin(inputdata);

			if (res.status !== 201) this.handleErrorResponse(res);
		})
	}
	RegisterLogin(inputdata:any){
		this.apiauth.sendLogin(inputdata).subscribe((res: any) => {
			localStorage.setItem('accessToken', (res["access_token"]));
			this.status.isLoggedIn = true;
			this.getUser.UserIdIntoStorage();
			
			this.router.navigateByUrl('/optionsdata');
		})
	}
	handleErrorResponse(response: HttpResponse<any>) {
		clearTimeout(this.ErrorResetTimeout);

		if (response.body) {
			const Errors = {
				emailError: response.body.email,
				passwordError: response.body.password,
				nameError: response.body.name,
				surnameError: response.body.surname,
				ageError: response.body.age,
			}

		  	if (Errors.emailError){ 
				if(Errors.emailError[0]) this.InputEmailError = Errors.emailError[0];
				
				if((Errors.emailError[0])&&(Errors.emailError[1])) this.InputEmailError =  Errors.emailError[1];
			}else this.InputEmailError = '';
		  	
			
			if(Errors.passwordError[0]) this.InputPasswordError = Errors.passwordError[0];
			else this.InputPasswordError = '';
			
			if (Errors.nameError) this.InputNameError = Errors.nameError;
			else this.InputNameError = '';
			
			if (Errors.surnameError) this.InputSurnameError = Errors.surnameError;
			else this.InputSurnameError = '';
			
			if (Errors.ageError) this.InputAgeError = Errors.ageError;
			else this.InputAgeError = '';
			
			this.ErrorReset(); 
		}
	}
	private ErrorReset(): void {
		this.ErrorResetTimeout = setTimeout(() => {
		  this.InputEmailError = '';
		  this.InputPasswordError = '';
		  this.InputNameError = '';
		  this.InputSurnameError = '';
		  this.InputAgeError = '';
		}, this.secondsToReset);
	  }
}