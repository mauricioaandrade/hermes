import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFireDatabase } from 'angularfire2/database'

/*
  Generated class for the UsersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsersProvider {

  constructor(private db: AngularFireDatabase) {
    console.log('Hello UsersProvider Provider');
  }


  addUser(data) {
    this.db.database.ref().child('users').push(data)
  }

  // https://firebase.google.com/docs/database/web/read-and-write
  updateUser(userKey, data) {
    var updates = {}
    updates['/users/' + userKey] = data;
    return this.db.database.ref().update(updates);
  }

  addUserCar(userKey, data) {
    // @TODO verificar se realmente precisa inserir também no child cars
    var newCarKey = this.db.database.ref().child('cars').push().key;
    var updates = {}
    updates['/cars/' + newCarKey] = data;
    updates['/users/' +  userKey + '/cars/' + newCarKey] = data;
    return this.db.database.ref().update(updates);
  }

  findByUid(uid) {
    if (!uid) {
      return
    }
    return this.db.list('/users', {
      query: {
        orderByChild: 'uid',
        equalTo: uid,
        limitToFirst: 1
      }
    })
  }
}
