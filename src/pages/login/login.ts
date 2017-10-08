import { RegisterPage } from './../register/register';
import { User } from './../../models/user';
import { TabsPage } from './../tabs/tabs';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
// import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  user = {} as User;

  constructor(public navCtrl: NavController, public afAuth: AngularFireAuth, public alertCtrl: AlertController) {
    // console.log(this.afAuth.auth.currentUser);
    // this.user.email = "lpfw82@gmail.com"
    // this.user.password = "123456"
    this.afAuth.auth.onAuthStateChanged(user => {
      if(user) {
        console.log("aqui no onAuthStateChange", user)
        // this.navCtrl.push(TabsPage);
        // this.navCtrl.setRoot(TabsPage);
      }
    });
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

  logForm() {
    if (!this.user.email || !this.user.password) {
      return false;
    }

    var self = this
    this.afAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password)
      .then(authObj => {
        sessionStorage.setItem('token', authObj.refreshToken)
        this.navCtrl.push(TabsPage);
      })
      .catch(function(error) {
        console.error(error)
        var title = 'Erro ao logar'
        var subTitle = 'Verifique seu usuário e senha e tente novamente'

        if (error["code"] == 'auth/user-not-found') {
          subTitle = 'Usuário não cadastrado!'
        }

        const alert = self.alertCtrl.create({
          title: title,
          subTitle: subTitle,
          buttons: [
            {
              text: 'Ok'
            }
          ]
        });
        alert.present()
    })
  }

}
