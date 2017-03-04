import { NgModule, ErrorHandler } from '@angular/core';
import { XHRBackend, RequestOptions } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Storage } from '@ionic/storage';

// Pages
import { LoginPage } from '../pages/login/login';
import { LogoutPage } from '../pages/logout/logout';
import { WeatherPage } from '../pages/weather/weather';
import { IndoorTempPage } from '../pages/weather/indoorTemp/indoorTemp';
import { OutdoorTempPage } from '../pages/weather/outdoorTemp/outdoorTemp';
import { PressurePage } from '../pages/weather/pressure/pressure';

// Providers
import { HttpService } from '../providers/technical/http-service';
import { AuthService } from '../providers/technical/auth-service';
import { UsersService } from '../providers/datas/users-service';
import { WeathersService } from '../providers/datas/weathers-service';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    WeatherPage,
    LogoutPage,
    IndoorTempPage,
    OutdoorTempPage,
    PressurePage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    WeatherPage,
    LogoutPage,
    IndoorTempPage,
    OutdoorTempPage,
    PressurePage
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    },
    Storage,
    {
      provide: HttpService,
      useFactory: (backend: XHRBackend, options: RequestOptions, storage: Storage) => {
        return new HttpService(backend, options, storage);
      },
      deps: [XHRBackend, RequestOptions, Storage]
    },
    AuthService,
    UsersService,
    WeathersService
  ]
})
export class AppModule {}
