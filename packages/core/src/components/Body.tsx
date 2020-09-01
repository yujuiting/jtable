import React, { forwardRef, isValidElement, cloneElement } from 'react';
import { BodyProps, WithTable } from 'types';
import { getRowKey } from 'utils';
import { RowProvider } from 'context/RowContext';
import DefaultRow from './Row';

export type Props<T = unknown> = BodyProps<T> & WithTable<T>;

const Body = forwardRef<HTMLTableSectionElement, Props>(function Body(props, ref) {
  const { children, table, Row = DefaultRow, ...rest } = props;

  const {
    state: { visibleData, columns },
  } = table;

  function renderRowContent(data: unknown, index: number, collection: unknown[]) {
    if (!children) return <Row table={table} />;

    if (isValidElement(children)) {
      return cloneElement(children, children.props);
    }

    if (Array.isArray(children)) {
      const child = children[index % children.length];
      // @ts-ignore
      if (isValidElement(child)) return cloneElement(child, child.props);
      return null;
    }

    return children(data, index, collection);
  }

  function renderRow(data: unknown, index: number, collection: unknown[]) {
    return (
      <RowProvider data={data} index={index} key={getRowKey(columns, data) || index}>
        {renderRowContent(data, index, collection)}
      </RowProvider>
    );
  }

  function renderChildren() {
    return visibleData.map(renderRow);
  }

  return (
    <tbody {...rest} ref={ref}>
      {renderChildren()}
    </tbody>
  );
});

export default Body;
