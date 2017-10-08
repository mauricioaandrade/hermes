import { RegisterPage } from './../register/register';
import { User } from './../../models/user';
import { TabsPage } from './../tabs/tabs';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
// import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  user = {} as User;

  logForm() {
    if (!this.user.email || !this.user.password) {
      return false;
    }
    
    this.afAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password)
      .then(authObj => {
        sessionStorage.setItem('token', authObj.refreshToken)
        this.navCtrl.push(TabsPage);
      })
      .catch(error  => console.error(error));
  }

  logOut() {
    this.afAuth.auth.signOut()
      .then(() => {
        sessionStorage.removeItem('token');
        this.navCtrl.push(LoginPage);
      })
      .catch(error => console.error(error));
  }

  register() {
    this.navCtrl.push(RegisterPage);
  }

  constructor(public navCtrl: NavController, public afAuth: AngularFireAuth) {
    // console.log(this.afAuth.auth.currentUser);
    this.afAuth.auth.onAuthStateChanged(user => {
      if(user) {
        this.navCtrl.push(TabsPage);
      }
    });
  }

}
