import { Component} from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { CarsProvider } from '../../providers/cars/cars';
import { UsersProvider } from '../../providers/users/users';
import { Subject } from 'rxjs/Subject';
import { AngularFireAuth } from 'angularfire2/auth';
import { Car } from './../../models/car';
import { User } from './../../models/user';




var database = firebase.database();
var userSearch = firebase.database().ref('posts/' + postId + '/starCount');
userSearch.on('value', function(snapshot) {
  updateUser(postElement, snapshot.val());
});