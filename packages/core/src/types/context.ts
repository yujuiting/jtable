/**
 * @packageDocumentation
 * @module core/context
 */
import { AnyAction } from './action';

export interface Store<T = unknown> {
  sourceData: T[];
  visibleData: T[];
  pageCurrent: number;
  pageTotal: number;
  pageSize: number;
  sortKey: string;
  sortOrder: 'asc' | 'desc';
  columns: ColumnInfo<T>[];
}

export interface TableService<T = unknown> {
  state: Store<T>;
  dispatch: React.Dispatch<AnyAction>;
}

export interface RowService<T = unknown> {
  data: T;
  index: number;
}

/**
 * @internal
 */
export interface WithTable<T = unknown> {
  table: TableService<T>;
}

/**
 * @internal
 */
export interface WithRow<T = unknown> {
  data?: T;
  index?: number;
}

export interface ColumnInfo<T = unknown> {
  /**
   * unique id for each column
   */
  columnId: string;
  /**
   * if `accessor` provide, it will take `fieldId`'s place when access data.
   */
  accessor?: string | ((data: T) => React.ReactNode);
  sortor?: (a: T, b: T) => number;
  /**
   * As row key
   */
  asKey?: boolean;
}
