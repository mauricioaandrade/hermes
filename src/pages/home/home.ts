import { LoginPage } from './../login/login';
import { AboutPage } from '../about/about';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';


import { ContactPage } from '../contact/contact';
import { RegisterPage } from '../register/register';
import { RegisterStep2Page } from '../register-step2/register-step2';

import firebase from 'firebase';
import { EventPage } from './../event/event';


// https://www.joshmorony.com/ionic-2-how-to-use-google-maps-geolocation-video-tutorial/
import { Geolocation } from '@ionic-native/geolocation';
import { NavParams } from 'ionic-angular/navigation/nav-params';

declare var google;
type cars = {
  lastLocation: {
    Latitude?: Number;
    Longitude?: Number;
  },
  marca: String;
  modelo: String;
  plate: String;
  smatCode: String;
  year: Number;
}

type lastPosition = {
  Latitude?: any;
  Longitude?: any;
}

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
  user: any;
  latlng: any[];

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  public carros = {};
  public carrosLatLng: {
    Latitude?: String,
    Longitude?: String
  };


  constructor(
    public db: AngularFireDatabase,
    public navCtrl: NavController,
    public geolocation: Geolocation,
    public afAuth: AngularFireAuth) {

    this.items = db.list('/events')


    this.items = db.list('/events'),
      this.user = new NavParams('user'),
      console.log(this.user.data)

  }




  // loadMap() {
  //   ionViewDidLoad() {

  //     const userCarsRef: firebase.database.Reference = firebase.database().ref('/users/-KvxTcAMpIGVswyOe95u/');
  //     userCarsRef.on('value', usercarSnapshot => {
  //       this.carros = usercarSnapshot.child('cars').toJSON();
  //       let carTeste = this.carros;

  //       Object.keys((carTeste) as cars).map((positionCar) => {
  //         // console.log(carTeste[positionCar].lastLocation);
  //         // let lat = carTeste[positionCar].lastLocation.Latitude;
  //         // let lng = carTeste[positionCar].lastLocation.Longitude;
  //       });
  //       // this.loadMap(carTeste);
  //       this.loadMap(carTeste);
  //     });

  //     const personRef: firebase.database.Reference = firebase.database().ref('/users/-KvxTcAMpIGVswyOe95u/cars/');
  //     personRef.on('value', carSnapshot => {
  //       this.carrosLatLng = carSnapshot.child('centopeiaHumana/lastLocation').toJSON();
  //       // this.loadMap(JSON.stringify(this.carrosLatLng.Latitude), JSON.stringify(this.carrosLatLng.Longitude));
  //     });
  //   }


  //   loadMap(car) {
  //     let latLng = new google.maps.LatLng(-12.977547, -38.455398);
  //     let mapOptions = {
  //       center: latLng,
  //       zoom: 15,
  //       mapTypeId: google.maps.MapTypeId.ROADMAP
  //     }
  //     this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  //     this.addMarker(car);
  //   }

  //   addMarker(car) {
  //     Object.keys((car) as cars).map((positionCar) => {
  //       console.log(car[positionCar].lastLocation);
  //       let marker = new google.maps.Marker({
  //         map: this.map,
  //         animation: google.maps.Animation.DROP,
  //         position: this.map.getCenter()
  //       });

  //       let content = "<h4>My Car!</h4>";

  //       this.addInfoWindow(marker, JSON.stringify(car[positionCar].plate));
  //     }
  //     );


  //   }

  //   addInfoWindow(marker, content) {

  //     let infoWindow = new google.maps.InfoWindow({
  //       content: content
  //     });

  //     google.maps.event.addListener(marker, 'click', () => {
  //       infoWindow.open(this.map, marker);
  //     });

  //   }

  //   logOut() {
  //     this.afAuth.auth.signOut();
  //     this.navCtrl.setRoot(LoginPage);
  //   }

  //   deleteUser() {
  //     var u = this.afAuth.auth.currentUser;
  //     u.delete().then(() => this.navCtrl.setRoot(LoginPage));
  //   }

  // }
}