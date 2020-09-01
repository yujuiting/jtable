import type { ColumnInfo } from 'types';

export function getColumnValue(column: ColumnInfo, data: unknown): string | undefined {
  const { columnId, accessor = columnId } = column;
  if (typeof data !== 'object') return `${data}`;
  if (data === null) return;
  // @ts-ignore
  if (typeof accessor === 'string') return data[accessor];
  return `${accessor(data)}`;
}

export function getRowKey(columns: ColumnInfo[], data: unknown): string | undefined {
  const keyColumn = columns.find((column) => column.asKey);
  if (!keyColumn) return;
  return getColumnValue(keyColumn, data);
}
