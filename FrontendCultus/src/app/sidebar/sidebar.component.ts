import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { StatusService } from 'src/app/services/status.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  sidebar!: HTMLElement;
  closeBtn!: HTMLElement;
  searchBtn!: HTMLElement;

  constructor(private api: AuthenticationService, private router: Router, public status: StatusService) {}
  logout(){
    this.api.sendLogout().subscribe();
    localStorage.removeItem("accessToken");
    this.status.isLoggedIn = false;
    this.router.navigateByUrl("/login");
    console.log("IsLoggedIn: "+this.status.isLoggedIn);
  }

  ngOnInit() {
    this.sidebar = document.querySelector(".sidebar")!;
    this.closeBtn = document.querySelector("#btn")!;
    this.searchBtn = document.querySelector(".bx-search")!;

    this.closeBtn.addEventListener("click", () => {
      this.sidebar.classList.toggle("open");
      this.menuBtnChange();
    });
  }
  menuBtnChange() {
    if (this.sidebar.classList.contains("open")) {
      this.closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
    } else {
      this.closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");
    }
  }

}

