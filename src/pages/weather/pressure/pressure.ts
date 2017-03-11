import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { WeathersService } from '../../../providers/datas/weathers-service';

@Component({
  selector: 'page-pressure',
  templateUrl: 'pressure.html'
})
export class PressurePage {

  public pressure: any;
  public extreme: any;

  /**
   * Creates an instance of PressurePage.
   * @param {NavController} navCtrl 
   * @param {NavParams} navParams 
   * 
   * @memberOf PressurePage
   */
  constructor(public navCtrl: NavController, public navParams: NavParams, public weathersService: WeathersService) {
    this.weathersService.getLastPressure()
      .subscribe(data => {
        this.pressure = data
      });
    
    this.weathersService.getUpdates('pressure')
      .subscribe(data => {
        if (data.type === 'indoorTemp') {
          this.pressure = data;

          if (this.pressure.value < this.extreme.min.value) {
            this.extreme.min.value = this.pressure.value;
            this.extreme.min.date = new Date();
          }

          if (this.pressure.value > this.extreme.max.value) {
            this.extreme.max.value = this.pressure.value;
            this.extreme.max.date = new Date();
          }
        }
      });

    this.weathersService.getExtremePressure()
      .subscribe(data => {
        this.extreme = data;
      });
  }

  /**
   * formattedPressure
   * 
   * @readonly
   * 
   * @memberOf PressurePage
   */
  get formattedPressure() {
    var retour = "";

    if (this.pressure !== undefined && this.pressure.value !== undefined) {
      retour = this.pressure.value.toString() + ' hPa';
    }

    return retour;
  }
}