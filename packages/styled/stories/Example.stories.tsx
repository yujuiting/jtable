import React, { useState, useCallback } from 'react';
import { withKnobs, number, select, color } from '@storybook/addon-knobs';
import { TableProvider, ColumnInfo, useTable, actions } from '@jtable/core';
import {
  TableWithProvider as Table,
  Table as TableWithoutData,
  Head,
  Row,
  Column,
  Body,
  Cell,
  Foot,
  Pagination,
  PagePrev,
  PageNext,
  PageInfo,
  PageFirst,
  PageLast,
  Caption,
  ThemeProvider,
  BuiltInThemeName,
} from '@jtable/styled';

export default {
  title: 'Example',
  decorators: [withKnobs],
};

interface Data {
  name: string;
  age: number;
}

const testData: Data[] = [];

for (let i = 0; i < 100; i++) {
  testData.push({ name: `user-${`00${i}`.slice(-2)}`, age: ~~(Math.random() * 100) });
}

export const SimpleUsage = (): JSX.Element => {
  function ageAccessor({ age }: Data) {
    return age;
  }

  return (
    <ThemeProvider theme={select<BuiltInThemeName>('Theme', ['light', 'dark'], 'light')}>
      <Table data={testData}>
        <Caption>Users</Caption>
        <Head>
          <Row>
            <Column columnId="Name" accessor="name" asKey />
            <Column columnId="Age" accessor={ageAccessor} />
          </Row>
        </Head>
        <Body />
      </Table>
    </ThemeProvider>
  );
};

function nameSortor(a: Data, b: Data): number {
  return a.name.localeCompare(b.name);
}

function ageSortor(a: Data, b: Data): number {
  return a.age - b.age;
}

export const Sort = (): JSX.Element => {
  return (
    <ThemeProvider theme={select<BuiltInThemeName>('Theme', ['light', 'dark'], 'light')}>
      <Table data={testData}>
        <Caption>Users</Caption>
        <Head>
          <Row>
            <Column columnId="Name" accessor="name" sortor={nameSortor} asKey />
            <Column columnId="Age" accessor="age" sortor={ageSortor} />
          </Row>
        </Head>
        <Body />
      </Table>
    </ThemeProvider>
  );
};

export const UsePagination = (): JSX.Element => (
  <ThemeProvider theme={select<BuiltInThemeName>('Theme', ['light', 'dark'], 'light')}>
    <Table data={testData} pageSize={number('Page Size', 10)}>
      <Caption>Users</Caption>
      <Head>
        <Row>
          <Column columnId="Name" accessor="name" sortor={nameSortor} asKey />
          <Column columnId="Age" accessor="age" sortor={ageSortor} />
        </Row>
      </Head>
      <Body />
      <Foot>
        <Pagination>
          <PageFirst>{'<<'}</PageFirst>
          <PagePrev>{'<'}</PagePrev>
          <PageInfo />
          <PageNext>{'>'}</PageNext>
          <PageLast>{'>>'}</PageLast>
        </Pagination>
      </Foot>
    </Table>
  </ThemeProvider>
);

export const CustomRow = (): JSX.Element => (
  <Table data={testData}>
    <Caption>Users</Caption>
    <Head>
      <Row>
        <Column columnId="Name" accessor="name" asKey />
        <Column columnId="Age" accessor="age" />
      </Row>
    </Head>
    <Body>
      <Row>
        <Cell style={{ fontWeight: 'bolder' }} columnId="Name" />
        <Cell columnId="Age" />
      </Row>
      <Row style={{ background: 'darkcyan', color: '#f5f5f5' }} />
    </Body>
  </Table>
);

export const CustomCellContent = (): JSX.Element => {
  function nameSortor(a: Data, b: Data): number {
    return a.name.localeCompare(b.name);
  }

  function ageSortor(a: Data, b: Data): number {
    return a.age - b.age;
  }

  return (
    <ThemeProvider theme={select<BuiltInThemeName>('Theme', ['light', 'dark'], 'light')}>
      <Table data={testData}>
        <Caption>Users</Caption>
        <Head>
          <Row>
            <Column columnId="name" asKey sortor={nameSortor}>
              Name
            </Column>
            <Column columnId="age" sortor={ageSortor}>
              Age
            </Column>
          </Row>
        </Head>
        <Body>
          {({ age }: Data) => (
            <Row>
              <Cell columnId="name" />
              <Cell columnId="age">
                {age} {age > 1 ? 'years' : 'year'} old
              </Cell>
            </Row>
          )}
        </Body>
      </Table>
    </ThemeProvider>
  );
};

export const CustomCellStyle = (): JSX.Element => {
  const [selectedIndex, selectIndex] = useState(0);

  const [selectedColumn, selectColumn] = useState('Name');

  function getCellStyle(index: number, columnId: string): React.CSSProperties {
    if (selectedIndex !== index) return { cursor: 'pointer' };
    if (selectedColumn !== columnId) return { cursor: 'pointer' };
    return { background: 'darkcyan', color: '#f5f5f5' };
  }

  return (
    <Table data={testData}>
      <Caption>Click any cell</Caption>
      <Head>
        <Row>
          <Column columnId="Name" accessor="name" />
          <Column columnId="Age" accessor="age" />
        </Row>
      </Head>
      <Body>
        {(_, index) => (
          <Row onClick={() => selectIndex(index)}>
            <Cell style={getCellStyle(index, 'Name')} onClick={() => selectColumn('Name')} columnId="Name" />
            <Cell style={getCellStyle(index, 'Age')} onClick={() => selectColumn('Age')} columnId="Age" />
          </Row>
        )}
      </Body>
    </Table>
  );
};

