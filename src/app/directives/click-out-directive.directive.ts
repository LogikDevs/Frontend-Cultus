import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appClickOutside]'
})
export class ClickOutDirectiveDirective {
  	@Output() appClickOutside = new EventEmitter<void>();

  	constructor(private elementRef: ElementRef) {}

  	@HostListener('document:click', ['$event.target'])
  	onClick(target: any): void {
    	const clickedInside = this.elementRef.nativeElement.contains(target);
    	
		if (!clickedInside) {
      		this.appClickOutside.emit(); 
    	}
  }
}
