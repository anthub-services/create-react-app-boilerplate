import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../../Actions/Admin/Sessions'
import SessionsDataTable from '../../../Components/DataTable/Admin/Sessions'

function mapStateToProps({ AdminSessions }) {
  return { AdminSessions }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionsDataTable)
