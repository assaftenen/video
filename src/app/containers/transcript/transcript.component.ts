import { ITranscrtipt } from './../../../utils/interfaces';
import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-transcript',
  templateUrl: './transcript.component.html',
  styleUrls: ['./transcript.component.scss']
})
export class TranscriptComponent implements OnInit {
  @Input() transcript
  @Input() currentLocation
  subTitles: ITranscrtipt;
  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.transcript?.currentValue) {
      this.transcript = changes.transcript.currentValue
    }
    if (changes?.currentLocation?.currentValue) {
      this.currentLocation = changes.currentLocation.currentValue
      if (this.transcript) {
        if (this.transcript[this.currentLocation]) {
          this.subTitles = this.transcript[this.currentLocation];
        }
      }
    }
  }

}
