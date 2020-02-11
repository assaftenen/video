import { chorusConsts } from './../../utils/consts';
import { ITranscrtipt } from './../../utils/interfaces';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class HttpService {
  apiURL: string = `${chorusConsts.urlPrefix}${chorusConsts.url}`

  constructor(private httpClient: HttpClient) { }
  public getTranscript(clipId: string) {
    return this.httpClient.get<ITranscrtipt[]>(`${this.apiURL}${clipId}.json`);
  }
}