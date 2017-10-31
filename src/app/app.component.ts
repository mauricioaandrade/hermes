import { TabsPage } from './../pages/tabs/tabs';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from './../pages/login/login';
import { FCM } from '@ionic-native/fcm';
import { AngularFireAuth } from 'angularfire2/auth';
import { UsersProvider } from '../providers/users/users';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private fcm: FCM,
    private afAuth: AngularFireAuth,
    private usersProvider: UsersProvider
  ) {
    platform.ready().then(() => {
      // https://ionicframework.com/docs/api/platform/Platform/
      statusBar.styleDefault();
      splashScreen.hide();
      
      if (platform.is('ios') || platform.is('android')) {

        fcm.onNotification().subscribe(data=>{
          //@TODO receber feedback do pessoal para saber como vão ser exibidas as notificações
          if (data.wasTapped) {
            alert( JSON.stringify(data) );
          } else {
            alert( JSON.stringify(data) );
          }
        })

        //Note that this callback will be fired everytime a new token is generated, including the first time.
        fcm.onTokenRefresh().subscribe(token=>{            
          var u = this.afAuth.auth.currentUser;
          if (!u.uid) {
            return false;
          }
          this.usersProvider.insertPushNotificationToken(u.uid, token);
        });
      }
    });
  }
}
