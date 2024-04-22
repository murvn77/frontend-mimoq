import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTooltip]',
  standalone: true
})
export class TooltipDirective {

  // constructor() { }


  constructor(private el: ElementRef, private render: Renderer2) { }
  @Input('appTooltip') toolTipContent: string = '';

  createTooltip(): HTMLElement {
    const tooltip = this.render.createElement('div');
    const text = this.render.createText(this.toolTipContent);
    this.render.appendChild(tooltip, text);
    this.render.addClass(tooltip, 'myTooltip');
    this.render.setStyle(tooltip, 'postion', 'absolute');
    return tooltip;
  }
  // @HostListener('mouseenter') onMouseEnter() {
  //   this.highlight('yellow');
  // }
  @HostListener('mouseover')
  onMouseOver() {
    const myTooltip = this.createTooltip();
    this.render.appendChild(this.el.nativeElement, myTooltip);
    console.log('mouseover');
  }

  @HostListener('mouseout')
  onMouseOut() {
    setTimeout(() => {
      const tooltip = this.el.nativeElement.querySelector('.myTooltip')
      this.render.removeChild(this.el.nativeElement, tooltip);
    },200)
    console.log('mouseout');
  }
  // @HostListener('mouseleave') onMouseLeave() {
  //   this.highlight('');
  // }
  // private highlight(color: string) {
  //   this.el.nativeElement.style.backgroundColor = color;
  // }
}
