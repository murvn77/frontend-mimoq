import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appTooltip]',
  standalone: true
})
export class TooltipDirective {

  constructor() { }

  @HostListener('mouseover') 
  onMouseOver() {
    console.log('mouseover');
  }
  
  @HostListener('mouseout')
  onMouseOut() {
    console.log('mouseout');
  }
}
