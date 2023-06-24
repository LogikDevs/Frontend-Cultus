import { Component } from '@angular/core';

const inputNombre = document.getElementById('nombre') as HTMLInputElement | null;
const inputApellido = document.getElementById('apellido') as HTMLInputElement | null;
const inputCorreo = document.getElementById('correo') as HTMLInputElement | null;
const inputPassword = document.getElementById('password') as HTMLInputElement | null;
const inputConfirmacionPassword = document.getElementById('password2') as HTMLInputElement | null;
console.log(inputNombre, inputApellido, inputCorreo, inputPassword, inputConfirmacionPassword);
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

}
