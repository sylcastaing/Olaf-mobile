import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { WeathersService } from '../../../providers/datas/weathers-service';

@Component({
  selector: 'page-outdoorTemp',
  templateUrl: 'outdoorTemp.html'
})
export class OutdoorTempPage {

    public temperature: any;

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