import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[temp-color]' // Attribute selector
})
export class TempColor {

  @Input('temp-color') set temperature(temp) {
    this.el.nativeElement.style.backgroundColor = '#f6f6f6'
  };

  constructor(public el: ElementRef) {
    if (this.temperature !== undefined) {
      this.el.nativeElement.style.backgroundColor = '#f6f6f6';
    }
  }
}
