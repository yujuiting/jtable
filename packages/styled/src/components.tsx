/**
 * @packageDocumentation
 * @module styled
 */
import React, { forwardRef } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { KeyboardArrowDown } from '@styled-icons/material/KeyboardArrowDown';
import * as jtable from '@jtable/core';
import styled, { css, builtInThemes } from './theme';
import type { Theme, ThemeProviderProps } from './types';

export const ThemeProvider: React.FC<ThemeProviderProps> = (props) => {
  const { theme: themeOrName, children } = props;
  const theme = typeof themeOrName === 'string' ? builtInThemes[themeOrName] : themeOrName;
  return <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>;
};

/**
 * @internal
 */
function getTheme(key: keyof Theme) {
  return (props: { theme: Theme }) => props.theme[key];
}

export const Table = styled(jtable.Table)`
  border-collapse: collapse;
  background: ${getTheme('table.background')};
  color: ${getTheme('table.font-color')};
`;

export const TableWithProvider = styled(jtable.TableWithProvider)`
  border-collapse: collapse;
  background: ${getTheme('table.background')};
  color: ${getTheme('table.font-color')};
`;

export const Head = styled(jtable.Head)`
  text-align: center;
  background: ${getTheme('head.background')};
  color: ${getTheme('head.font-color')};
`;

/**
 * @internal
 */
const StyledBody = styled(jtable.Body)``;

export const Body = forwardRef<HTMLTableSectionElement, jtable.BodyProps>(function Body({ children, ...props }, ref) {
  return (
    // for overriding default Row component
    <StyledBody Row={Row} {...props} ref={ref}>
      {children}
    </StyledBody>
  );
});

export const Foot = styled(jtable.Foot)`
  text-align: center;
  background: ${getTheme('foot.background')};
  color: ${getTheme('foot.font-color')};
`;

/**
 * @internal
 */
const StyledRow = styled(jtable.Row)`
  border-bottom: 1px solid;
  :hover {
    background: ${getTheme('row.background.hover')};
    color: ${getTheme('row.font-color.hover')};
  }
`;

export const Row = forwardRef<HTMLTableRowElement, jtable.RowProps>(function Row({ children, ...props }, ref) {
  return (
    // for overriding default Cell component
    <StyledRow Cell={Cell} {...props} ref={ref}>
      {children}
    </StyledRow>
  );
});

export const Cell = styled(jtable.Cell)`
  padding: 0.4em 1em;
`;

/**
 * @internal
 */
interface StyledSortIconProps {
  degree: number;
}

/**
 * @internal
 */
const StyledSortIcon = styled(KeyboardArrowDown)`
  width: 1em;
  height: 1em;
  transform: rotate(${(props: StyledSortIconProps) => props.degree}deg);
  transition: transform 0.3s;
`;

/**
 * @internal
 */
const SortIcon: React.FC = () => {
  const {
    state: { sortOrder },
  } = jtable.useTable();
  return <StyledSortIcon degree={sortOrder === 'asc' ? 0 : 180} />;
};

/**
 * @internal
 */
const StyledColumn = styled(jtable.Column)`
  ${getTheme('column.color')}
  ${(props) =>
    props.sortor &&
    css`
      color: ${getTheme('column.color.sortable')};
    `}
`;

export const Column = forwardRef<HTMLTableHeaderCellElement, jtable.ColumnProps>(function Column(
  { children, ...props },
  ref,
) {
  return (
    <StyledColumn sortIcon={<SortIcon />} {...props} ref={ref}>
      {children}
    </StyledColumn>
  );
});

export const Caption = styled(jtable.Caption)`
  text-align: center;
`;

export const PageFirst = styled(jtable.PageFirst)``;

export const PageLast = styled(jtable.PageLast)``;

export const PageNext = styled(jtable.PageNext)``;

export const PagePrev = styled(jtable.PagePrev)``;

export const PageInfo = styled(jtable.PageInfo)``;

export const Pagination = styled(jtable.Pagination)``;
