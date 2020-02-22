import { HttpService } from './../../services/http.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, fromEvent, Subscription } from 'rxjs';
import { mergeAll, reduce, distinctUntilChanged, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ITranscrtipt } from 'src/utils/interfaces/interfaces';



@Component({
  selector: 'app-video-item',
  templateUrl: './video-item.component.html',
  styleUrls: ['./video-item.component.scss'],
  providers: [HttpService]
})
export class VideoItemComponent implements OnInit, AfterViewInit {

  @ViewChild("videoPlayer") videoplayer: ElementRef;
  title: string = 'Moment from meeting with two pillars'
  // catched by snapshot of url
  clipId: string;
  source: string;
  isVIdeoPlay = false;
  isFirstTimePlaying = true;
  playerLocationSubscription: Subscription
  transcriptSubscription$: Subscription
  transcript: ITranscrtipt;
  currentTranscriptObj: any;

  constructor(private route: ActivatedRoute, private httpService: HttpService) { }


  ngOnInit(): void {
    this.clipId = this.route.snapshot.queryParams["id"];
    if (this.clipId) {
      this.getTranscriptById();
    }
  }
  private getTranscriptById() {
    this.transcriptSubscription$ = this.httpService.getTranscript(this.clipId).pipe(
      mergeAll(),
      reduce(this.transcriptReducerFunction, {})).subscribe(transcript => {
        this.transcript = transcript
      });
    this.source = `${environment.urlPrefix}${environment.url}${this.clipId}${environment.urlPathEnd}`

  }
  transcriptReducerFunction(acc, curr): Observable<ITranscrtipt> {
    acc[curr.time.toFixed()] = curr;
    return acc
  }

  ngAfterViewInit() {
    if (this.videoplayer?.nativeElement) {
      this.playerLocationSubscription = fromEvent(this.videoplayer.nativeElement, "timeupdate").pipe(
        map(event => (event as any).target?.currentTime.toFixed()),
        distinctUntilChanged()).subscribe((time) => {
          if (this.transcript[time]) {
            this.currentTranscriptObj = Object.assign({}, this.transcript[time])
          }

        })
    }
  }
  toggleVideo(event: any) {
    if (!this.isVIdeoPlay || this.isFirstTimePlaying) {
      this.videoplayer.nativeElement.play();
      if (this.source && this.videoplayer?.nativeElement) {
      }
    } else {
      this.videoplayer.nativeElement.pause();
    }
    this.isVIdeoPlay = !this.isVIdeoPlay;
    this.isFirstTimePlaying = false;
  }
  onUserClickedPlay(event) {
    this.toggleVideo(event)

  }
  ngOnDestroy(): void {
    this.playerLocationSubscription.unsubscribe();
    this.transcriptSubscription$.unsubscribe();
  }
}

