import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Navbar } from 'react-bootstrap'
import { NavLink } from '../../../Lib/Common/Views'
import SignOutButton from '../../../Redux/Containers/Sessions/SignOutButton'
import ReactLogo from '../../../Assets/Images/react-logo.svg'

class Header extends Component {
  render() {
    const referrer = window.location.pathname

    return (
      <header className="header">
        <Navbar inverse className="navbar-fixed-top">
          <Navbar.Header>
            <Link to="/admin/dashboard" className="navbar-brand">
              <img src={ReactLogo} className="navbar-brand-logo" alt="React Logo" />
              <span className="text">Admin</span>
            </Link>
            <Navbar.Toggle id="js-navbar-toggle-btn" />
          </Navbar.Header>
          <Navbar.Collapse>
            <ul className="navbar-nav nav navbar-right">
              <NavLink title="Home" to="/" />
              <NavLink title="Redux" to="/redux" />
              <SignOutButton referrer={referrer} />
            </ul>
          </Navbar.Collapse>
        </Navbar>
      </header>
    )
  }
}

export default withRouter(Header)
