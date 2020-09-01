import React, { forwardRef, useEffect, useCallback } from 'react';
import type { ColumnProps, ColumnInfo, WithTable } from 'types';
import { addColumn, removeColumn, setSortKey } from 'actions';

export type Props<T = unknown> = ColumnProps<T> & WithTable<T>;

export default forwardRef<HTMLTableHeaderCellElement, Props>(function Column(props, ref) {
  const { columnId, accessor, sortor, asKey, sortIcon, table, children, ...rest } = props;
  const {
    dispatch,
    state: { sortKey },
  } = table;

  /**
   * @todo dynamic update column info may cause unexpected column order
   * we should keep column order and element order consistent.
   */
  useEffect(() => {
    const column: ColumnInfo = { columnId, accessor, sortor, asKey };
    dispatch(addColumn(column));
    return () => dispatch(removeColumn(columnId));
  }, [dispatch, columnId, accessor, sortor, asKey]);

  const onClick = useCallback(() => dispatch(setSortKey(columnId)), [columnId, dispatch]);

  function renderSortIcon() {
    if (sortKey !== columnId) return;
    return sortIcon;
  }

  return (
    <th {...rest} onClick={onClick} ref={ref}>
      {renderSortIcon()}
      {children || columnId}
    </th>
  );
});
