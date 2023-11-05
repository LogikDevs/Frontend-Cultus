import { Component } from '@angular/core';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.scss']
})
export class GruposComponent {
    Section:boolean = true;

    constructor() { }
  
    ngOnInit(): void { }
  
    ChangeSection(type:boolean){
      if (type != this.Section) this.Section = type;
    }
}
