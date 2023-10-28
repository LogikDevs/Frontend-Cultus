import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert-complete',
  templateUrl: './alert-complete.component.html',
  styleUrls: ['./alert-complete.component.scss']
})
export class AlertCompleteComponent {
    @Input() Message:string;
}

