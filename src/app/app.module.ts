import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayerComponent } from './components/player/player.component';
import { VideoItemComponent } from './containers/video-item/video-item.component';
import { TranscriptComponent } from './containers/transcript/transcript.component';
import { VideoTitleComponent } from './components/video-title/video-title.component';


@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    VideoItemComponent,
    TranscriptComponent,
    VideoTitleComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
