import { NewCarPage } from './../new-car/new-car';
import { EventPage } from './../event/event';
import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';
import { RegisterStep2Page } from '../register-step2/register-step2';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  // tab1Root = NewCarPage;
  tab2Root = AboutPage;
  // tab3Root = ContactPage;
  tab4Root = EventPage;
  tab5Root = LoginPage;
  tab6Root = NewCarPage;

  constructor() {

  }
}
