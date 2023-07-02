import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  constructor() {
    if(localStorage.getItem("accessToken") === null){
      this.isLoggedIn = false;
      console.log("LoggedIn: "+this.isLoggedIn);
    }
    else {
      this.isLoggedIn = true;
      console.log("LoggedIn: "+this.isLoggedIn);
    }
   }
  public isLoggedIn: boolean = false;
}

