import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { StatusService } from 'src/app/services/status.service';
import { GetUserService } from '../../services/get-user.service';
@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    sidebar!: HTMLElement;
    closeBtn!: HTMLElement;
    searchBtn!: HTMLElement;
    userId = localStorage.getItem("IdUser");
    constructor(private api: AuthenticationService, private router: Router, public status: StatusService, public userService: GetUserService) { }
    
    ngOnInit() {
        this.sidebar = document.querySelector(".sidebar")!;
        this.closeBtn = document.querySelector("#btn")!;
        this.searchBtn = document.querySelector(".bx-search")!;
        this.closeBtn.addEventListener("click", () => {
            this.sidebar.classList.toggle("open");
            this.menuBtnChange();
        });

        this.getUser();
    }

    getUser(){
        this.userService.getUserFromId(this.userId).subscribe((res: any) => {
            var Username: any = document.getElementById("username");
            Username.textContent = res.name + " " + res.surname;
        })
    }

    logout() {
        this.api.sendLogout().subscribe();
        localStorage.removeItem("accessToken");
        localStorage.removeItem("IdUser");
        this.status.isLoggedIn = false;
        this.router.navigateByUrl("/login");
    }


    menuBtnChange() {
        if (this.sidebar.classList.contains("open")) {
            this.closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
        } else {
            this.closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");
        }
    }
}

