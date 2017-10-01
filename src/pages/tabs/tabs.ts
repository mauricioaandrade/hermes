import { NewCarPage } from './../new-car/new-car';
import { EventPage } from './../event/event';
import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';

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
