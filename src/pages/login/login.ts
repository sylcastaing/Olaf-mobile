import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuController, NavController, LoadingController } from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { WeatherPage } from '../weather/weather';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  public loading: any;
  public loginForm: FormGroup;

  public loginError: String;

  constructor(public menu: MenuController, public navCtrl: NavController, public loadingCtrl: LoadingController, public authService: Auth, public formBuilder: FormBuilder) {
    this.loginForm = formBuilder.group({
      server: ['', Validators.required],
      email: ['', Validators.compose([Validators.pattern('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$'), Validators.required])],
      password: ['', Validators.required]
    });

    this.menu.enable(false);
  }

  login() {
    this.showLoader();

    this.authService.login({
      email: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value
    })
      .then(result => {
        this.loading.dismiss();
        this.menu.enable(true);
        this.navCtrl.setRoot(WeatherPage);
      }, err => {
        this.loginError = err.message;
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
