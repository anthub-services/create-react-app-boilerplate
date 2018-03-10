import React, { Component } from 'react'
import { Alert } from 'react-bootstrap'

export default class Basic extends Component {
  constructor(props) {
    super(props)

    this.state = {
      show: true
    }

    this.hideAlert = this.hideAlert.bind(this)
  }

  hideAlert() {
    this.setState({ show: false })
  }

  render() {
    if (this.props.processRequest)
      return (
        <AlertProcessRequest>
          {this.props.children ? this.props.children : <p>Processing request...</p> }
        </AlertProcessRequest>
      )

    if (this.props.processError)
      return (
        <AlertError>
          {this.props.children
            ? this.props.children
            : <p>Unable to process your request. Please check your internet connection. If problem persists, contact support.</p>
          }
        </AlertError>
      )

    if (this.props.formError)
      return (
        <AlertError>
          <p>Unable to process your request. Please check the form errors below.</p>
        </AlertError>
      )

    if (this.state.show)
      return this.props.hideDismissButton
        ? <Alert bsStyle={this.props.type}>{this.props.children}</Alert>
        : <Alert bsStyle={this.props.type} onDismiss={this.hideAlert}>{this.props.children}</Alert>

    return null
  }
}

const AlertProcessRequest = (props) => {
  return <Alert>{props.children}</Alert>
}

const AlertError = (props) => {
  return <Alert bsStyle="danger">{props.children}</Alert>
}
