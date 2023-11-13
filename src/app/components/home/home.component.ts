import { Component } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  Section:boolean = true;

  constructor() { }

  ngOnInit(): void { }

  ChangeSection(type:boolean){
    if (type != this.Section) this.Section = type;
  }
}
