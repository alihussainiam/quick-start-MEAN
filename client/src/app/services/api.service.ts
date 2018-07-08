

import { Injectable } from '@angular/core';
import { Http, Headers, BaseRequestOptions, RequestOptions, Response } from '@angular/http';


import { AppConfig } from '../../config/app.config';
import { AuthService } from './auth.service';


@Injectable()
export class ApiService {

  constructor(private http: Http, private config: AppConfig, private auth: AuthService) {
  }

  public saveNote(data: any): Promise<any> {

    // const headers = new Headers({ 'Content-Type': 'application/json' });
    // const options = new RequestOptions({ headers: headers });

    data.sessionId = this.auth.getSessionId();

    return this.http.post(this.config.API_SAVENOTE, data).toPromise().then((res) => {
      return { error: null, result: res };
    }
    ).catch(this.onApiError);
  }

  public getNotes(): Promise<any> {

    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.get(this.config.API_GETNOTE + `/?sessionId=${this.auth.getSessionId()}`, options).toPromise().then((res) => {
      return { error: null, result: res.json() };
    }
    ).catch(this.onApiError);
  }


  private onApiError(error: Response | any) {

    return { error: error, result: null };
  }

}
