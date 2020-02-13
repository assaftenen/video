
import { Component, OnInit, Input, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { guestsEnum } from 'src/utils/enums/enums';
import { ITranscrtipt } from 'src/utils/interfaces/interfaces';
import { chainedInstruction } from '@angular/compiler/src/render3/view/util';



@Component({
  selector: 'app-transcript',
  templateUrl: './transcript.component.html',
  styleUrls: ['./transcript.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TranscriptComponent implements OnInit {
  @Input() transcript // array of transcript objs
  @Input() currentLocation // the current play time
  transcriptObj: ITranscrtipt;
  snippetsPerUserArray: string[] = [];
  prevopisSpeaker: string;
  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    // transcript obj change
    if (changes?.transcript?.currentValue) {
      this.transcript = changes.transcript.currentValue
    }
    // current location change
    if (changes?.currentLocation?.currentValue) {
      this.currentLocation = changes.currentLocation.currentValue
      if (this.transcript) {
        if (this.transcript[this.currentLocation]) {
          this.prevopisSpeaker = this.transcriptObj?.speaker ? this.transcriptObj?.speaker : this.transcript[this.currentLocation]
          this.transcriptObj = this.transcript[this.currentLocation];
          if (this.prevopisSpeaker == this.transcriptObj.speaker) {
            this.snippetsPerUserArray = [...this.snippetsPerUserArray, this.transcriptObj.snippet as string]
          } else {
            this.snippetsPerUserArray = [this.transcriptObj.snippet as string]
          }
        }
      }
    }
  }
  getGuestColor() {
    return {
      'background-color': this.transcriptObj.speaker === guestsEnum.Rep ? ' rgba(0, 167, 209, .1)' : 'rgba(238, 110, 255, 0.1)',
      'border-color': this.transcriptObj.speaker === guestsEnum.Rep ? ' rgba(0, 167, 209, 1)' : 'rgba(238, 110, 255, 1)'
    }

  }

}
