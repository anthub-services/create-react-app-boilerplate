import React, { Component } from 'react'
import ModalDefault from '../../Modals/Default'

export default class EditRecord extends Component {
  constructor(props) {
    super(props)

    this.state = { showModal: false }
  }

  handleToggleFormModal() {
    this.setState({ showModal: !this.state.showModal })
  }

  handleOpenModal(e) {
    e.preventDefault()
    this.setState({ showModal: true })
  }

  render() {
    const props = this.props

    if (!props.showEditRecord) return null

    const resourceId = props.resource[props.resourceIdKey]

    return (
      <span>
        <ModalDefault
          formOption={props.editFormOption}
          resource={props.resource}
          enableModal={props.showEditRecord}
          showModal={this.state.showModal}
          onSuccess={props.onSuccess}
          toggleModalHandler={this.handleToggleFormModal.bind(this)}
        />
        <a
          href={[props.path, resourceId, 'edit'].join('/')}
          className="datatable-actions-btn"
          onClick={this.handleOpenModal.bind(this)}
        >
          Edit
        </a>
      </span>
    )
  }
}
