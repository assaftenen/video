import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { chorusConsts } from './../../../utils/consts';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})

export class PlayerComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() clipId: string
  source: string

  constructor() { }
  @ViewChild("videoPlayer", { static: false }) videoplayer: ElementRef;
  ngOnInit(): void {
    // if (this.clipId) {
    //   //@ToDo-Assaf move to environments files
    //   this.source = `${chorusConsts.urlPrefix}${chorusConsts.url}${this.clipId}${chorusConsts.urlPathEnd}`
    // }
  }


  ngOnChanges(changes: SimpleChanges) {
    // if (changes?.clipId?.currentValue) {
    //   this.clipId = changes.clipId.currentValue;
    // }
  }
  toggleVideo(event: any) {
    this.videoplayer.nativeElement.play();
  }
  ngAfterViewInit(): void {


  }
}
