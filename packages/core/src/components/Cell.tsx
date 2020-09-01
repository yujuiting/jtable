import React, { forwardRef, useMemo } from 'react';
import { CellProps, WithTable, WithRow } from 'types';
import { getColumnValue } from 'utils';

export type Props<T = unknown> = CellProps & WithTable<T> & WithRow<T>;

export default forwardRef<HTMLTableCellElement, Props>(function Cell(props, ref) {
  const { columnId, table, data, children, ...rest } = props;

  const {
    state: { columns },
  } = table;

  const column = useMemo(() => columns.find((column) => column.columnId === columnId), [columns, columnId]);

  function renderChildren() {
    // if children presented, render user's custom content
    if (children !== undefined) return children;
    // not found columnId, we should let user know about it
    if (!column) return `#Ref!${columnId}`;
    return getColumnValue(column, data);
  }

  return (
    <td {...rest} ref={ref}>
      {renderChildren()}
    </td>
  );
});
