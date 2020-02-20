import { HttpService } from './../../services/http.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, fromEvent, Subscription } from 'rxjs';
import { mergeAll, reduce, distinctUntilChanged, map } from 'rxjs/operators';
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
  clipId: any;
  transcript$: Observable<any>
  source: string;
  isVIdeoPlay = false;
  currentLocation: { time: number };
  isFirstTimePlaying = true;
  subscription: Subscription

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
    this.source = `${environment.urlPrefix}${environment.url}${this.clipId}${environment.urlPathEnd}`

  }

  transcriptReducerFunction(acc, curr): import("rxjs").OperatorFunction<ITranscrtipt, {}> {
    acc[curr.time.toFixed()] = curr;
    return acc
  }

  ngAfterViewInit() {
    if (this.videoplayer?.nativeElement) {

      this.subscription = fromEvent(this.videoplayer.nativeElement, "timeupdate").pipe(
        map(event => (event as any).target?.currentTime.toFixed()),
        distinctUntilChanged()).subscribe((time) => {
          this.currentLocation = time;
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
    this.subscription.unsubscribe();
  }
}

