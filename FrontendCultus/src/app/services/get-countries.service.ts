import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetCountriesService {
  private urlCountries = "http://localhost:8000/api/v1/country";
  
  constructor(private http: HttpClient) { }

  getCountries(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ` + localStorage.getItem("accessToken")
      })
    }
    return this.http.get(this.urlCountries, httpOptions);
  }
}
