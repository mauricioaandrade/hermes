import { Component, /*OnInit*/ } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
// import { CarsProvider } from '../../providers/cars/cars';
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
export class NewCarPage /*@TODO colocar uma busca textual no futuro implements OnInit*/ {
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

  logForm(data) {
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
    // private carsProvider: CarsProvider, @TODO colocar uma busca textual no futuro
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder) {
    
      this.lista = db.list('/cars')
      this.carBrands = this.db.list('/car-brands')
    
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
      console.log(this.yearsList)
  }

  //@TODO colocar uma busca textual no futuro
  // ngOnInit() {
  //   this.carsProvider
  //     .getCars(this.startAt, this.endAt)
  //     .subscribe(carsList => this.carsList = carsList) 
  // }
  //
  // search($event) {
  //   if ($event.timeStamp - this.lastKeypress > 200) {
  //     let q = $event.target.value
  //     this.startAt.next(q)
  //     this.endAt.next(q + "\uf8ff") //similar to like operator in sql
  //   }
  //   this.lastKeypress = $event.timeStamp
  // }

  //ionic API http://ionicframework.com/docs/api/components/select/Select/#output-events
  onCarBrandSelectChange(selectedValue: any) {
    this.carsList = this.db.list('/all-cars', {
      query: {
        orderByChild: 'marca',
        equalTo: this.car.marca
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewCarPage');
  }

}
