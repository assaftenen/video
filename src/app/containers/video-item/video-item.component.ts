import { HttpService } from './../../services/http.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, fromEvent } from 'rxjs';
import { ITranscrtipt } from 'src/utils/interfaces';
import { tap, mergeAll, toArray, reduce } from 'rxjs/operators';
import { chorusConsts } from 'src/utils/consts';

@Component({
  selector: 'app-video-item',
  templateUrl: './video-item.component.html',
  styleUrls: ['./video-item.component.scss'],
  providers: [HttpService]
})
export class VideoItemComponent implements OnInit, AfterViewInit {

  @ViewChild("videoPlayer") videoplayer: ElementRef;
  title: string = 'Moment from meeting with two pillars'
  clipId: any;
  transcript$: Observable<any>
  source: string;
  isVIdeoPlay = false;
  currentPlayTime: any;
  currentLocation: number;
  isFirstTimePlaying = true;

  constructor(private route: ActivatedRoute, private httpService: HttpService) { }


  ngOnInit(): void {
    this.clipId = this.route.snapshot.queryParams["id"];
    if (this.clipId) {
      this.getTranscriptById();
    }
  }
  private getTranscriptById() {
    this.transcript$ = this.httpService.getTranscript(this.clipId).pipe(
      mergeAll(),
      reduce(this.transcriptReducerFunction, {}));
    //@ToDo-Assaf move to enviorment
    this.source = `${chorusConsts.urlPrefix}${chorusConsts.url}${this.clipId}${chorusConsts.urlPathEnd}`

  }

  transcriptReducerFunction(acc, curr): import("rxjs").OperatorFunction<ITranscrtipt, {}> {
    acc[curr.time.toFixed()] = curr;
    return acc
  }

  ngAfterViewInit() {
    if (this.videoplayer.nativeElement) {
      this.videoplayer.nativeElement.addEventListener("timeupdate", (res) => {
        const currentTime = res.target?.currentTime.toFixed()
        if (currentTime) {
          this.currentLocation = currentTime;
        }
      })
    }
  }

  toggleVideo(event: any) {
    if (!this.isVIdeoPlay || this.isFirstTimePlaying) {
      this.videoplayer.nativeElement.play();
      if (this.source && this.videoplayer?.nativeElement) {
        this.currentPlayTime = this.videoplayer.nativeElement.currentTime.toFixed(1);
      }
    } else {
      this.videoplayer.nativeElement.pause();
    }
    this.isVIdeoPlay = !this.isVIdeoPlay;
    this.isFirstTimePlaying = false;
  }
  onUserClickedPlay(event) {
    debugger
    this.toggleVideo(event)

  }
}

