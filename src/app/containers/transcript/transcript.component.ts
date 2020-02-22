
import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { guestsEnum } from 'src/utils/enums/enums';
import { ITranscrtipt } from 'src/utils/interfaces/interfaces';
import { chainedInstruction } from '@angular/compiler/src/render3/view/util';



@Component({
  selector: 'app-transcript',
  templateUrl: './transcript.component.html',
  styleUrls: ['./transcript.component.scss'],
})
export class TranscriptComponent implements OnInit {
  @Input() currentTranscriptObj
  snippetsPerUserArray: string[] = [];
  prevopisSpeaker: string;
  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.currentTranscriptObj?.currentValue) {
      this.prevopisSpeaker = changes?.currentTranscriptObj?.previousValue?.speaker
      if (this.prevopisSpeaker == this.currentTranscriptObj?.speaker) {
        this.snippetsPerUserArray = [...this.snippetsPerUserArray, this.currentTranscriptObj?.snippet as string]
      } else {
        this.snippetsPerUserArray = [this.currentTranscriptObj?.snippet as string]
      }
    }
  }

  getGuestColor() {
    return {
      'background-color': this.currentTranscriptObj.speaker === guestsEnum.Rep ? ' rgba(0, 167, 209, .1)' : 'rgba(238, 110, 255, 0.1)',
      'border-color': this.currentTranscriptObj.speaker === guestsEnum.Rep ? ' rgba(0, 167, 209, 1)' : 'rgba(238, 110, 255, 1)'
    }

  }

}
