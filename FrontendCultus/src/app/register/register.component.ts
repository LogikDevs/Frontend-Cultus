import { Component } from '@angular/core';
import { PostRegisterService } from '../services/post-register.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private api: PostRegisterService){};
PostRegister(inputdata:any){
  this.api.PostRegister(inputdata).subscribe((res)=>{
    console.log(res);
  });
}
}