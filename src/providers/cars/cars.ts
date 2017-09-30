import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database'
/*
  Generated class for the CarsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CarsProvider {

  constructor(private db: AngularFireDatabase) {
    console.log('Hello CarsProvider Provider');
  }

  //https://firebase.google.com/docs/database/web/lists-of-data#sorting_and_filtering_data
  getCars(start, end): FirebaseListObservable<any> {
    return this.db.list('/all-cars', {
      query: {
        orderByChild: 'modelo',
        limitToFirst: 10,
        startAt: start,
        endAt: end
      }
    })
  }

  getCarBrands(): FirebaseListObservable<any> {
    return this.db.list('/car-brands', {
      query: {
        orderByChild: 'marca'
      }
    })
  }

  getCarsByBrand(brand) {
    return this.db.list('/all-cars', {
      query: {
        orderByChild: 'marca',
        equalTo: brand
      }
    })
  }

  getUserCars(userId) {
    return this.db.list('/cars')
  }

}
