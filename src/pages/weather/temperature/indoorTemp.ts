import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { WeathersService } from '../../../providers/datas/weathers-service';

@Component({
  selector: 'page-indoorTemp',
  templateUrl: 'temperature.html'
})
export class IndoorTempPage {

  public temperature: any;
  public extreme: any;
  /**
   * Creates an instance of IndoorTempPage.
   * @param {NavController} navCtrl 
   * @param {NavParams} navParams 
   * @param {WeathersService} weathersService 
   * 
   * @memberOf IndoorTempPage
   */
  constructor(public navCtrl: NavController, public navParams: NavParams, public weathersService: WeathersService) {
    this.weathersService.getLastIndoorTemp()
      .subscribe(data => {
        this.temperature = data
      });

    this.weathersService.getUpdates('weather')
      .subscribe(data => {
        if (data.type === 'indoorTemp') {
          this.temperature = data;

          if (this.temperature.value < this.extreme.min.value) {
            this.extreme.min.value = this.temperature.value;
            this.extreme.min.date = new Date();
          }

          if (this.temperature.value > this.extreme.max.value) {
            this.extreme.max.value = this.temperature.value;
            this.extreme.max.date = new Date();
          }
        }
      });

    this.weathersService.getExtremeIndoorTemp()
      .subscribe(data => {
        this.extreme = data;
      });
  }

  /**
   * Retour formattedTemperature
   * 
   * @readonly
   * 
   * @memberOf IndoorTempPage
   */
  get formattedTemperature() {
    var retour = "";

    if (this.temperature !== undefined && this.temperature.value !== undefined) {
      retour = this.temperature.value.toString() + '°C';
    }

    return retour;
  }
}