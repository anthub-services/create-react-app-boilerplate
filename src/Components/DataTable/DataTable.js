import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import ReactTable from 'react-table'
import { Button } from 'react-bootstrap'
import axios from 'axios'
import Axios from '../../Lib/Common/Axios'
import { queryParams } from '../../Lib/Helpers/Routes'
import * as DataTableHelper from '../../Lib/Helpers/DataTable'
import Alert from '../../Components/Alert'
import ColumnFilters from './ColumnFilters'
import FormModal from '../Modals/Default'
import * as Session from '../../Lib/Helpers/Session'

import 'react-table/react-table.css'

const SHOW_FILTERS_STATE = { showFilters: true }
const HIDE_FILTERS_STATE = { showFilters: false }
const NewFormButton = DataTableHelper.NewFormButton

class DataTable extends Component {
  constructor(props) {
    super(props)

    const columns = DataTableHelper.initColumns(
      props,
      this.handleToggleNewFormModal.bind(this),
      this.handleRefreshData.bind(this),
    )

    this.state = {
      showNewFormModal: false,
      columns,
      data: [],
      filtered: {},
      resetFiltersBtnDisabled: true,
      page: 0,
      pages: 1,
      pageSize: 20,
      sorted: {},
      height: DataTableHelper.HEIGHT,
      loading: true,
      refreshData: false,
      axiosData: {},
      axiosCancelToken: null,
      error: false,
      ...HIDE_FILTERS_STATE
    }
    this.handleFetchDataTO = 0
  }

  handleRefreshData(state={}) {
    this.handleFetchData({ refreshData: true, ...state })
  }

  initData() {
    const { filtered } = DataTableHelper.parseQueryObjects()
    const resetFiltersBtnDisabled = Object.keys(filtered).length === 0

    this.handleFetchData({ filtered, resetFiltersBtnDisabled }, false)
  }

  retrieveFilters() {
    if (DataTableHelper.hasQuerySearch()) {
      this.setState(SHOW_FILTERS_STATE)

      const queryString = queryParams(DataTableHelper.parseQueryObjects(false))

      return this.props.saveQueryState({ queryString })
    }

    this.props.history.push([
      this.props.path,
      this.props.dataTableState.queryString
    ].join('?'))
  }

  saveFilters() {
    const queryString = queryParams(DataTableHelper.parseQueryObjects(false))

    if (queryString !== this.props.dataTableState.queryString)
      this.props.saveQueryState({ queryString })
  }

  setStateHandler(state, reset=false) {
    this.handleFetchData(state)
  }

  cancelPostRequest() {
    if (typeof(this.state.axiosCancelToken) === 'function')
      this.state.axiosCancelToken()
  }

  handleFetchData(state, historyPush=true) {
    this.setState({ ...state, loading: true })

    clearTimeout(this.handleFetchDataTO)

    this.handleFetchDataTO = setTimeout(() => {
      const pagination = {
        page: this.state.page + 1,
        limit: this.state.pageSize,
        sorted: this.state.sorted
      }
      const queryObjects = { filtered: this.state.filtered }
      const axiosData = { ...pagination, ...queryObjects }

      if (this.props.dataTableState.queryString) this.setState(SHOW_FILTERS_STATE)

      if (DataTableHelper.shouldPushHistory(this.state.axiosData, queryObjects) && historyPush) {
        const queryString = queryParams(queryObjects)
        this.props.saveQueryState({ queryString })

        return this.props.history.push([this.props.path, queryString].join('?'))
      }

      return this.handleGetRequest(axiosData)
    }, 50)
  }

  handleGetRequest(axiosData) {
    if (!Session.decodedToken()) return Session.verifyToken()

    const _this = this
    const CancelToken = axios.CancelToken
    const cancelTokenCallback = {
      cancelToken: new CancelToken(function executor(cancel) {
        _this.setState({ axiosCancelToken: cancel })
      })
    }

    this.setState({ axiosData })

    Axios
      .get([this.props.dataSource, queryParams(axiosData)].join('?'), cancelTokenCallback)
      .then(response => {
        this.saveFilters()
        this.setState({
          data: response.data.rows,
          pages: response.data.pages,
          loading: false,
          refreshData: false,
          error: false
        })
      })
      .catch(error => {
        if (axios.isCancel(error)) return true

        console.log('Error: ', error)

        this.setState({ data: [], loading: false, error: true })
      })
  }

  handleOnSortedChange(sorted) {
    this.handleFetchData({ sorted: DataTableHelper.parseSorted(sorted), page: 0 }) }

  handleOnPageChange(pageIndex) {
    this.handleFetchData({ page: pageIndex })
  }

  handleOnPageSizeChange(pageSize, page) {
    const height = DataTableHelper.setHeight(pageSize)

    this.handleFetchData({
      pageSize,
      page,
      height
    })
  }

  handleToggleFilters() {
    let filtersState = SHOW_FILTERS_STATE

    if (this.state.showFilters) filtersState = HIDE_FILTERS_STATE

    this.setState(filtersState)
  }

  handleToggleNewFormModal(e) {
    if (e) e.preventDefault()

    this.setState({ showNewFormModal: !this.state.showNewFormModal })
  }

  componentWillReceiveProps() {
    if (this.props.dataTableState.queryString) this.setState(SHOW_FILTERS_STATE)

    this.cancelPostRequest()
    this.setState({ error: false })
    this.initData()
  }

  componentDidMount() {
    this.retrieveFilters()
    this.initData()
  }

  componentWillUnmount() {
    this.cancelPostRequest()
  }

  render() {
    const props = this.props
    const state = this.state

    return (
      <div className="datatable">
        {state.error && <Alert processError /> }
        <div className="form-group datatable-header">
          {(props.columnFilters) &&
            <Button
              bsStyle="default"
              className="datatable-header-filters-toggle-btn"
              onClick={this.handleToggleFilters.bind(this)}
            >
              Toggle Filters
            </Button>
          }
          <NewFormButton
            {...props}
            handleToggleFormModal={this.handleToggleNewFormModal.bind(this)}
          />
        </div>
        {props.columnFilters && this.state.showFilters &&
          <div className="datatable-filters">
            <ColumnFilters
              filters={props.columnFilters}
              filtered={state.filtered}
              queryString={this.props.dataTableState.queryString}
              btnEnabled={state.resetFiltersBtnDisabled}
              setStateHandler={this.setStateHandler.bind(this)}
            />
          </div>
        }
        <ReactTable
          manual
          data={state.data}
          columns={this.state.columns}
          noDataText={false}
          page={state.page}
          pages={state.pages}
          pageSize={state.pageSize}
          loading={state.loading}
          loadingText={null}
          style={{ height: state.height }}
          onSortedChange={this.handleOnSortedChange.bind(this)}
          onPageChange={this.handleOnPageChange.bind(this)}
          onPageSizeChange={this.handleOnPageSizeChange.bind(this)}
          className="-highlight"
        />
        <FormModal
          formOption={props.newFormOption}
          enableModal={props.showNewForm}
          showModal={state.showNewFormModal}
          onSuccess={this.handleRefreshData.bind(this)}
          toggleModalHandler={this.handleToggleNewFormModal.bind(this)}
        />
      </div>
    )
  }
}

export default withRouter(DataTable)
