import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import _ from 'lodash'
import axios from 'axios'
import Axios from '../../../../Lib/Common/Axios'
import { Button } from 'react-bootstrap'
import Alert from '../../../Alert'
import { ucFirst } from '../../../../Lib/Helpers/Text'
import Paths from '../../../../Config/Paths/SuperAdmin'
import DeleteUserButton from '../../../Buttons/DeleteUser'
import * as Session from '../../../../Lib/Helpers/Session'

export default class User extends Component {
  constructor(props) {
    super(props)

    this.state = {
      formData: {},
      loading: '',
      buttonDisabled: false,
      resourceId: null,
      axiosCancelToken: null,
      processRequest: false,
      postRequestError: false,
      getRequestError: false,
      redirectToEdit: false,
      errorMessage: null
    }
    this.onChangeTO = 0
  }

  handleEditOnClick() {
    this.setState({ redirectToEdit: true })
  }

  handleGetRequest() {
    if (!Session.decodedToken()) return Session.verifyToken()

    const _this = this
    const apiURL = [process.env.REACT_APP_API_USERS_URL, this.state.resourceId].join('/')
    const CancelToken = axios.CancelToken
    const cancelTokenCallback = {
      cancelToken: new CancelToken(function executor(cancel) {
        _this.setState({ axiosCancelToken: cancel })
      })
    }

    Axios
      .get(apiURL, cancelTokenCallback)
      .then(({ data }) => {
        this.setState({
          formData: data,
          loading: '',
          buttonDisabled: false
        })
      })
      .catch(error => {
        if (axios.isCancel(error)) return true

        console.log('Error: ', error)

        this.setState({ getRequestError: true })
      })
  }

  componentWillUnmount() {
    if (typeof(this.state.axiosCancelToken) === 'function') this.state.axiosCancelToken()
  }

  componentDidMount() {
    const props = this.props

    if (props.resource) {
      return this.setState({ formData: props.resource, resourceId: props.resource.userId })
    }

    const resourceId = props.computedMatch.params.userId

    this.setState({
      loading: '-loading',
      buttonDisabled: true,
      resourceId
    })

    setTimeout(() => {
      this.handleGetRequest()
    })
  }

  render() {
    const state = this.state

    if (state.redirectToEdit) return <Redirect to={['/admin/users', state.resourceId, 'edit'].join('/')} />

    const props = this.props
    const data = state.formData

    return (
      <ContentWrapper
        {...props}
        key={state.key}
        formData={state.formData}
        handleEditOnClick={this.handleEditOnClick.bind(this)}
        buttonDisabled={state.buttonDisabled}
        getRequestError={state.getRequestError}
        className={state.loading}
      >
        {state.getRequestError ? (
            <Alert type="danger" hideDismissButton>User is not found.</Alert>
          ) : (
            <div className={['form-static', state.loading].join(' ')}>
              <p><strong>First name:</strong> {data.firstName}</p>
              <p><strong>Last name:</strong> {data.lastName}</p>
              <p><strong>Email:</strong> {data.email}</p>
              <p><strong>Role:</strong> {data.role}</p>
              <p><strong>Status:</strong> {ucFirst(data.status)}</p>
              <RedirectText redirect={data.redirect} />
              <p><strong>Allowed paths:</strong> {allPathsAllowedText(data.allowedPaths)}</p>
              <PathList paths={data.allowedPaths} />
              <ExcludedPaths {...data} />
              <PathList paths={data.excludedPaths} />
            </div>
          )
        }
      </ContentWrapper>
    )
  }
}

const ContentWrapper = (props) => {
  if (props.isModal)
    return (
      <div>
        <div className="modal-body">
          {props.children}
        </div>
        <div className="modal-footer">
          <Buttons {...props} />
        </div>
      </div>
    )

  return (
    <div>
      {props.children}
      {!props.getRequestError && <Buttons {...props} />}
    </div>
  )
}

const RedirectText = ({ redirect }) => {
  if (redirect === '') return null

  return <p><strong>Redirect:</strong> {redirect}</p>
}

const ExcludedPaths = ({ excludedPaths }) => {
  return !excludedPaths || excludedPaths.length === 0 ? null : <p><strong>Excluded paths:</strong></p>
}

const PathList = ({ paths }) => {
  if (!paths || (paths && paths[0] === '*')) return null

  return (
    <ul className="columns-2">
      {paths.map(path =>
        <li key={path}>{_.find(Paths, { path }).name}</li>
      )}
    </ul>
  )
}

const Buttons = (props) => {
  const showDeleteButton = Session.isAuthorised('/admin/users/delete')
  const showEditButton = Session.isAuthorised('/admin/users/:userId/edit')

  if (!(showDeleteButton || showEditButton) && !props.isModal) return null

  return (
    <div className={props.isModal ? '' : 'form-buttons'}>
      {props.isModal && <Button onClick={props.toggleModalHandler}>Close</Button>}
      {!props.isModal && showDeleteButton &&
        <DeleteUserButton
          resource={props.formData}
          disabled={props.buttonDisabled}
        />
      }
      {showEditButton &&
        <Button
          bsStyle="success"
          disabled={props.buttonDisabled}
          onClick={props.handleEditOnClick}
        >
          Edit User
        </Button>
      }
    </div>
  )
}

function allPathsAllowedText(paths) {
  if (!paths) return null

  return paths[0] === '*' ? 'Wildcard (*) path is assigned.' : ''
}
