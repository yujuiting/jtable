import * as components from 'components';
import { withTable, withTableProvider } from 'context/TableContext';
import { withRow } from 'context/RowContext';

export const Table = components.Table;

export const TableWithProvider = withTableProvider(Table);

export const Head = components.Head;

export const Body = withTable(components.Body);

export const Foot = components.Foot;

export const Row = withTable(components.Row);

export const Cell = withTable(withRow(components.Cell));

export const Column = withTable(components.Column);

export const Caption = components.Caption;

export const PagePrev = withTable(components.PagePrev);

export const PageNext = withTable(components.PageNext);

export const PageFirst = withTable(components.PageFirst);

export const PageLast = withTable(components.PageLast);

export const PageNumber = withTable(components.PageNumber);

export const PageInfo = withTable(components.PageInfo);

export const Pagination = withTable(components.Pagination);
