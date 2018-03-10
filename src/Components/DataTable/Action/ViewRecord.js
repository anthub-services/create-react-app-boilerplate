import React, { Component } from 'react'
import ViewModal from '../../Modals/Default'

export default class ViewRecord extends Component {
  constructor(props) {
    super(props)

    this.state = { showModal: false }
  }

  handleToggleViewModal(resourceId=null) {
    this.setState({ showModal: !this.state.showModal })
  }

  handleOpenModal(e) {
    e.preventDefault()
    this.setState({ showModal: true })
  }

  render() {
    const props = this.props

    if (!props.showViewRecord) return null

    const resourceId = props.resource[props.resourceIdKey]

    return (
      <span>
        <ViewModal
          formOption={props.viewRecordOption}
          resource={props.resource}
          enableModal={props.showViewRecord}
          showModal={this.state.showModal}
          toggleModalHandler={this.handleToggleViewModal.bind(this)}
        />
        <a
          href={[props.path, resourceId].join('/')}
          className="datatable-actions-btn"
          onClick={this.handleOpenModal.bind(this)}
        >
          View
        </a>
      </span>
    )
  }
}
