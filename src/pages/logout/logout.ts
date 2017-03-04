import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { AuthService } from '../../providers/technical/auth-service';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-logout',
  template: ''
})
export class LogoutPage {

  constructor(public navCtrl: NavController, public authService: AuthService) {
    this.authService.logout();
    this.navCtrl.setRoot(LoginPage);
  }

}
