import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';

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

import ScrollToTop from './components/ScrollToTop';
import MainNavbar from './components/MainNavbar';
import DemoAlert from './components/DemoAlert';
import Home from './components/Home';
import PetDetails from './components/PetDetails';
import Contact from './components/Contact';
import Footer from './components/Footer';
import UserSwitch from './components/user/UserSwitch';
import Login from './components/Login';
import Register from './components/Register';
import actionCreator from './components/store/actionCreator';
import DataSource from './components/store/DataSource';

const { REACT_APP_IS_DEMO } = process.env;
const isDemo = REACT_APP_IS_DEMO === 'true';

const dataSource = new DataSource();

const mapDispatchToProps = {
  setAuthenticate: actionCreator.setAuthenticate,
};

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

class App extends Component {
  async componentDidMount() {
    const { setAuthenticate } = this.props;

    const result = await dataSource.getData('/user');
    if (result.success) {
      setAuthenticate(true, result.user);
    }
  }

  render() {
    return (
      <div>
        <Router>
          <ScrollToTop />

          <MainNavbar />

          {isDemo && <DemoAlert />}

          <Switch>
            <Route path="/home/:page" component={Home} />
            <Route path="/pet/:id" component={PetDetails} />
            <Route path="/contact" component={Contact} />
            <Route path="/login" component={Login} />

            {!isDemo && <Route path="/register" component={Register} />}

            <Route path="/user" component={UserSwitch} />

            <Redirect from="/home" to="/home/1" />
            <Redirect to="/home/1" />
          </Switch>

          <Footer />
        </Router>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(App);
