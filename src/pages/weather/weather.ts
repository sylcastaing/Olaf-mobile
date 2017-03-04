import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { WeathersService } from '../../providers/datas/weathers-service';

import { IndoorTempPage } from './temperature/indoorTemp';
import { OutdoorTempPage } from './temperature/outdoorTemp';
import { PressurePage } from './pressure/pressure';

@Component({
  selector: 'page-weather',
  templateUrl: 'weather.html'
})
export class WeatherPage {

  public indoorTemp = IndoorTempPage;
  public outdoorTemp = OutdoorTempPage;
  public pressure = PressurePage;

  public weathers: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public weathersService: WeathersService) {
    var todayDate = new Date();
    var yesterdayDate = new Date().setDate(todayDate.getDate() - 1);

    this.weathersService.get(yesterdayDate, todayDate.getTime())
      .subscribe(weathers => this.weathers = weathers);
  }

  getLastIndoorTemp() {

  }

}
