import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HttpService } from '../technical/http-service';

import * as io from 'socket.io-client';

/**
 * Custom Service Class
 * 
 * @export
 * @abstract
 * @class AuthService
 */
export abstract class DatasService {

  private socket: any;

  /**
   * Creates an instance of DatasService.
   * 
   * @memberOf DatasService
   */
  constructor(public http: HttpService) {

  }

  /**
   * Return datas
   * 
   * @protected
   * @param {Response} res 
   * @returns {*} 
   * 
   * @memberOf DatasService
   */
  protected extractData(res: Response) : any {
    return res.json() || {};
  }

  /**
   * Return errors
   * 
   * @protected
   * @param {(Response | any)} error 
   * @returns 
   * 
   * @memberOf DatasService
   */
  protected handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }

    return Observable.throw(errMsg);
  }

  /**
   * Get update from model
   * 
   * @param {string} modelName - name of model
   * @param {string} type - type of event, may be null
   * @returns {Observable<any>} 
   * @memberof DatasService
   */
  public getUpdates(modelName: string, type: string) : Observable<any> {
    this.getSocket();

    if (type === undefined || type === null) {
      type = '';
    }

    let observable = new Observable(observer => {
      var socket = this.socket;
      socket.on(modelName + type, (data) => {
        observer.next(data);
      });
      return () => {
        socket.disconnect();
      };
    });
    
    return observable;
  }

  /**
   * Disconnect socket
   * 
   * @memberof DatasService
   */
  public closeSocket() : void {
    this.socket.disconnect(0);
    this.socket = null;
  }

  /**
   * Joint the room x
   * 
   * @param {string} room 
   * @memberof DatasService
   */
  public joinRoom(room: string) : void {
    this.getSocket();

    this.socket.emit('join-' + room);
  }

  /**
   * Leave the room X
   * 
   * @param {string} room 
   * @memberof DatasService
   */
  public leaveRoom(room: string) : void {
    this.getSocket();

    this.socket.emit('leave-' + room);
  }

  /**
   * Create socket
   */
  private getSocket() : void {
    if (this.socket === undefined || this.socket === null) {
      this.socket = io('', {
        ws: true,
        query: 'token=' + localStorage.getItem('token')
      });
    }
  }
}