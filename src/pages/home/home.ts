import { LoginPage } from './../login/login';
import {AboutPage} from '../about/about';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { ContactPage } from '../contact/contact';
import { RegisterPage } from '../register/register';
import { RegisterStep2Page } from '../register-step2/register-step2';

// https://www.joshmorony.com/ionic-2-how-to-use-google-maps-geolocation-video-tutorial/
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //tab1Root = HomePage;
  //tab1Root = AboutPage;
  //tab3Root = ContactPage;
  //tab4Root = EventPage;
  //tab5Root = LoginPage;
  //tab6Root = NewCarPage;

  items: FirebaseListObservable<any[]>;
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(
    public db: AngularFireDatabase,
    public navCtrl: NavController,
    public geolocation: Geolocation,
    public afAuth: AngularFireAuth) {
    this.items = db.list('/events')

  }

  ionViewDidLoad() {
    this.loadMap();
  }


  loadMap() {

    let latLng = new google.maps.LatLng('-12.9996200', '-38.5125946');
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }

  addMarker() {

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    let content = "<h4>Information!</h4>";

    this.addInfoWindow(marker, content);

  }

  addInfoWindow(marker, content) {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }

  logOut() {
    this.afAuth.auth.signOut();
    this.navCtrl.setRoot(LoginPage);
  }

  deleteUser() {
    var u = this.afAuth.auth.currentUser;
    u.delete().then(() => this.navCtrl.setRoot(LoginPage));      
  }

}
