import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { WeathersService } from '../../../providers/datas/weathers-service';

@Component({
  selector: 'page-outdoorTemp',
  templateUrl: 'temperature.html'
})
export class OutdoorTempPage {

  public temperature: any;
  public extreme: any;

  /**
   * Creates an instance of OutdoorTempPage.
   * @param {NavController} navCtrl 
   * @param {NavParams} navParams 
   * @param {WeathersService} weathersService 
   * 
   * @memberOf OutdoorTempPage
   */
  constructor(public navCtrl: NavController, public navParams: NavParams, public weathersService: WeathersService) {
    this.weathersService.getLastOutdoorTemp()
      .subscribe(data =>  {
        this.temperature = data
      });
    
    this.weathersService.getUpdates('weather')
      .subscribe(data => {
        if (data.type === 'outdoorTemp') {
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

    this.weathersService.getExtremeOutdoorTemp()
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