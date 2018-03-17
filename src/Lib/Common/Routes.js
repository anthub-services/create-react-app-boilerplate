import React from 'react'
import { Route } from 'react-router-dom'
import Layout from '../../Components/Layout'
import PageNotFound from '../../Views/Admin/PageNotFound'
import * as Session from '../Helpers/Session'
import SignOut from '../../Redux/Containers/Sessions/SignOut'

export const SiteRoute = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={props => (
      <Layout.Basic>
        <Component {...props} />
      </Layout.Basic>
    )} />
  )
}

export const AuthSiteRoute = ({component: Component, ...rest}) => {
  const { path } = {...rest}
  let component = <Component {...rest} />

  if (Session.isSignedIn() && Session.accessDenied(path))
    component = <PageNotFound {...rest} />

  const layout = <Layout.Basic>{component}</Layout.Basic>

  return <PrivateRoute {...rest} layout={layout} />
}

export const AdminRoute = ({component: Component, ...rest}) => {
  const { path } = {...rest}
  let component = <Component {...rest} />

  if (path && path !== '/admin/*' && Session.isSignedIn() && Session.accessDenied(path))
    component = <PageNotFound {...rest} />

  const layout = <Layout.Admin>{component}</Layout.Admin>

  return <PrivateRoute {...rest} layout={layout} />
}

const PrivateRoute = ({component: Component, ...rest}) => {
  const { layout } = {...rest}

  if (Session.token()) Session.verifyToken()

  return (
    <Route {...rest} render={(props) => (
      Session.isSignedIn() ? layout : <SignOut {...props} />
    )} />
  )
}
