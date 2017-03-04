import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { WeathersService } from '../../../providers/datas/weathers-service';

@Component({
  selector: 'page-pressure',
  templateUrl: 'pressure.html'
})
export class PressurePage {

  public pressure: any;

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