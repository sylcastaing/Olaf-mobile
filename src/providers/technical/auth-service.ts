import { Injectable } from '@angular/core';
import { HttpService } from './http-service';
import { Storage } from '@ionic/storage';
import { UsersService } from '../datas/users-service';

import 'rxjs/add/operator/map';

/**
 * Authentication service
 * 
 * @export
 * @class AuthService
 */
@Injectable()
export class AuthService {

  /**
   * Creates an instance of Auth.
   * @param {HttpService} http 
   * @param {Storage} storage 
   * @param {User} user 
   * 
   * @memberOf Auth
   */
  constructor(public http: HttpService, public storage: Storage, public usersService: UsersService) {
    
  }

  /**
   * Check is user is authenticated
   * 
   * @returns Promise
   * 
   * @memberOf Auth
   */
  checkAuthentification() {
    return new Promise((resolve, reject) => {
      this.usersService.me()
        .subscribe(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  }

  /**
   * Login function
   * 
   * @param {any} credentials 
   * @returns Promise
   * 
   * @memberOf Auth
   */
  login(credentials) {
    this.http.apiUrl = credentials.server;
    delete credentials.server;

    return new Promise((resolve, reject) => {
      this.http.post('/auth/local', credentials)
      .map(res => res.json())
      .subscribe(res => {
        this.http.token = res.token;
        this.storage.set('token', res.token);
        resolve(res);
      }, err => {
        if (err.status === 401) {
          reject(JSON.parse(err._body));
        }
        else {
          reject(err);
        }
      });
    });
  }

  /**
   * Logout function
   * 
   * @memberOf Auth
   */
  logout() {
    this.http.token = "";
    this.storage.remove('token');
  }
}
