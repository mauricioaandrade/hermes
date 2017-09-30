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

  addNewUserCar(data) {
    if (!this.carForm.valid) {
      const alert = this.alertCtrl.create({
        title: 'Erro',
        subTitle: 'Formulário não preenchido corretamente.',
        buttons: [
          {
            text: 'Ok'
          }
        ]
      });
      alert.present()
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
      alert.present()
    });
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

      this.carForm = formBuilder.group({
        marca: ['value', Validators.compose([Validators.required])],
        modelo: ['value', Validators.compose([Validators.required])],
        year: ['value', Validators.compose([Validators.required])],
        plate: ['value', Validators.compose([Validators.required])],
        smart_code: ['value', Validators.compose([Validators.required])]
      });
  }

  //ionic API http://ionicframework.com/docs/api/components/select/Select/#output-events
  onCarBrandSelectChange(selectedValue: any) {
    this.carsList = this.carsProvider.getCarsByBrand(this.car.marca)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewCarPage');
  }

}
