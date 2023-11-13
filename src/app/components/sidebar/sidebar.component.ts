import { Component, Input, OnInit } from '@angular/core';
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
    @Input() Username: any;

    sidebar!: HTMLElement;
    closeBtn!: HTMLElement;
    searchBtn!: HTMLElement;

    showProfilePic: any = false;
    userId: any;
    userData: any;

    urlPfp: any = "http://localhost:8000/storage/profile_pic/";
    userPfp: any = "/assets/post-images/profile_def.jpg";
    constructor(
        private api: AuthenticationService,
        private router: Router,
        public status: StatusService,
        public userService: GetUserService
    ) { }

    ngOnInit() {
        this.getUser();
        this.sidebar = document.querySelector(".sidebar")!;
        this.closeBtn = document.querySelector("#btn")!;
        this.searchBtn = document.querySelector(".bx-search")!;

        this.closeBtn.addEventListener("click", () => {
            this.sidebar.classList.toggle("open");
            this.menuBtnChange();
        });
    }
    getUser() {
        this.userService.getUser().subscribe((res: any) => {
            this.userData = res;
            this.Username = this.userData.name + " " + this.userData.surname;
            this.checkProfilePic();
        })
    }
    checkProfilePic() {
        if (this.userData.profile_pic) this.userPfp = this.urlPfp + this.userData.profile_pic;
        this.showProfilePic = true;
    }
    ToOwnProfile() {
        this.router.navigateByUrl("/profile/" + this.userData.id);
    }

    logout() {
        this.api.sendLogout().subscribe();
        localStorage.removeItem("accessToken");
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