export const LimitTableHeightAndStickyHeader = (): JSX.Element => {
  const columnStyle: React.CSSProperties = { position: 'sticky', top: 0, background: 'darkcyan', color: '#f5f5f5' };
  return (
    <div style={{ height: 300, width: 'fit-content', overflow: 'auto' }}>
      <Table data={testData}>
        <Head>
          <Row>
            <Column style={columnStyle} columnId="Name" accessor="name" />
            <Column style={columnStyle} columnId="Age" accessor="age" />
          </Row>
        </Head>
        <Body />
      </Table>
    </div>
  );
};

export const CustomTheme = (): JSX.Element => (
  <ThemeProvider
    theme={{
      'table.background': color('table.background', '#f5f5f5'),
      'table.font-color': color('table.font-color', '#191919'),
      'head.background': color('head.background', ''),
      'head.font-color': color('head.font-color', ''),
      'foot.background': color('foot.background', ''),
      'foot.font-color': color('foot.font-color', ''),
      'row.background.hover': color('row.background.hover', '#191919'),
      'row.font-color.hover': color('row.font-color.hover', '#f5f5f5'),
    }}
  >
    <Table data={testData}>
      <Caption>Check knobs for options</Caption>
      <Head>
        <Row>
          <Column columnId="Name" accessor="name" />
          <Column columnId="Age" accessor="age" />
        </Row>
      </Head>
      <Body />
    </Table>
  </ThemeProvider>
);

function makeStyle(...styles: React.CSSProperties[]): React.CSSProperties {
  return styles.reduce((prev, next) => ({ ...prev, ...next }));
}

const cellStyle: React.CSSProperties = { whiteSpace: 'nowrap' };

const stickyStyle: React.CSSProperties = { position: 'sticky', background: 'white' };

export const DynamicAppendColumn = (): JSX.Element => {
  const [columns, setColumns] = useState<ColumnInfo[]>([]);

  const addColumn = useCallback(() => setColumns((prev) => [...prev, { columnId: `Col ${prev.length}` }]), []);

  const removeColumn = useCallback(() => setColumns((prev) => prev.slice(0, prev.length - 1)), []);

  function renderColumn(column: ColumnInfo) {
    return <Column style={makeStyle(cellStyle, stickyStyle, { top: 0 })} key={column.columnId} {...column} />;
  }

  function renderCell(column: ColumnInfo) {
    return (
      <Cell style={cellStyle} columnId={column.columnId}>
        Empty for {column.columnId}
      </Cell>
    );
  }

  return (
    <div>
      <button onClick={addColumn}>Add Column</button>
      <button onClick={removeColumn}>Remove Column</button>
      <div style={{ height: 300, width: 500, overflow: 'auto' }}>
        <Table data={testData}>
          <Head>
            <Row>
              <Column
                style={makeStyle(cellStyle, stickyStyle, { top: 0, left: 0, zIndex: 2 })}
                columnId="Name"
                accessor="name"
              />
              <Column style={makeStyle(cellStyle, stickyStyle, { top: 0 })} columnId="Age" accessor="age" />
              {columns.map(renderColumn)}
            </Row>
          </Head>
          <Body>
            <Row>
              <Cell style={makeStyle(cellStyle, stickyStyle, { left: 0, zIndex: 1 })} columnId="Name" />
              <Cell style={cellStyle} columnId="Age" />
              {columns.map(renderCell)}
            </Row>
          </Body>
        </Table>
      </div>
    </div>
  );
};

const SelectPageSize: React.FC = () => {
  const {
    dispatch,
    state: { pageSize },
  } = useTable();
  const setPageSize = useCallback((v: number) => dispatch(actions.setPageSize(v)), [dispatch]);
  return (
    <select
      value={`${pageSize}`}
      onChange={useCallback((e) => setPageSize(parseInt(e.target.value, 10)), [setPageSize])}
    >
      <option value="0">-</option>
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="30">30</option>
      <option value="50">50</option>
    </select>
  );
};

export const ComplexComposition = (): JSX.Element => {
  const pagination = (
    <div style={{ textAlign: 'center' }}>
      <SelectPageSize />
      <PageFirst>{'<<'}</PageFirst>
      <PagePrev>{'<'}</PagePrev>
      <PageInfo />
      <PageNext>{'>'}</PageNext>
      <PageLast>{'>>'}</PageLast>
    </div>
  );
  return (
    <TableProvider pageSize={10} data={testData}>
      {pagination}
      <hr />
      <p>A brief information.</p>
      <TableWithoutData style={{ width: '100%' }}>
        <Head>
          <Row>
            <Column columnId="Name" accessor="name" />
            <Column columnId="Age" accessor="age" />
          </Row>
        </Head>
        <Body />
      </TableWithoutData>
      <p>Awesome</p>
      <hr />
      {pagination}
    </TableProvider>
  );
};
