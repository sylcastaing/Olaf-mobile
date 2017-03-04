import { Injectable } from '@angular/core';
import { HttpService } from '../technical/http-service';
import { DatasService } from '../technical/datas-service';

import 'rxjs/add/operator/map';

/**
 * Get Weathers datas
 * 
 * @export
 * @class WeathersService
 */
@Injectable()
export class WeathersService extends DatasService {

  /**
   * Creates an instance of WeathersService.
   * @param {HttpService} http 
   * 
   * @memberOf WeathersService
   */
  constructor(public http: HttpService) {
    super();
  }

  /**
   * Get datas between 2 dates
   * 
   * @param {Number} start 
   * @param {Number} end 
   * @returns 
   * 
   * @memberOf WeathersService
   */
  get(start: Number, end: Number) {
    return this.http.get('/api/weathers/' + start + '/' + end)
      .map(this.extractData)
      .catch(this.handleError);
  }

}
