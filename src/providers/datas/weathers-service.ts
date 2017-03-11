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
    super(http);
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

  /**
   * getLastIndoorTemp
   * 
   * @returns 
   * 
   * @memberOf WeathersService
   */
  getLastIndoorTemp() {
    return this.http.get('/api/weathers/indoorTemp/last')
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   * getExtremeIndoorTemp
   * 
   * @returns 
   * 
   * @memberOf WeathersService
   */
  getExtremeIndoorTemp() {
    return this.http.get('/api/weathers/indoorTemp/' + this.getExtremeUrl())
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   * getLastOutdoorTemp
   * 
   * @returns 
   * 
   * @memberOf WeathersService
   */
  getLastOutdoorTemp() {
    return this.http.get('/api/weathers/outdoorTemp/last')
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   * getExtremeOutdoorTemp
   * 
   * @returns 
   * 
   * @memberOf WeathersService
   */
  getExtremeOutdoorTemp() {
    return this.http.get('/api/weathers/outdoorTemp/' + this.getExtremeUrl())
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   * getLastPressure
   * 
   * @returns 
   * 
   * @memberOf WeathersService
   */
  getLastPressure() {
    return this.http.get('/api/weathers/pressure/last')
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   * getExtremePressure
   * 
   * @returns 
   * 
   * @memberOf WeathersService
   */
  getExtremePressure() {
    return this.http.get('/api/weathers/pressure/' + this.getExtremeUrl())
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   * getExtremeUrl
   * 
   * @private
   * @returns 
   * 
   * @memberOf WeathersService
   */
  private getExtremeUrl(): String {
    return new Date().setHours(0,0,0,0) + '/' + new Date().getTime() + '/extreme';
  }
}
