import {Directive, ElementRef, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})

export class DropdownDirective {
constructor(private elRef: ElementRef) {}
  @HostBinding('class.show') isOpen = false;
  @HostListener('click') toogleOpen() {
    this.isOpen = !this.isOpen;
    this.elRef.nativeElement.querySelector('.dropdown-menu').classList.toggle('show')
  } 
}