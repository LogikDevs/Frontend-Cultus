import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetCountriesService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ` + localStorage.getItem("accessToken")
    })
  }
  private urlCountries = "http://localhost:8000/api/v1/country";
  
  constructor(private http: HttpClient) { }
  
  getCountries(){
    return this.http.get(this.urlCountries, this.httpOptions);
  }
}
