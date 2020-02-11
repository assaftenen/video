import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-transcript',
  templateUrl: './transcript.component.html',
  styleUrls: ['./transcript.component.scss']
})
export class TranscriptComponent implements OnInit {
  @Input() transcript
  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.transcript?.currentValue) {
      this.transcript = changes.transcript.currentValue
    }
  }

}
