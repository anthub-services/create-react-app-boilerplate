import React from 'react'
import _ from 'lodash'
import QueryString from 'query-string'
import { queryParamsList } from './Routes'
import Action from '../../Components/DataTable/Action'

export const HEIGHT = '790px'

export const NewFormButton = ({ path, newFormOption, showNewForm, handleToggleFormModal }) => {
  if (!showNewForm) return null

  return (
    <a href={[path, 'new'].join('/')}
      className="btn btn-success"
      onClick={handleToggleFormModal}
    >
      {newFormOption.title}
    </a>
  )
}

export function initColumns(props, toggleNewFormModalHandler, refreshDataHandler) {
  const { columns, showViewRecord, showEditRecord, showDeleteRecord } = props

  let clonedColumns = _.clone(columns)

  if (showViewRecord || showEditRecord || showDeleteRecord) {
    clonedColumns.push({
      Header: 'Action',
      accessor: props.actionAccessorId,
      Cell: cellInfo => (
        <div className="datatable-actions">
          <Action.ViewRecord
            {...props}
            resource={cellInfo.original}
          />
          <Action.EditRecord
            {...props}
            resource={cellInfo.original}
            onSuccess={refreshDataHandler}
          />
          <Action.DeleteRecord
            {...props}
            resource={cellInfo.original}
            onSuccess={refreshDataHandler}
          />
        </div>
      ),
      resizable: false,
      sortable: false,
      width: 130
    })
  }

  return clonedColumns
}

export function hasQuerySearch() {
  return Object.keys(parseQuerySearch()).length > 0
}

export function parseQueryObjects(encodeQuery=true) {
  const querySearch = parseQuerySearch()
  let filtered = querySearch.filtered ? querySearch.filtered : {}

  if (encodeQuery) filtered = queryParamsList(filtered)

  return { filtered }
}

export function setHeight(pageSize) {
  return pageSize > 20 ? HEIGHT : null
}

export function parseSorted(columns) {
  let sorted = {}

  columns.map(column => { return sorted[column.id] = column.desc ? 'desc' : 'asc' })

  return sorted
}

export function shouldPushHistory(axiosData, queryObjects) {
  if (!axiosData.filtered && JSON.stringify(queryObjects.filtered) === '{}')
    return false

  return JSON.stringify(axiosData.filtered) !== JSON.stringify(queryObjects.filtered)
}

function parseQuerySearch() {
  return _.pick(QueryString.parse(window.location.search), 'filtered')
}
