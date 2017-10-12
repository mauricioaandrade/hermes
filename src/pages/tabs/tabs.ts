import { NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from './../../models/user';
import { NewCarPage } from './../new-car/new-car';
import { EventPage } from './../event/event';
import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';
import { RegisterStep2Page } from '../register-step2/register-step2';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  // tab3Root = ContactPage;
  tab4Root = EventPage;
  // tab5Root = LoginPage;
  tab6Root = NewCarPage;

  constructor(public navCtrl: NavController, public afAuth: AngularFireAuth) {

    // let user = this.afAuth.auth.currentUser
    // user ? console.log(user) : this.navCtrl.setRoot(LoginPage);

    this.afAuth.auth.onAuthStateChanged(user => {
      if(!user) {
        this.navCtrl.setRoot(LoginPage);
      }
      // if (user) {
      //   localStorage.setItem('token', user.refreshToken);
      // } else {
      //   localStorage.clear();
      //   console.log(localStorage.getItem('token'));
      // }
    });
  }
}
