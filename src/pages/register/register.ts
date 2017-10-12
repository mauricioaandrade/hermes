import { AngularFireAuth } from 'angularfire2/auth';
import { User } from './../../models/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RegisterStep2Page } from '../register-step2/register-step2';


/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as User;
  registerForm: FormGroup
  attemptSubmit = false

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
  ) {
    // this.user.email = 'lpfw82@gmail.com'
    // this.user.password = '123456'
    // this.user.checkedPassword = '123456'
    // var user = this.afAuth.auth.currentUser;

    this.registerForm = formBuilder.group({
      checkedPassword: ['', Validators.compose([Validators.required, RegisterPage.isPasswordValid])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      email: ['', Validators.compose([Validators.required])]
    });
  }

  static isPasswordValid(formControl): any {
    //@TODO verificar se essa forma abaixo está correta
    if (formControl.value && formControl._parent && formControl._parent.controls.password.value == formControl.value) {
      return null
    }

    return {
      "Senhas não conferem": true
    }
  }

  async register(user: User) {
    
    this.attemptSubmit = true

    if (!this.registerForm.valid) {
      return false
    }

    var self = this

    const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
    .then(function (authData) {
      console.log("authData", authData)
      console.log("navCtrol", self.navCtrl)
      console.log("self", self)
      return authData
    })
    .catch(function (error) {
      var title = 'Erro ao cadastrar'
      var subTitle = ''
      console.log("erroaocadastrar", error)
      if (error['code'] == 'auth/email-already-in-use') {
        subTitle = 'Email já está sendo utilizado!'
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
    }); 
    
    if (result && result.uid) {
      this.navCtrl.setRoot(RegisterStep2Page)
    }    
  }

  isInvalid(field) {
    return !field.valid && this.attemptSubmit
  }

}
