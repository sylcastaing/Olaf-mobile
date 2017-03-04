import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-indoorTemp',
  templateUrl: 'indoorTemp.html'
})
export class IndoorTempPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(navParams.data);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IndoorTempPage');
  }

}