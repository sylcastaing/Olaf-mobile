import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { WeatherPage } from '../weather/weather';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  public credentials: any;
  public loading: any;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public authService: Auth) {
    this.credentials = {};
  }

  login() {
    this.showLoader();

    this.authService.login(this.credentials)
      .then(result => {
        console.log(result);
        this.loading.dismiss();
        this.navCtrl.setRoot(WeatherPage);
      }, err => {
        this.loading.dismiss();
        console.log(err);
      });
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
      content: 'Connexion en cours...'
    });

    this.loading.present();
  }
}
