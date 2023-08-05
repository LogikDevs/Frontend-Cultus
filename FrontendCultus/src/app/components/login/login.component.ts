import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { StatusService } from 'src/app/services/status.service';
import { GetUserService } from '../../services/get-user.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {

	public loginError: boolean = false;
	public loginStatus: boolean = false;

	constructor(private api: AuthenticationService, private router: Router, private status: StatusService, private UserService: GetUserService) { }

	sendLogin(credentials: any) {
		this.api.sendLogin(credentials).subscribe(
			(res: any) => {
				localStorage.setItem('accessToken', (res["access_token"]));
				this.status.isLoggedIn = true;
				this.UserService.UserIdIntoStorage();
				this.router.navigateByUrl('/home');
			}
		)
	}
}
