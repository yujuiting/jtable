/**
 * @packageDocumentation
 * @module core/actions
 */
import type { ColumnInfo } from './context';
// import * as actions from 'actions';

export interface SetDataAction {
  type: 'set-data';
  payload: { data: unknown[] };
}

export interface AddColumnAction {
  type: 'add-column';
  payload: { column: ColumnInfo };
}

export interface RemoveColumnAction {
  type: 'remove-column';
  payload: { columnId: string };
}

export interface SetPageCurrentAction {
  type: 'set-page-current';
  payload: { pageCurrent: number };
}

export interface SetPageSizeAction {
  type: 'set-page-size';
  payload: { pageSize: number };
}

export interface SetSortKeyAction {
  type: 'set-sort-key';
  payload: { sortKey: string };
}

export type AnyAction =
  | SetDataAction
  | AddColumnAction
  | RemoveColumnAction
  | SetPageCurrentAction
  | SetPageSizeAction
  | SetSortKeyAction;
