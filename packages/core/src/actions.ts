import type {
  ColumnInfo,
  SetDataAction,
  AddColumnAction,
  RemoveColumnAction,
  SetPageCurrentAction,
  SetPageSizeAction,
  SetSortKeyAction,
} from 'types';

export const setData = (data: unknown[]): SetDataAction => ({
  type: 'set-data',
  payload: { data },
});

export const addColumn = (column: ColumnInfo): AddColumnAction => ({
  type: 'add-column',
  payload: { column },
});

export const removeColumn = (columnId: string): RemoveColumnAction => ({
  type: 'remove-column',
  payload: { columnId },
});

export const setPageCurrent = (pageCurrent: number): SetPageCurrentAction => ({
  type: 'set-page-current',
  payload: { pageCurrent },
});

export const setPageSize = (pageSize: number): SetPageSizeAction => ({
  type: 'set-page-size',
  payload: { pageSize },
});

export const setSortKey = (key: string): SetSortKeyAction => ({
  type: 'set-sort-key',
  payload: { sortKey: key },
});
