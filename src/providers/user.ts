import { Injectable } from '@angular/core';
import { HttpService } from './http-service';

import 'rxjs/add/operator/map';

/*
  Generated class for the User provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class User {

  constructor(public httpService: HttpService) {
    
  }

  get() {
    return this.httpService.get('http://192.168.0.15:9000/api/users/me');
  }

}
