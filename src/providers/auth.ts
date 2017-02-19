import { Injectable } from '@angular/core';
import { HttpService } from './http-service';
import { Storage } from '@ionic/storage';
import { User } from './user';

import 'rxjs/add/operator/map';

/*
  Generated class for the Auth provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Auth {

  constructor(public http: HttpService, public storage: Storage, public user: User) {
    
  }

  checkAuthentification() {
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {

        this.http.token = value;

        this.user.get()
          .subscribe(res => {
            resolve(res);
          }, err => {
            reject(err);
          });
      });
    });
  }

  login(credentials) {
    return new Promise((resolve, reject) => {
      this.http.post('http://192.168.0.15:9000/auth/local', credentials)
      .map(res => res.json())
      .subscribe(res => {
        this.http.token = res.token;
        this.storage.set('token', res.token);
        resolve(res);
      }, err => {
        reject(err);
      });
    });
  }

  logout() {
    this.http.token = "";
    this.storage.remove('token');
  }
}
