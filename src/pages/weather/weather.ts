import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }
}
