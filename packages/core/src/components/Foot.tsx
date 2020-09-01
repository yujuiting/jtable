import React, { forwardRef } from 'react';
import { FootProps } from 'types';

export default forwardRef<HTMLTableSectionElement, FootProps>(function Foot(props, ref) {
  return <tfoot {...props} ref={ref} />;
});
