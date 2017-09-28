import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  car = {
    manufacturer: '',
    model: '',
    year: '',
    plate: ''
  }

  logForm(data) {
    console.log(this.car);
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewCarPage');
  }

}
