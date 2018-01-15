import React, { Component } from 'react';
import './stylesheets/styles.css';
import CakesPage from './pages/CakesPage';
import CakeForm from './components/CakeForm'
import AboutPage from './pages/AboutPage'
import AdminPage from './pages/AdminPage'
import GalleryPage from './pages/GalleryPage'
import ContactPage from './pages/ContactPage'
import ThanksPage from './pages/ThanksPage'
import * as cakesAPI from './api/cakes'
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'



export class App extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  componentDidMount() {
    cakesAPI.all()
      .then((cakes) => {
        this.setState({ cakes })
      })
  }

  handleCakeSubmission = (cake) => {
    this.setState(({ cakes }) => {
      return { cakes: [cake].concat(cakes) }
    });
    cakesAPI.save(cake);
  }

  render() {
    const { cakes } = this.state;
    return (
      <Router>
        <div>
          <div className="App">
            <Navbar color="faded" light expand="md">
              {/* <NavbarBrand href="/">LOGO</NavbarBrand> */}
              {/* <NavbarToggler onClick={this.toggle} /> */}
              {/* <Collapse isOpen={this.state.isOpen} navbar> */}
                <Nav>
                  <NavItem>
                    <NavLink href="/">Home</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/about">About</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/gallery">Gallery</NavLink>
                  </NavItem>
                  <NavItem>
                      <NavLink href="/contact">Contact</NavLink>
                  </NavItem>
                </Nav>
          {/* </Collapse> */}
         </Navbar>

            <Switch>
              <Route path='/about' component={AboutPage} />
              <Route path='/contact' component={ContactPage} />
              <Route path='/gallery' component={GalleryPage} />
              <Route path='/thanks' component={ThanksPage} />
              <Route path='/admin' render={
                () => (
                  <AdminPage cakes={cakes} />
                )} />
              <Route path='/' render={
                () => (
                  <CakeForm onSubmit={this.handleCakeSubmission} />
                )
              } />

            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
