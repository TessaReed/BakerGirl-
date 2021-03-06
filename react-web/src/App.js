import React, { Component } from 'react';
import {
  BrowserRouter as Router, Route, Link, Switch, Redirect
} from 'react-router-dom'


import './stylesheets/styles.css';
import CakeForm from './components/CakeForm'
import AboutPage from './pages/AboutPage'
import AdminPage from './pages/AdminPage'
import GalleryPage from './pages/GalleryPage'
import ContactPage from './pages/ContactPage'
import ThanksPage from './pages/ThanksPage'
import CakeButton from './components/CakeButton'
import SignInForm from './components/SignInForm'
import SignOutForm from './components/SignOutForm'
import * as cakesAPI from './api/cakes'
import * as auth from './api/auth'
import {
  NavLink
} from 'reactstrap';




export class App extends Component {
  state = { cakes: null }

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
  cakesAPI.save(cake);
  this.setState(({ cakes }) => (
    { cakes: [cake].concat(cakes) }
  ));
  }

  handleSignIn = (event) => {
  event.preventDefault()
  const form = event.target
  const elements = form.elements
  const email = elements.email.value
  const password = elements.password.value
  auth.signIn({ email, password })
    .then(() => {
      cakesAPI.all()
        .then(cakes => {
          this.setState({ cakes })
        })
    })
}

handleSignOut = () => {
  auth.signOut()
  this.setState({ cakes: null })
}



  render() {
    const { cakes } = this.state;

    return (
      <Router>
        <div>
          <div className="App">
            {/* NAVBAR */}
            <div color="faded" light="true" expand="md" className="top-navbar">
              <div className="top-nav">
                <div className="nav-item">
                  <NavLink href="/" className="link-text" >Home</NavLink>
                </div>
                <div className="nav-item">
                  <NavLink href="/about" className="link-text">About</NavLink>
                </div>
                <div className="nav-item">
                  <NavLink href="/gallery" className="link-text">Gallery</NavLink>
                </div>
                <div className="nav-item">
                    <NavLink href="/contact" className="link-text">Contact</NavLink>
                </div>
              </div>
            </div>

            {/* CALL TO ACTION */}
            <div color="faded" light="true" expand="md" className="pink-navbar">
              <div className="pink-nav">
                <div className="nav-item-pink">
                    <NavLink href="/CreateACake" className="link-text-black">Create&nbsp;Your&nbsp;Cake!</NavLink>
                </div>
              </div>
            </div>

            <Switch>
              <Route path='/about' component={AboutPage} />
              <Route path='/contact' component={ContactPage} />
              <Route path='/gallery' component={GalleryPage} />
              <Route path='/thanks' component={ThanksPage} />
              <Route path='/admin' render={
                () => (
                  <AdminPage token={ auth.token() } cakes={cakes} />
                )} />
              <Route path='/CreateACake' render={
                () => (
                  <CakeForm onSubmit={this.handleCakeSubmission} />
                )
              } />

            <Route path='/signin' render={() => (
                <div>
                  { auth.isSignedIn() && <Redirect to='/admin'/> }
                  <SignInForm onSignIn={ this.handleSignIn }/>
                </div>
              )}/>

              <Route path='/signout' render={() => (
                <SignOutForm onSignOut={ this.handleSignOut }/>
              )}/>

              <Route path='/' render={
                () => (
                  <CakeButton />
                )
              } />

            </Switch>
            <div color="faded" light="true" expand="md" className="footer text-center">
                  <Link to="/" className="link-text px-5" >© 2018 </Link>
                  <Link to="/signin" className="link-text px-5">Admin</Link>

                <span>  { auth.isSignedIn() && <Link to='/signout' className="link-text px-5">Sign Out</Link> } </span>

            </div>
          </div>
        </div>
      </Router>
    );
  }
}
