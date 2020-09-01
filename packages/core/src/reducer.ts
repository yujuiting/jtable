import type { Store, AnyAction } from 'types';

const reducer: React.Reducer<Store, AnyAction> = (state, action) => {
  switch (action.type) {
    case 'set-data':
      return updateVisibleData(updatePagination({ ...state, sourceData: action.payload.data }));

    case 'add-column':
      return { ...state, columns: [...state.columns, action.payload.column] };

    case 'remove-column':
      return removeColumn(state, action.payload.columnId);

    case 'set-page-current':
      return updateVisibleData(updatePageCurrent({ ...state, pageCurrent: action.payload.pageCurrent }));

    case 'set-page-size':
      return updateVisibleData(updatePagination({ ...state, pageSize: action.payload.pageSize }));

    case 'set-sort-key':
      return updateVisibleData(sort(updateSortKey(state, action.payload.sortKey)));

    default:
      return state;
  }
};

export default reducer;

export const typedReducer = <T>(): React.Reducer<Store<T>, AnyAction> => reducer as React.Reducer<Store<T>, AnyAction>;

function removeColumn(state: Store, columnId: string): Store {
  const index = state.columns.findIndex((col) => col.columnId === columnId);
  if (index < 0) return state;
  const { columns: oldColumns } = state;
  const columns = [...oldColumns.slice(0, index), ...oldColumns.slice(index + 1)];
  return { ...state, columns };
}

function updatePageCurrent(state: Store): Store {
  const { pageCurrent: oldPageCurrent, pageTotal } = state;
  const pageCurrent = Math.min(Math.max(1, oldPageCurrent), pageTotal);
  return { ...state, pageCurrent };
}

function updatePagination(state: Store): Store {
  const { sourceData, pageSize, pageCurrent: oldPageCurrent } = state;
  const len = sourceData.length;
  const pageTotal = pageSize ? Math.ceil(len / pageSize) : 1;
  const pageCurrent = oldPageCurrent > pageTotal ? 1 : oldPageCurrent;
  return { ...state, pageCurrent, pageTotal };
}

function updateVisibleData(state: Store): Store {
  const { pageSize, pageCurrent, sourceData } = state;
  if (pageSize === 0) return { ...state, visibleData: sourceData };
  // page current start from 1
  const from = (pageCurrent - 1) * pageSize;
  const to = from + pageSize;
  const visibleData = sourceData.slice(from, to);
  return { ...state, visibleData };
}

function updateSortKey(state: Store, sortKey: string): Store {
  const { columns } = state;
  const column = columns.find((column) => column.columnId === sortKey);
  if (!column || !column.sortor) return state;
  // from no sort, setup new sort
  if (!state.sortKey) return { ...state, sortKey, sortOrder: 'asc' };
  // from another sort key, reset sort key
  if (sortKey !== state.sortKey) return { ...state, sortKey, sortOrder: 'asc' };
  // from same sort key, reverse order
  if (state.sortOrder === 'asc') return { ...state, sortOrder: 'desc' };
  return { ...state, sortOrder: 'asc' };
}

/**
 * @todo keep original data order
 */
function sort(state: Store): Store {
  const { columns, sortKey, sortOrder, sourceData: oldSourceData } = state;
  const column = columns.find((column) => column.columnId === sortKey);
  if (!column || !column.sortor) return state;
  const { sortor } = column;
  const reversibleSorter = (a: unknown, b: unknown) => {
    if (sortOrder === 'asc') return sortor(a, b);
    else return -sortor(a, b);
  };
  const sourceData = [...oldSourceData];
  sourceData.sort(reversibleSorter);
  return { ...state, sourceData };
}
