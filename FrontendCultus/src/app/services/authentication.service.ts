import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private loginUrl = "http://localhost:8000/oauth/token";
  private logoutUrl = "http://localhost:8000/v1/logout";
  constructor(private http: HttpClient) {}
  
  
  sendLogin(credentials: any){
    const body = {
      grant_type: "password",
      client_id: "1",
      client_secret: "sLlRFyItNUXGE9m6Ziv8radhRcdpdBWNEJx13A4d",
      mail: credentials.mail,
      passwd: credentials.passwd
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

    return this.http.get(this.loginUrl, httpOptions);
  }
}