import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

/**
 * Generated class for the NewCarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-car',
  templateUrl: 'new-car.html',
})
export class NewCarPage {
  lista: FirebaseListObservable<any[]>;
  car = {
    manufacturer: '',
    model: '',
    year: '',
    plate: ''
  }

  logForm(data) {
    this.lista.push(this.car).then(() => {
    });
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase) {
    this.lista = db.list('/cars')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewCarPage');
  }

}
