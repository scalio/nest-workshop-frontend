import {
  Directive,
  ElementRef,
  Output,
  Input,
  EventEmitter,
  HostListener,
} from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[clickOutside]',
})
export class ClickOutsideDirective {
  @Input() clickTrigger: HTMLElement;
  @Output() clickOutside = new EventEmitter<MouseEvent>();

  constructor(private readonly elementRef: ElementRef) {}

  @HostListener('document:mouseup', ['$event', '$event.target'])
  public onClick(event: MouseEvent, targetElement: HTMLElement) {
    if (!targetElement) {
      return;
    }
    const clickedOnTrigger =
      this.clickTrigger && this.clickTrigger.contains(targetElement);
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside && !clickedOnTrigger) {
      this.clickOutside.emit(event);
    }
  }
}
