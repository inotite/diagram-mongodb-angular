import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-diagram',
  templateUrl: 'diagram.component.html',
  styleUrls: ['diagram.component.less']
})
export class DiagramComponent implements OnInit {
  @ViewChild('codeEditor') codeElement: ElementRef;
  public minWidth = 300;
  public maxWidth = 300;
  constructor() { }
  ngOnInit() {
    this.codeElement.nativeElement.style.width = this.minWidth + 'px';
    this.maxWidth = this.viewportWidth() / 2;
  }
  hideToLeft() {
    if (this.codeElement.nativeElement.clientWidth === 0) {
      this.codeElement.nativeElement.style.width = this.minWidth + 'px';
    } else {
      this.codeElement.nativeElement.style.width = '0';
    }
  }
  viewportWidth() {
    let w = window.innerWidth || 0;
    if (document.documentElement && document.documentElement.clientWidth) {
      w = document.documentElement.clientWidth;
    } else {
      if (document.body) {
        w = document.body.clientWidth;
      }
    }
    return w;
  }
}
