import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-logout',
  template: ''
})
export class LogoutPage {

  constructor(public navCtrl: NavController, public authService: Auth) {
    this.authService.logout();
    this.navCtrl.setRoot(LoginPage);
  }

}
