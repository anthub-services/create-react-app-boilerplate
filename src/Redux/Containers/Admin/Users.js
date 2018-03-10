import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../../Actions/Admin/Users'
import UsersDataTable from '../../../Components/DataTable/Admin/Users'

function mapStateToProps({ AdminUsers }) {
  return { AdminUsers }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersDataTable)
