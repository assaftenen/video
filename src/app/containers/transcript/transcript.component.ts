
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
  allCurrentTranscriptObjs: ITranscrtipt[] = [];

  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.currentTranscriptObj?.currentValue) {
      // current transcript obj
      const currentValue = changes?.currentTranscriptObj.currentValue;
      currentValue.snippet = [changes?.currentTranscriptObj?.currentValue.snippet];
      this.currentTranscriptObj = currentValue;
      // previous transcript obj
      const previesValue = changes.currentTranscriptObj?.previousValue;
      // is it first run?
      if (previesValue) {
        previesValue.snippet = this.allCurrentTranscriptObjs[this.allCurrentTranscriptObjs.length - 1].snippet;
        // is it the same speaker?
        if (previesValue?.speaker === this.currentTranscriptObj.speaker) {
          this.allCurrentTranscriptObjs[this.allCurrentTranscriptObjs.length - 1.].snippet = [...this.allCurrentTranscriptObjs[this.allCurrentTranscriptObjs.length - 1.].snippet, ...currentValue.snippet]
        } else {
          // other speakers
          this.allCurrentTranscriptObjs = [...this.allCurrentTranscriptObjs, this.currentTranscriptObj];
        }
      } else {
        // firs run 
        this.allCurrentTranscriptObjs = [...this.allCurrentTranscriptObjs, this.currentTranscriptObj]
      }
    }



  }
  getGuestColor(transcript) {
    return {
      'background-color': transcript.speaker === guestsEnum.Rep ? ' rgba(0, 167, 209, .1)' : 'rgba(238, 110, 255, 0.1)',
      'border-color': transcript.speaker === guestsEnum.Rep ? ' rgba(0, 167, 209, 1)' : 'rgba(238, 110, 255, 1)'
    }

  }

}
