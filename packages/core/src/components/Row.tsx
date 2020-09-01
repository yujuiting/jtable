import React, { forwardRef } from 'react';
import { RowProps, ColumnInfo, WithTable } from 'types';
import DefaultCell from './Cell';

export type Props<T = unknown> = RowProps & WithTable<T>;

export default forwardRef<HTMLTableRowElement, Props>(function Row(props, ref) {
  const { children, table, Cell = DefaultCell, ...rest } = props;

  const {
    state: { columns },
  } = table;

  function renderColumn(column: ColumnInfo) {
    return <Cell key={column.columnId} table={table} columnId={column.columnId} />;
  }

  function renderColumns() {
    return columns.map(renderColumn);
  }

  function renderChildren() {
    if (children) return children;
    return renderColumns();
  }

  return (
    <tr {...rest} ref={ref}>
      {renderChildren()}
    </tr>
  );
});
