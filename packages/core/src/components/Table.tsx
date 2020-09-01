import React, { forwardRef } from 'react';
import { TableProps } from 'types';

export type Props = TableProps;

export default forwardRef<HTMLTableElement, Props>(function Table(props, ref) {
  return <table {...props} ref={ref} />;
});
