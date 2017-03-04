import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-outdoorTemp',
  templateUrl: 'outdoorTemp.html'
})
export class OutdoorTempPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad OutdoorTempPage');
  }

}