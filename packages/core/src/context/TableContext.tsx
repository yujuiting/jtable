import React, { createContext, createElement, useContext, useReducer, useEffect } from 'react';
import type {
  Store,
  TableService,
  TableProviderProps,
  /**
   * @todo unknown eslint issue
   */
  WithTable, // eslint-disable-line
} from 'types';
import reducer from 'reducer';
import { setData, setPageSize } from 'actions';

const defaultState: Store = {
  sourceData: [],
  visibleData: [],
  sortKey: '',
  sortOrder: 'asc',
  pageCurrent: 1,
  pageSize: 0,
  pageTotal: 0,
  columns: [],
};

const TableContext = createContext<TableService>({
  state: defaultState,
  dispatch: () => {
    throw new Error('not found provider');
  },
});

export const useTable = (): TableService => useContext(TableContext);

export function TableProvider({ children, data, pageSize }: React.PropsWithChildren<TableProviderProps>): JSX.Element {
  const [state, dispatch] = useReducer(reducer, defaultState);

  useEffect(() => dispatch(setData(data || [])), [data, dispatch]);

  useEffect(() => dispatch(setPageSize(pageSize || 0)), [pageSize, dispatch]);

  const value: TableService = { state, dispatch };

  return <TableContext.Provider value={value}>{children}</TableContext.Provider>;
}

export function withTableProvider<Props>(
  component: React.ComponentType<Props>,
): React.ComponentType<Props & TableProviderProps> {
  function WithProvider(props: Props & TableProviderProps): JSX.Element {
    const { data, pageSize } = props;
    return (
      <TableProvider data={data} pageSize={pageSize}>
        {createElement(component, props)}
      </TableProvider>
    );
  }
  WithProvider.displayName = `WithTableProvider(${component.displayName})`;
  return WithProvider;
}

export function withTable<Props extends WithTable, EnhancedProps = Omit<Props, keyof WithTable>>(
  type: React.ComponentType<Props>,
): React.ComponentType<EnhancedProps> {
  function WithTable(props: EnhancedProps) {
    const table = useTable();
    // @ts-ignore
    return createElement(type, { ...props, table });
  }
  WithTable.displayName = `WithTable(${type.displayName})`;
  return WithTable;
}
