import React, { forwardRef } from 'react';
import { CaptionProps } from 'types';

const Caption = forwardRef<HTMLTableCaptionElement, CaptionProps>(function Caption(props, ref) {
  return <caption {...props} ref={ref} />;
});

export default Caption;
