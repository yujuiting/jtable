import React, { forwardRef } from 'react';
import { HeadProps } from 'types';

export default forwardRef<HTMLTableSectionElement, HeadProps>(function Head(props, ref) {
  return <thead {...props} ref={ref} />;
});
