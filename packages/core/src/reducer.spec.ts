import { Store, ColumnInfo } from 'types';
import { typedReducer } from 'reducer';
import * as actions from 'actions';

describe('reducer', () => {
  const reducer = typedReducer<number>();

  const initial: Store<number> = {
    sourceData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    visibleData: [6, 7, 8, 9, 10],
    sortKey: 'value',
    sortOrder: 'asc',
    pageCurrent: 2,
    pageSize: 5,
    pageTotal: 2,
    columns: [{ columnId: 'value', sortor: (a, b) => a - b, accessor: (v) => v }],
  };

  it('should set data', () => {
    const data = [4, 5, 6];
    const state = reducer(initial, actions.setData(data));
    // data updated
    expect(state.sourceData).toMatchObject(data);
    // only one page
    expect(state.visibleData).toMatchObject(data);
    // page current reset to valid value
    expect(state.pageCurrent).toBe(1);
    // also, page total updated
    expect(state.pageTotal).toBe(1);
  });

  it('should add-column', () => {
    const column: ColumnInfo = { columnId: 'mock-col' };
    const state = reducer(initial, actions.addColumn(column));
    expect(state.columns.length).toBe(2);
    expect(state.columns[1]).toMatchObject(column);
  });

  it('should remove column', () => {
    const state = reducer(initial, actions.removeColumn('value'));
    expect(state.columns.length).toBe(0);
  });

  it('should set page current', () => {
    const { sourceData, pageSize } = initial;
    const state = reducer(initial, actions.setPageCurrent(1));
    expect(state.pageCurrent).toBe(1);
    // visible data updated
    expect(state.visibleData).toMatchObject(sourceData.slice(0, pageSize));
    // out of index
    expect(reducer(initial, actions.setPageCurrent(3)).pageCurrent).toBe(2);
    expect(reducer(initial, actions.setPageCurrent(-3)).pageCurrent).toBe(1);
  });

  it('should set page size', () => {
    const state = reducer(initial, actions.setPageSize(3));
    // page size updated
    expect(state.pageSize).toBe(3);
    // page current should be keep
    expect(state.pageCurrent).toBe(2);
    // page total recalculated
    expect(state.pageTotal).toBe(4);
    // visisble data updated
    expect(state.visibleData).toMatchObject(state.sourceData.slice(3, 6));
  });

  it('should set sort key', () => {
    const first = reducer(initial, actions.setSortKey('value'));
    expect(first.sortKey).toBe('value');
    // order should be revert if sort same key again
    expect(first.sortOrder).toBe('desc');
    expect(first.sourceData).toMatchInlineSnapshot(`
      Array [
        10,
        9,
        8,
        7,
        6,
        5,
        4,
        3,
        2,
        1,
      ]
    `);
    expect(first.visibleData).toMatchInlineSnapshot(`
      Array [
        5,
        4,
        3,
        2,
        1,
      ]
    `);

    const second = reducer(first, actions.setSortKey('value'));
    expect(second.sortKey).toBe('value');
    // order should be revert if sort same key again
    expect(second.sortOrder).toBe('asc');
    expect(second.sourceData).toMatchInlineSnapshot(`
      Array [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
      ]
    `);
    expect(second.visibleData).toMatchInlineSnapshot(`
      Array [
        6,
        7,
        8,
        9,
        10,
      ]
    `);
  });
});
