import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewCarPage } from './new-car';

@NgModule({
  declarations: [
    NewCarPage,
  ],
  imports: [
    IonicPageModule.forChild(NewCarPage),
  ],
})
export class NewCarPageModule {}
