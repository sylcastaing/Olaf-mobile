import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { LoginPage } from '../pages/login/login';
import { WeatherPage } from '../pages/weather/weather';
import { LogoutPage } from '../pages/logout/logout';

import { Auth } from '../providers/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  private rootPage: any;

  private pages: Array<{title: string, component: any}>;

  private loading: any;


  constructor(public platform: Platform, public loadingCtrl: LoadingController, public authService : Auth) {
    this.initializeApp(platform);

    this.pages = [
      {
        title: 'Déconnexion',
        component: LogoutPage
      }
    ];

    this.showLoader();

    this.authService.checkAuthentification()
      .then(res => {
        this.loading.dismiss();
        this.rootPage = WeatherPage;
      }, err => {
        this.loading.dismiss();
        this.rootPage = LoginPage;
      });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  initializeApp(platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
      content: 'Connexion en cours...'
    });

    this.loading.present();
  }
}
