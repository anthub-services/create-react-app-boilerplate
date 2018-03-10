import React, { Component } from 'react'
import Form from 'react-jsonschema-form'
import _ from 'lodash'
import { Button } from 'react-bootstrap'

export default class ColumnFilters extends Component {
  constructor(props) {
    super(props)

    this.state = {
      formData: {},
      initialised: true,
      buttonsDisabled: true
    }
    this.schema = {
      'type': 'object',
      'properties': this.props.filters
    }
    this.uiSchema = {
      'ui:rootFieldId': 'column_filters',
      'dateFrom': { 'ui:widget': 'date-time' },
      'dateTo': { 'ui:widget': 'date-time' }
    }
    this.formTO = 0
  }

  buttonsDisabled(filtered) {
    if (this.props.queryString !== '') return false

    return Object.keys(filtered).length === 0
  }

  setFilters() {
    let formData = _.clone(this.props.filtered)

    if (Object.keys(formData).length > 0) {
      for (const key in formData) {
        formData[key] = decodeURIComponent(formData[key])
      }
    }

    this.setState({
      formData,
      queryString: this.props.queryString,
      buttonsDisabled: this.buttonsDisabled(formData)
    })
  }

  handleOnChange({ formData }) {
    const disabled = this.buttonsDisabled(filteredData(formData))

    this.setState({
      formData,
      buttonsDisabled: disabled
    })
  }

  handleOnSubmit({ formData }) {
    this.setState({ formData, initialised: false })

    clearTimeout(this.formTO)

    this.formTO = setTimeout(() => {
      if (Object.keys(filteredData(this.state.formData)).length > 0)
        this.props.setStateHandler({
          filtered: filteredData(formData),
          page: 0
        })
      else {
        this.setState({ buttonsDisabled: true })
        this.handleResetFilters()
      }

      setTimeout(() => { this.setState({ initialised: true }) }, 100)
    }, 100)
  }

  handleResetFilters() {
    this.props.setStateHandler({ filtered: {}, page: 0 })
  }

  componentWillReceiveProps() {
    if (this.state.initialised) this.setFilters()
  }

  componentDidMount() {
    this.setFilters()
  }

  render() {
    if (!this.props.filters) return null

    return (
      <div className="column-filters">
        <Form
          autocomplete="off"
          formData={this.state.formData}
          schema={this.schema}
          uiSchema={this.uiSchema}
          onChange={this.handleOnChange.bind(this)}
          onSubmit={this.handleOnSubmit.bind(this)}
        >
          <div className="form-group column-filters-buttons">
            <Button
              type="button"
              bsStyle="default"
              disabled={this.state.buttonsDisabled}
              onClick={this.handleResetFilters.bind(this)}
            >
              Reset Filters
            </Button>
            <Button
              type="submit"
              bsStyle="primary"
              disabled={this.state.buttonsDisabled}
            >
              Filter Records
            </Button>
          </div>
        </Form>
      </div>
    )
  }
}

function filteredData(formData) {
  return _.pickBy(formData, _.identity)
}
