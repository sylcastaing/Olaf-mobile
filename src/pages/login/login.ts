import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuController, NavController, LoadingController } from 'ionic-angular';

import { WeatherPage } from '../weather/weather';

import { AuthService } from '../../providers/technical/auth-service';
import { HttpService } from '../../providers/technical/http-service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  public loading: any;
  public loginForm: FormGroup;

  public loginError: String;

  constructor(public menu: MenuController, public navCtrl: NavController, public loadingCtrl: LoadingController, public authService: AuthService, public http: HttpService, public formBuilder: FormBuilder) {
    this.loginForm = formBuilder.group({
      server: [this.http.apiUrl, Validators.required],
      email: ['', Validators.compose([Validators.pattern('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$'), Validators.required])],
      password: ['', Validators.required]
    });

    this.menu.enable(false);
  }

  login() {
    this.showLoader();
    this.loginError = '';
    this.authService.login(this.loginForm.value)
      .then(result => {
        this.loading.dismiss();
        this.menu.enable(true);
        this.navCtrl.setRoot(WeatherPage);
      }, err => {
        if (err.message && err.message !== 'timeout') {
          this.loginError = err.message;
        }
        else {
          this.loginError = 'Impossible de se connecter au serveur. Veuillez vérifier l\'URL d\'accès.';
        }
        
        this.loading.dismiss();
      });
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
      content: 'Connexion en cours...'
    });

    this.loading.present();
  }
}
