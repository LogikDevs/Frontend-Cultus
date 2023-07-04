import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  [x: string]: any;
  private loginUrl = "http://localhost:8000/oauth/token";
  private logoutUrl = "http://localhost:8000/api/v1/logout";
  constructor(private http: HttpClient) {}
  
  
  sendLogin(credentials: any){
    const body = {
      grant_type: "password",
      client_id: "1",
      client_secret: "js8lpAbm0KMCBKOLeGyZq3qMYsBp2szL5b6XfWRW",
      username: credentials.email,
      password: credentials.password
    }

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post(this.loginUrl, body, httpOptions);
  }
  sendLogout(){
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem("accessToken") 
      })
    };
    console.log(this.logoutUrl, httpOptions);
    return this.http.get(this.logoutUrl, httpOptions);
  }
}
