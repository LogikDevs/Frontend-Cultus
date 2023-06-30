import { Component } from '@angular/core';
import { PostLoginService } from '../services/post-login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private api: PostLoginService){};

  PostLogin(inputdata:any){
    this.api.PostLogin(inputdata).subscribe((res)=>{
      console.log(res);
    });
  }
  }

