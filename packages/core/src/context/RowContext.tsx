import React, { createContext, createElement, useContext, useMemo } from 'react';
import type { RowService, RowProviderProps, WithRow } from 'types';

const RowContext = createContext<RowService>({ data: null, index: -1 });

export const useRow = (): RowService => useContext(RowContext);

export function RowProvider({ data, index, children }: React.PropsWithChildren<RowProviderProps>): JSX.Element {
  const value = useMemo<RowService>(() => ({ data, index }), [data, index]);
  return <RowContext.Provider value={value}>{children}</RowContext.Provider>;
}

export function withRow<Props extends WithRow, EnhancedProps = Omit<Props, keyof WithRow>>(
  type: React.ComponentType<Props>,
): React.ComponentType<EnhancedProps> {
  function WithTable(props: EnhancedProps) {
    const { data, index } = useRow();
    // @ts-ignore
    return createElement(type, { data, index, ...props });
  }
  WithTable.displayName = `WithRow(${type.displayName})`;
  return WithTable;
}
