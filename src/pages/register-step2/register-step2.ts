import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from './../../models/user';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseListObservable } from 'angularfire2/database';
import { UsersProvider } from '../../providers/users/users';
import { HomePage } from '../home/home';
import { FCM } from '@ionic-native/fcm';

/**
 * Generated class for the RegisterStep2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register-step2',
  templateUrl: 'register-step2.html',
})
export class RegisterStep2Page {
  attemptSubmit = false
  registerForm: FormGroup
  lista: FirebaseListObservable<any[]>;
  user = {} as User;

  userKey = '';
  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, private afAuth: AngularFireAuth, 
    private usersProvider: UsersProvider,
    private fcm: FCM
  ) {
    fcm.getToken().then(token=>{
      if (token) {
        if (!this.user.pushNotificationTokens) {
          this.user['pushNotificationTokens'] = [token];
        } else {
          if (this.user.pushNotificationTokens && this.user.pushNotificationTokens.indexOf(token) === -1) {
            this.user.pushNotificationTokens.push(token);
          }
        }
      }
    });
    
    this.registerForm = formBuilder.group({
      fullname: ['', Validators.compose([Validators.required])],
      phone: ['', Validators.compose([Validators.required])],
      cpf: ['', Validators.compose([Validators.required])],
      cnh: ['', Validators.compose([Validators.required])],
      emergencyPhone1: ['', Validators.compose([Validators.required])],
      emergencyPhone2: ['', Validators.compose([Validators.required])],
      emergencyPhone3: ['', Validators.compose([Validators.required])]
    });

    var currentUser = this.usersProvider.findByUid(this.afAuth.auth.currentUser.uid);    
    currentUser.subscribe(users => (users.length) ? this.userKey = users[0]["$key"] : true);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterStep2Page');
  }

  register(user: User) {
    this.attemptSubmit = true
    var u = this.afAuth.auth.currentUser;
    if (!u.uid) {
      return false;
    }        

    if (!this.registerForm  .valid) {
      return false
    }

    user.uid = u.uid;
    
    var retornoInsertUpdate;

    //update
    if (this.userKey) {
      retornoInsertUpdate = this.usersProvider.updateUser(this.userKey, user).then(function (retorno) {
        return retorno
      })
    } else {
      //insert
      retornoInsertUpdate = this.usersProvider.addUser(user).then(function (retorno) {
        return retorno
      })
    }
    console.log("retorno ins upd", retornoInsertUpdate);
    if (retornoInsertUpdate) {
      this.navCtrl.setRoot(HomePage);
    }
  }

  isInvalid(field) {
    return !field.valid && this.attemptSubmit
  }

}
