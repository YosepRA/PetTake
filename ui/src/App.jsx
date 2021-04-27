import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
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
} from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import './css/main.min.css';

import MainNavbar from './components/MainNavbar';
import Home from './components/Home';
import PetDetails from './components/PetDetails';
import Contact from './components/Contact';
import Footer from './components/Footer';

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
  faEnvelope,
);

export default function App() {
  return (
    <div>
      <Router>
        <MainNavbar />

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/pet/:id" component={PetDetails} />
          <Route path="/contact" component={Contact} />

          <Redirect to="/" />
        </Switch>

        <Footer />
      </Router>
    </div>
  );
}
