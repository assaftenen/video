import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { chorusConsts } from './../../../utils/consts';
@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})

export class PlayerComponent implements OnInit, OnChanges {
  @Input() isVideoPlay;
  @Output() userClickedPlay: EventEmitter<any> = new EventEmitter()
  source: string

  constructor() { }
  @ViewChild("videoPlayer", { static: false }) videoplayer: ElementRef;
  ngOnInit(): void {
  }


  ngOnChanges(changes: SimpleChanges) {
    debugger
    if (typeof changes?.isVideoPlay?.currentValue === "boolean") {
      this.isVideoPlay = changes.isVideoPlay.currentValue;
    }
  }

  playClicked() {
    this.userClickedPlay.emit('play!')
  }
}
