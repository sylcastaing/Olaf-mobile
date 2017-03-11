import { Injectable } from '@angular/core';
import { Http, Headers, ConnectionBackend, Request, RequestOptions, RequestOptionsArgs, Response } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';

import * as io from 'socket.io-client';

/**
 * Custom Http Service for token and server address
 * 
 * @export
 * @class HttpService
 * @extends {Http}
 */
@Injectable()
export class HttpService extends Http {

  private _apiUrl;
  private _token;

  /**
   * Creates an instance of HttpService.
   * @param {ConnectionBackend} backend 
   * @param {RequestOptions} defaultOptions 
   * @param {Storage} storage 
   * 
   * @memberOf HttpService
   */
  constructor(public backend: ConnectionBackend, public defaultOptions: RequestOptions, public storage: Storage) {
    super(backend, defaultOptions);
  }

  /**
   * Init the HttpService with datas from storage
   * 
   * @param {any} cb
   * 
   * @memberOf HttpService
   */
  init(cb) {
    Observable.forkJoin([this.storage.get('apiUrl'), this.storage.get('token')])
      .subscribe((datas) => {
        this._apiUrl = datas[0];
        this._token = datas[1];
        cb();
      });
  }

  /**
   * Injection of token and apiUrl
   * 
   * @param {(string|Request)} url 
   * @param {RequestOptionsArgs} [options] 
   * @returns {Observable<Response>} 
   * 
   * @memberOf HttpService
   */
  request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {
    if (this._apiUrl !== undefined) {
      if (typeof url === 'string') {
        if (!options) {
          options = {headers: new Headers()};
        }
        options.headers.set('Authorization', `Bearer ${this._token}`);
        url = this._apiUrl + url;

      } else {
        url.headers.set('Authorization', `Bearer ${this._token}`);
        url.url = this._apiUrl + url.url;
      }

      return super.request(url, options).timeout(3000);
    }
    else {
      console.log("no apiUrl");
      return null;
    }
  }

  /**
   * Change apiUrl
   * 
   * @param {any} newApiUrl 
   * 
   * @memberOf HttpService
   */
  set apiUrl(newApiUrl: any) {
    // Check if api url is correct
    if (newApiUrl !== undefined && newApiUrl !== null && newApiUrl !== this._apiUrl) {
      if (!newApiUrl.startsWith('http://') && !newApiUrl.startsWith('https://')) {
        newApiUrl = 'http://' + newApiUrl;
      }

      this.storage.set('apiUrl', newApiUrl);
      this._apiUrl = newApiUrl;
    }
  }

  /**
   * Get ApiUrl
   * 
   * @returns {String} 
   * 
   * @memberOf HttpService
   */
  get apiUrl(): any {
    return this._apiUrl;
  }

  set token(newToken: any) {
    this._token = newToken;
  }

  get socket(): any {
    return io(this._apiUrl, {
      ws: true,
      query: 'token=' + this._token
    });
  }
}
