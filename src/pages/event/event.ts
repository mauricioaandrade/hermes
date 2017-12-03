import { EventDetailPage } from './../event-detail/event-detail';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { UsersProvider } from '../../providers/users/users';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the EventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event',
  templateUrl: 'event.html',
})
export class EventPage {
  items: FirebaseListObservable<any[]>;
  cars: FirebaseListObservable<any[]>;
  userCars: Array<object>;
  selected_smart_code: string;

  constructor(
    public db: AngularFireDatabase,
    public navCtrl: NavController,
    private usersProvider: UsersProvider,
    private afAuth: AngularFireAuth,
  ) {
    this.afAuth.auth.onAuthStateChanged(user => {
      var currentUser = this.usersProvider.findByUid(this.afAuth.auth.currentUser.uid);
      currentUser.subscribe(
        (users) => {
          if (!users.length) {
            return;
          }

          let userCars = users[0]['cars'];

          if (!userCars) {
            return;
          }

          this.userCars = Object.keys(userCars).map(function(userCar) {
            return {
              smart_code: userCars[userCar]['smart_code'],
              plate: userCars[userCar]['plate']
            };
          });

          if (this.userCars && this.userCars.length) {
            this.selected_smart_code = this.userCars[0]['smart_code'];
            this.onSmartCodeSelected(this.userCars[0]['smart_code']);
          }
        }
      );
    });
  }

  push(key, latitude, longitude) {
    this.navCtrl.push(EventDetailPage, {eventId: key, latitude: latitude, longitude: longitude});
  }

  onSmartCodeSelected(selectedValue: any) {
    this.items = this.db.list('/events', {
      query: {
        orderByChild: 'smart_code',
        equalTo: selectedValue,
      }
    });

    // this.items.map(products => products.map(product => product.$key)).subscribe(
    //   (keys) => {
    //     console.log('keys are', keys)
    //     this.items.forEach(eachObj => {
    //       console.log(eachObj);
    //     });
    //   }
    // );
  }

}
