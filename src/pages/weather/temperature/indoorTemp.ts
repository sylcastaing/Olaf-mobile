import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { WeathersService } from '../../../providers/datas/weathers-service';

@Component({
  selector: 'page-indoorTemp',
  templateUrl: 'temperature.html'
})
export class IndoorTempPage {

  public temperature: any;

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
      .subscribe(data =>  {
        this.temperature = data
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