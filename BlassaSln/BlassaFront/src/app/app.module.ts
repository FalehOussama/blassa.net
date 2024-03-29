import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment.prod';
//import { NativeGeocoder, NativeGeocoderOriginal } from '@awesome-cordova-plugins/native-geocoder/ngx';
import { GooglePlus } from '@awesome-cordova-plugins/google-plus/ngx';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
//import { Sim } from '@ionic-native/sim/ngx';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { NgxPaginationModule } from 'ngx-pagination';

import { CommonModule } from '@angular/common';
import { ServiceWorkerModule } from '@angular/service-worker';

import { SocialLoginModule,SocialAuthServiceConfig, GoogleLoginProvider } from "@abacritt/angularx-social-login";
import { InviteComponent } from './components/invite/invite.component';

import { MaskitoModule } from '@maskito/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { SharedModule } from './components/shared.module';



const CLIENT_ID = "856756010084-gleml74i01flrj2gd64ckkmpfk2d8io4.apps.googleusercontent.com";
@NgModule({
  declarations: [AppComponent ],
  imports: [
    NgxPaginationModule,
    SharedModule,
    MaskitoModule,
    SocialLoginModule,
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    CommonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    HttpClientModule,
    FontAwesomeModule,
    NgxPaginationModule,
    FontAwesomeModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('856756010084-gleml74i01flrj2gd64ckkmpfk2d8io4.apps.googleusercontent.com'),
          },
        ],
      } as SocialAuthServiceConfig,
    },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    InviteComponent,
    //NativeGeocoder,
    GooglePlus,
    NativeStorage,
    AngularFireAuthModule,
    //Sim,
    CallNumber,
    AndroidPermissions,
    HttpClient
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  
	constructor(library: FaIconLibrary) { 
		library.addIconPacks(fas, fab, far);
	}

}
