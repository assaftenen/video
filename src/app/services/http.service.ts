import { Router } from '@angular/router';
import { environment } from './../../environments/environment';
import { ITranscrtipt } from './../../utils/interfaces/interfaces';
import { Injectable } from '@angular/core';
import { HttpClient, HTTP_INTERCEPTORS, HttpErrorResponse, HttpHandler } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { empty } from 'rxjs';





@Injectable({
  providedIn: 'root'
})
export class HttpService {
  apiURL: string = `${environment.urlPrefix}${environment.url}`

  constructor(private httpClient: HttpClient, private router: Router) { }
  public getTranscript(clipId: string) {
    return this.httpClient.get<ITranscrtipt[]>(`${this.apiURL}${clipId}.json`)
      .pipe(catchError(error => {
        if (error instanceof HttpErrorResponse && error.status == 404) {
          this.router.navigateByUrl('/', { replaceUrl: true });

          return empty();
        }
        else {
          throw new error(error);

        }
      }))
  };


}
