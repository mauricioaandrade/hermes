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

  updateUser(userKey, data) {
    var updates = {}
    updates['/users/' + userKey] = data;
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
