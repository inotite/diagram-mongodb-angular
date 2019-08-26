import { Directive, ElementRef, OnInit, AfterViewInit, Input } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Directive({
  selector: '[appWidthShift]'
})
export class WidthShiftDirective implements AfterViewInit {
  private enabled = false;
  private show = false;
  private mouseDown: Observable<boolean>;
  private mouseUp: Observable<Event>;
  private mouseWheel: Observable<number>;
  private mouseShow: Observable<boolean>;
  private mouseLeave: Observable<boolean>;
  private width: number;
  @Input() minWidth: number;
  @Input() maxWidth: number;
  constructor(private el: ElementRef) { }

  ngAfterViewInit() {
    this.width = this.el.nativeElement.clientWidth;
    this.mouseDown = fromEvent(this.el.nativeElement, 'mousedown').pipe(
      map((e: MouseEvent) => {
        if (e.buttons === 1 && this.width - e.x < 4) {
          this.enabled = true;
        }
        return this.enabled;
      })
    );
    this.mouseUp = fromEvent(document.body, 'mouseup');
    this.mouseWheel = fromEvent(document.body, 'mousemove').pipe(
      map((e: MouseEvent) => {
        return (this.enabled
          && e.x > this.minWidth && e.x < this.maxWidth) ? e.x : 0;
      })
    );
    this.mouseShow = fromEvent(this.el.nativeElement, 'mousemove').pipe(
      map((e: MouseEvent) => {
        if (this.width - e.x < 4) {
          this.el.nativeElement.style.cursor = 'col-resize';
          this.show = true;
        } else {
          if (this.el.nativeElement.style.cursor === 'col-resize') {
            this.el.nativeElement.style.cursor = 'auto';
            this.show = false;
          }
        }
        return true;
      })
    );
    this.mouseLeave = fromEvent(this.el.nativeElement, 'mouseleave')/*.pipe(
      map((e: MouseEvent) => {
        if (this.show) {
          this.el.nativeElement.style.cursor = 'default';
          this.show = false;
        }
        return true;
      })
    )*/;
    this.mouseDown.subscribe(data => { });
    this.mouseUp.subscribe(data => {
      if (this.enabled) {
        this.enabled = false;
      }
    });
    this.mouseWheel.subscribe(delta => {
      if (delta) {
        this.width = delta;
        this.el.nativeElement.style.width = this.width + 'px';
      }
    });
    this.mouseShow.subscribe(data => { });
    this.mouseLeave.subscribe(data => {
      if (this.show) {
        this.el.nativeElement.style.cursor = 'default';
        this.show = false;
      }
    });
  }
}
