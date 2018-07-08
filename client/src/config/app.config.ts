import { Injectable } from '@angular/core';

@Injectable()
export class AppConfig {

    private apiPrefix = 'http://localhost:4040/api/';
    public API_SAVENOTE = this.apiPrefix + 'saveNote';
    public API_GETNOTE = this.apiPrefix + 'getNote';


}
