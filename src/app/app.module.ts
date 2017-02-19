import { NgModule, ErrorHandler } from '@angular/core';
import { Http, XHRBackend, RequestOptions } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Storage } from '@ionic/storage';

// Pages
import { LoginPage } from '../pages/login/login';
import { LogoutPage } from '../pages/logout/logout';
import { WeatherPage } from '../pages/weather/weather';

// Providers
import { HttpService } from '../providers/http-service';
import { Auth } from '../providers/auth';
import { User } from '../providers/user';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    WeatherPage,
    LogoutPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    WeatherPage,
    LogoutPage
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    },
    {
      provide: HttpService,
      useFactory: (backend: XHRBackend, options: RequestOptions) => {
        return new HttpService(backend, options);
      },
      deps: [XHRBackend, RequestOptions]
    },
    Storage,
    Auth,
    User,
  ]
})
export class AppModule {}
