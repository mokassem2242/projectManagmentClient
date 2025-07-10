import { Directive, ElementRef, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appRtl]',
  standalone: true
})
export class RtlDirective implements OnInit, OnDestroy {
  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.applyRTLClasses();
  }

  ngOnDestroy(): void {
    // Clean up any RTL-specific classes
    const element = this.elementRef.nativeElement;
    const rtlClasses = [
      'rtl', 'ltr', 'direction-rtl', 'direction-ltr',
      'text-right-rtl', 'text-left-rtl'
    ];

    rtlClasses.forEach(className => {
      element.classList.remove(className);
    });
  }

  private applyRTLClasses(): void {
    const element = this.elementRef.nativeElement;
    
    // Add RTL class by default since the project is RTL
    element.classList.add('rtl');
    
    // Apply direction-specific styles
    element.style.direction = 'rtl';
    element.style.textAlign = 'right';
  }
} 