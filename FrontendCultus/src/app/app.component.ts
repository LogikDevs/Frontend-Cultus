import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'
export var urlAuthenticationAPI: string = 'http://localhost:8000/api/v1/user';
export var urlPostsAPI: string = 'xd';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FrontendCultus';
  constructor(private http: HttpClient){};
}
