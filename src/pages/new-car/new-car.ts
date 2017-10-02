import { Component} from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { CarsProvider } from '../../providers/cars/cars';
import { Subject } from 'rxjs/Subject'

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
  car = {
    marca: '',
    modelo: '',
    year: '',
    plate: '',
    smart_code: ''
  }

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public db: AngularFireDatabase,
    private carsProvider: CarsProvider,
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder) {

      this.lista = this.carsProvider.getUserCars(1);
      this.carBrands = this.carsProvider.getCarBrands();

      this.yearsList = [];
      for (let i = (new Date().getFullYear() + 1); i >= 2000 ; i--) {
        this.yearsList.push(i)
      }

      //https://forum.ionicframework.com/t/how-to-validate-forms-with-angular-2-in-ionic-2/54687/8
      //https://www.joshmorony.com/advanced-forms-validation-in-ionic-2/
      this.carForm = formBuilder.group({
        marca: ['value', Validators.compose([Validators.required])],
        modelo: ['value', Validators.compose([Validators.required])],
        year: ['value', Validators.compose([Validators.required])],
      plate: ['value', Validators.compose([Validators.required, Validators.minLength(7), Validators.maxLength(7), NewCarPage.isPlateValid /*Validators.pattern("([a-zA-Z]{3}[0-9]{4}])")*/])],
        smart_code: ['value', Validators.compose([Validators.required])]
      });
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

    this.lista.push(this.car).then(() => {
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
