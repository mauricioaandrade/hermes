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
  attemptSubmit = false
  lista: FirebaseListObservable<any[]>;
  carsList;
  carBrands;
  yearsList: number[];
  lastKeypress: number = 0;
  startAt = new Subject()
  endAt = new Subject()
  carForm: FormGroup
  car = {} as Car;
  user = {} as User;
  userKey = '';

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public db: AngularFireDatabase,
    private carsProvider: CarsProvider,
    private usersProvider: UsersProvider,
    public alertCtrl: AlertController,
    private afAuth: AngularFireAuth,
    public formBuilder: FormBuilder) {

      this.lista = this.carsProvider.getUserCars(1);
      this.carBrands = this.carsProvider.getCarBrands();

      this.yearsList = [];
      for (let i = (new Date().getFullYear() + 1); i >= 2000 ; i--) {
        this.yearsList.push(i)
      }

      // https://medium.com/@adsonrocha/como-criar-um-crud-com-ionic-2-firebase-ae715e8b64bb
      // https://www.joshmorony.com/building-a-crud-ionic-2-application-with-firebase-angularfire/
      // https://www.joshmorony.com/high-performance-list-filtering-in-ionic-2/
      // https://www.djamware.com/post/5855c96380aca7060f443065/ionic-2-firebase-crud-example-part-2
      // https://forum.ionicframework.com/t/how-to-validate-forms-with-angular-2-in-ionic-2/54687/8
      // https://www.joshmorony.com/advanced-forms-validation-in-ionic-2/
      this.carForm = formBuilder.group({
        marca: ['', Validators.compose([Validators.required])],
        modelo: ['', Validators.compose([Validators.required])],
        year: ['', Validators.compose([Validators.required])],
        plate: ['', Validators.compose([Validators.required, Validators.minLength(7), Validators.maxLength(7), NewCarPage.isPlateValid /*Validators.pattern("([a-zA-Z]{3}[0-9]{4}])")*/])],
        smart_code: ['', Validators.compose([Validators.required])]
      });

      var currentUser = this.usersProvider.findByUid(this.afAuth.auth.currentUser.uid);    
      currentUser.subscribe(users => (users.length) ? this.userKey = users[0]["$key"] : true);
  }

  static isPlateValid(formControl): any {
    if (!/([a-zA-Z]{3}\d{4})+/.test(formControl.value)) {
      return {
        "Placa no formato inválido" : true
      }
    }
    return null
  }

  addNewUserCar(data) {
    this.attemptSubmit = true
    if (!this.carForm.valid) {
      return false
    }

    var u = this.afAuth.auth.currentUser;
    if (!u.uid) {
      return false;
    }        

    if (!this.userKey) {
      return false;
    }    
        
    var retorno = this.usersProvider.addUserCar(this.userKey, data)

    if (data.smart_code) {
      this.usersProvider.insertUserKeyOnDevice(this.userKey, data.smart_code)
    }

    retorno.then(() => {
      this.carForm.reset()
      const alert = this.alertCtrl.create({
        title: 'Sucesso',
        subTitle: 'Carro cadastrado!',
        buttons: [
          {
            text: 'Ok'
          }
        ]
      });
      this.attemptSubmit = false
      alert.present()
    });
  }

  //ionic API http://ionicframework.com/docs/api/components/select/Select/#output-events
  onCarBrandSelectChange(selectedValue: any) {
    this.carsList = this.carsProvider.getCarsByBrand(this.car.marca)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewCarPage');
  }

  isInvalid(field) {
    return !field.valid && this.attemptSubmit
  }

}
