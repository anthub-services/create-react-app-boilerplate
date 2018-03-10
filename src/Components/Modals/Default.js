import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'

export default class Default extends Component {
  render() {
    const props = this.props

    if (!props.enableModal) return null

    const { title, component } = props.formOption
    const ModalContent = component

    return (
      <Modal show={props.showModal} onHide={props.toggleModalHandler}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <ModalContent {...props} isModal />
      </Modal>
    )
  }
}
