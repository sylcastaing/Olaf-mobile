import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

/**
 * Custom Service Class
 * 
 * @export
 * @abstract
 * @class AuthService
 */
export abstract class DatasService {

  /**
   * Creates an instance of DatasService.
   * 
   * @memberOf DatasService
   */
  constructor() {

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
    let body = res.json();
    return body.data || {};
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
}