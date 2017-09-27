import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
// import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // items: FirebaseListObservable<any[]>;
  todo = {}
  logForm() {
    this.afAuth.auth.signInWithEmailAndPassword(this.todo.email, this.todo.password)
      .then(authObj => sessionStorage.setItem('token', authObj.refreshToken))
      .catch(error  => console.error(error));
  }

  logOut() {
    this.afAuth.auth.signOut()
      .then(() => sessionStorage.removeItem('token'))
      .catch(error => console.error(error));
  }


  constructor(public navCtrl: NavController, public afAuth: AngularFireAuth) {
    this.afAuth.auth.onAuthStateChanged(user => console.log(user));
  }

}
