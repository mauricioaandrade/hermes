import { TabsPage } from './../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Nav, Platform } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { FCM } from '@ionic-native/fcm';
import { AngularFireAuth } from 'angularfire2/auth';
import { UsersProvider } from './../providers/users/users';
import { HomePage } from './../pages/home/home';
import { AboutPage } from './../pages/about/about';
import { NewCarPage } from '../pages/new-car/new-car';
import { Car } from './../models/car';
import { User } from './../models/user';
import { CarsProvider } from './../providers/cars/cars';
import { ContactPage } from '../pages/contact/contact';
import { LoginPage } from '../pages/login/login';
import { EventPage } from '../pages/event/event';
import { RegisterPage } from '../pages/register/register';
import { RegisterStep2Page } from '../pages/register-step2/register-step2';
import { Component, ViewChild } from '@angular/core';
import { AlertController } from 'ionic-angular';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any = HomePage;
  pages: Array<{ title: string, component: any, icon: string }>;

  @ViewChild(Nav) nav: Nav;

  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private fcm: FCM,
    private afAuth: AngularFireAuth,
    public Alert: AlertController,

    private usersProvider: UsersProvider

  ) {
    platform.ready().then(() => {
      // https://ionicframework.com/docs/api/platform/Platform/
      statusBar.styleDefault();
      splashScreen.hide();
      // used for an example of ngFor and navigation


      this.pages = [
        //{ title: 'Pagina inicial', component: HomePage,icon:'home'},
        //{ title: 'Sobre', component: AboutPage,icon:'book'},
        //{ title: 'Registrar', component: RegisterPage,icon:'cog'},
        //{ title: 'Novo Carro', component: NewCarPage,icon:'car'},
        //{ title: 'Inserir código Smart',icon:'lock'},
        { title: 'Historico', component: EventPage, icon: 'book' },
        //{ title: 'Pagamento',icon:'cash'},
        //{ title: 'Fale Conosco',icon:'people'}

      ];

      if (platform.is('ios') || platform.is('android')) {

        fcm.onNotification().subscribe(data => {
          //@TODO receber feedback do pessoal para saber como vão ser exibidas as notificações
          if (data.wasTapped) {
            alert(JSON.stringify(data));
          } else {
            alert(JSON.stringify(data));
          }
        })

        //Note that this callback will be fired everytime a new token is generated, including the first time.
        fcm.onTokenRefresh().subscribe(token => {
          var u = this.afAuth.auth.currentUser;
          if (!u.uid) {
            return false;
          }
          this.usersProvider.insertPushNotificationToken(u.uid, token);
        });
      }
    });


  }

  doPrompt() {
    let alert = this.Alert.create({
      title: 'INSIRA SEU CÓDIGO SMART',

      inputs: [
        {
          name: 'Smart Code',
          placeholder: 'Ex:00000001'
        },
      ],
      buttons: [
        {
          text: 'CANCELAR',
          handler: (data: any) => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'OK',
          handler: (data: any) => {
            console.log('Saved clicked');
          }
        }
      ]
    });

    alert.present();
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(page.component);
  }
}