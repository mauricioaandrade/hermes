import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

/**
 * Generated class for the EventDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html',
})
export class EventDetailPage {

  eventId = '01'

  item: FirebaseObjectObservable<any>;
  constructor(db: AngularFireDatabase) {
    this.item = db.object('/events/' + this.eventId);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventDetailPage');
  }

}
