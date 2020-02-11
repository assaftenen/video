import { HttpService } from './../../services/http.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ITranscrtipt } from 'src/utils/interfaces';
import { tap, mergeAll, toArray } from 'rxjs/operators';

@Component({
  selector: 'app-video-item',
  templateUrl: './video-item.component.html',
  styleUrls: ['./video-item.component.scss'],
  providers: [HttpService]
})
export class VideoItemComponent implements OnInit {


  title: string = 'Moment from meeting with two pillars'
  clipId: any;
  transcript$: Observable<any>
  constructor(private route: ActivatedRoute, private httpService: HttpService) { }

  ngOnInit(): void {
    this.clipId = this.route.snapshot.queryParams["id"];
    if (this.clipId) {
      this.transcript$ = this.httpService.getTranscript(this.clipId).pipe(mergeAll(), toArray())


    }
  }
}
