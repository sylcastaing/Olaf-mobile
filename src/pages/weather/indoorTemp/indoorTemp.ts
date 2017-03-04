import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { WeathersService } from '../../../providers/datas/weathers-service';

@Component({
  selector: 'page-indoorTemp',
  templateUrl: 'indoorTemp.html'
})
export class IndoorTempPage {

  public temperature: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public weathersService: WeathersService) {
    this.weathersService.getLastIndoorTemp()
      .subscribe(data =>  {
        console.log(data);
        this.temperature = data
      });
  }
}