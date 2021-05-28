import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faPhone,
  faMapMarkerAlt,
  faBars,
  faTimes,
  faFilter,
  faSortAlphaDown,
  faChevronLeft,
  faChevronRight,
  faPlus,
  faEdit,
  faTrash,
  faCog,
  faCamera,
} from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import './css/main.min.css';

import store from './components/store/store';
import ScrollToTop from './components/ScrollToTop';
import MainNavbar from './components/MainNavbar';
import Home from './components/Home';
import PetDetails from './components/PetDetails';
import Contact from './components/Contact';
import Footer from './components/Footer';
import UserSwitch from './components/user/UserSwitch';
import PetForm from './components/user/PetForm';

// Fontawesome global library build up.
library.add(
  faPhone,
  faMapMarkerAlt,
  faBars,
  faTimes,
  faFilter,
  faSortAlphaDown,
  faChevronLeft,
  faChevronRight,
  faPlus,
  faEdit,
  faTrash,
  faCog,
  faCamera,
  faEnvelope,
);

export default function App() {
  return (
    <div>
      <Provider store={store}>
        <Router>
          <ScrollToTop />

          <MainNavbar />

          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/pet/:id" component={PetDetails} />
            <Route path="/contact" component={Contact} />

            <Redirect exact from="/user" to="/user/pet" />
            <Route path="/user/pet/:mode" component={PetForm} />
            <Route path="/user" component={UserSwitch} />

            <Redirect to="/" />
          </Switch>

          <Footer />
        </Router>
      </Provider>
    </div>
  );
}
