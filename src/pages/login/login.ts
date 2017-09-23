import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  items: FirebaseListObservable<any[]>;
  todo = {}
  logForm() {
    console.log(this.todo)
  }

  constructor(
    public db: AngularFireDatabase,
    public navCtrl: NavController,
  ) {
    this.items = db.list('/events')
  }

}
