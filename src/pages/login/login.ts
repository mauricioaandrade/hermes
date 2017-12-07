import { RegisterPage } from './../register/register';
import { User } from './../../models/user';
import { TabsPage } from './../tabs/tabs';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { FCM } from '@ionic-native/fcm';
import { UsersProvider } from '../../providers/users/users';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  user = {} as User;

  constructor(public navCtrl: NavController, public afAuth: AngularFireAuth, public alertCtrl: AlertController,
    private fcm: FCM,
    private usersProvider: UsersProvider) {
    // this.afAuth.auth.onAuthStateChanged(user => {
    //   if (user) {
    //     localStorage.setItem('token', user.refreshToken);
    //   } else {
    //     localStorage.clear();
    //     console.log(localStorage.getItem('token'));
    //   }
    // });
  }

  logOut() {
    this.afAuth.auth
      .signOut()
      .then(_ => {
        this.navCtrl.setRoot(LoginPage);
      })
      .catch(error => console.error(error));
  }

  register() { this.navCtrl.push(RegisterPage); }

  logForm() {
    if (!this.user.email || !this.user.password) {
      return false;
    }

    var self = this
    this.afAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password)
      .then(_ => {        
        var currentUser = this.usersProvider.findByUid(this.afAuth.auth.currentUser.uid);
        if (!this.afAuth.auth.currentUser.emailVerified){
          console.log("email não verificado");
          const verificationError = new Error('Verifique seu email através do link enviado!');
          verificationError["code"] = 'email-not-verified';  
          return Promise.reject(verificationError);
        }
        currentUser.subscribe(
          users => {
            var userUpd = users[0]
            var userKey = userUpd["$key"]

            if (!userKey) {
              return
            }

            this.fcm.getToken().then(token=>{
              if (token) {
                if (!userUpd.pushNotificationTokens) {
                  userUpd['pushNotificationTokens'] = [token];
                } else {
                  if (userUpd.pushNotificationTokens && userUpd.pushNotificationTokens.indexOf(token) === -1) {
                    userUpd.pushNotificationTokens.push(token);
                  }
                }
                this.usersProvider.updateUser(userKey, userUpd)
              }
            });
            
            this.navCtrl.push(TabsPage)
          }
        
        );        
      })
      .catch(error => {
        console.error(error)
        var title = 'Erro ao logar'
        var subTitle = 'Verifique seu usuário e senha e tente novamente'

        if (error["code"] == 'auth/user-not-found') {
          subTitle = 'Usuário não cadastrado!'
        }
        if (error["code"] == 'email-not-verified') {
          subTitle = error.message;
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

  displayTabBar(display) {
    let elements = document.querySelectorAll(".tabbar");
    
    if (elements != null) {
      Object.keys(elements).map((key) => {
        elements[key].style.display = display;
      });
    }
  }

  ionViewWillEnter() {
    this.displayTabBar('none');
  }

  ionViewWillLeave() {
    this.displayTabBar('flex');
  }
}