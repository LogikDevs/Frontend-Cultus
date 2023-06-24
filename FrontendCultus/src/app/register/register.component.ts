import { Component } from '@angular/core';

const inputName = document.getElementById('name') as HTMLInputElement | null;
const inputSurname = document.getElementById('surname') as HTMLInputElement | null;
const inputEmail = document.getElementById('email') as HTMLInputElement | null;
const inputPassword = document.getElementById('password') as HTMLInputElement | null;
const inputRepeatPassword = document.getElementById('password2') as HTMLInputElement | null;

console.log(inputName, inputSurname, inputEmail, inputPassword, inputRepeatPassword);
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  
}
