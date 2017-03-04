import { Injectable } from '@angular/core';
import { HttpService } from '../technical/http-service';

import 'rxjs/add/operator/map';

/**
 * Get Users datas
 * 
 * @export
 * @class UsersService
 */
@Injectable()
export class UsersService {

  /**
   * Creates an instance of UsersService.
   * @param {HttpService} http 
   * 
   * @memberOf UsersService
   */
  constructor(public http: HttpService) {
    
  }

  /**
   * Check if user is authenticated on server
   * 
   * @returns 
   * 
   * @memberOf UsersService
   */
  me() {
    return this.http.get('/api/users/me');
  }

}
