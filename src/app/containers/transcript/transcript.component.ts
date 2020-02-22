
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
    console.log(changes.currentTranscriptObj.currentValue)
    if (changes?.currentTranscriptObj?.currentValue) {
      const currentValue = changes?.currentTranscriptObj.currentValue;
      currentValue.snippet = [changes?.currentTranscriptObj?.currentValue.snippet];
      this.currentTranscriptObj = currentValue;
      const previesValue = changes.currentTranscriptObj?.previousValue;
      if (previesValue) {
        previesValue.snippet = this.allCurrentTranscriptObjs[this.allCurrentTranscriptObjs.length - 1].snippet;
        if (previesValue?.speaker === this.currentTranscriptObj.speaker) {

          // this.currentTranscriptObj.snippet = [...this.currentTranscriptObj.snippet, ...previesValue.snippet]
          this.allCurrentTranscriptObjs[this.allCurrentTranscriptObjs.length - 1.].snippet = [...this.allCurrentTranscriptObjs[this.allCurrentTranscriptObjs.length - 1.].snippet, ...currentValue.snippet]
        } else {// no same speakers
          this.allCurrentTranscriptObjs = [...this.allCurrentTranscriptObjs, this.currentTranscriptObj];
        }

      } else {

        this.allCurrentTranscriptObjs = [...this.allCurrentTranscriptObjs, this.currentTranscriptObj]
      }
      // debugger;
    }
    console.log(this.allCurrentTranscriptObjs)











    if (changes?.currentTranscriptObj?.currentValue) {
      this.prevopisSpeaker = changes?.currentTranscriptObj?.previousValue?.speaker
      if (this.prevopisSpeaker == this.currentTranscriptObj?.speaker) {
        this.snippetsPerUserArray = [...this.snippetsPerUserArray, this.currentTranscriptObj?.snippet as string]
      } else {
        this.snippetsPerUserArray = [this.currentTranscriptObj?.snippet as string]
      }
    }
  }

  // getGuestColor(transcript) {
  //   return {
  //     'background-color': this.currentTranscriptObj.speaker === guestsEnum.Rep ? ' rgba(0, 167, 209, .1)' : 'rgba(238, 110, 255, 0.1)',
  //     'border-color': this.currentTranscriptObj.speaker === guestsEnum.Rep ? ' rgba(0, 167, 209, 1)' : 'rgba(238, 110, 255, 1)'
  //   }

  // }
  getGuestColor(transcript) {
    return {
      'background-color': transcript.speaker === guestsEnum.Rep ? ' rgba(0, 167, 209, .1)' : 'rgba(238, 110, 255, 0.1)',
      'border-color': transcript.speaker === guestsEnum.Rep ? ' rgba(0, 167, 209, 1)' : 'rgba(238, 110, 255, 1)'
    }

  }

}
