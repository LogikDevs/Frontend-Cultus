import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  sidebar!: HTMLElement;
  closeBtn!: HTMLElement;
  searchBtn!: HTMLElement;

  constructor() {}

  ngOnInit() {
    this.sidebar = document.querySelector(".sidebar")!;
    this.closeBtn = document.querySelector("#btn")!;
    this.searchBtn = document.querySelector(".bx-search")!;

    this.closeBtn.addEventListener("click", () => {
      this.sidebar.classList.toggle("open");
      this.menuBtnChange();
    });

    this.searchBtn.addEventListener("click", () => {
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
