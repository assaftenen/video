import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-item',
  templateUrl: './video-item.component.html',
  styleUrls: ['./video-item.component.scss']
})
export class VideoItemComponent implements OnInit {

  title: string = 'Moment from meeting with two pillars'
  constructor() { }

  ngOnInit(): void {
  }

}
