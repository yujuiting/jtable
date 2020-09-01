_all links only work in docs, please read follows from `docs/index.html`_

# JTable

- [storybook](./storybook/index.html)

## API Design

- Present real DOM element structure as possible<br />
  I used to feel frustrated when using libraries which hiding too many elements under implementation.
  It's hard to customize styles with those libs without taking look at its implementation.
  To code with the real DOM elements structure is a solution. We can understand what's the final element layout easily.

- JSX as configuration<br />
  There are lots of libs overused component props. It may lead to performance issues if unconcerned.
  For example, an unmemorized config object.

  ```jsx
  const App = () => <Table columns={[...]} />;
  ```

  Second. As mentioned above, putting rendering function in component props is also lose chances to handle DOM elements.
  We didn't know where this rendering function used if don't gave it a try or dived into source code.
  JSX came out because of the good for reading. We have no reason to ignore the power of JSX.

  Third. To take element structure under control is better for handling with accessibility.

- Separate logical implementation and styling<br />
  There are various React table libs, most of those are binding with a certain style lib.
  That is good if we have almost nothing, and have to set up a table without a lot of code.
  If we have massive legacy code and an irreplaceable style system, it may be a nightmare to conduct those libs into codebase.
  [react-table](https://github.com/tannerlinsley/react-table) is a good counterexample. Headless API design frees us from it but may go too far.
  I believe there is a kind of combination of balancing those two extremes.
  `@jtable/core` provides logical components almost the same as native table elements without any styling.
  We can use it as a built-in element but got sort or pagination features.
  `@jtable/styled` provides a `styled-components` version of components and theme feature.
  Of source, we can support more kinds of styling system.

## Packages

- @jtable/core<br />
  Provide core logics including sort and pagination.
  `@jtable/core` implements by React reducer.
  Please check [actions](./modules/core_actions.html) and [store](./interfaces/core_context.store.html) out if interested.

- @jtable/styled<br />
  Provide theme feature through [styled-components](https://github.com/styled-components/styled-components)
  You can apply theme with [ThemeProvider](./interfaces/styled.themeproviderprops.html) with
  [built-in theme](./modules/styled.html#builtinthemename) or
  [custom theme](./interfaces/styled.theme.html)

# Usage

Simple usage

```jsx
import { TableWithProvider as Table, Head, Body, Row, Column } from '@jtable/core';

const App = () => (
  <Table data={[...]}>
    <Head>
      <Row>
        <Column columnId="#ID" accessor="id" />
        <Column columnId="Product" accessor="name" />
        <Column columnId="Price" accessor="price" />
        <Column columnId="Stock" accessor="stock" />
      </Row>
    </Head>
    // Body component will take care your data rendering by default.
    <Body />
  </Table>
);
```

Complex one

```jsx
import { TableWithProvider as Table, Head, Body, Row, Column, Cell } from '@jtable/core';

function quantize(value, fraction = 2) {
  const digits = [
    [9, 'b'],
    [6, 'm'],
    [3, 'k'],
  ];
  for (const [digit, unit] of digits) {
    const quantity = Math.pow(10, digit);
    const fixed = (value / quantity).toFixed(fraction);
    if (value >= quantity) return `${fixed}${unit}`;
  }
}

const App = () => (
  <Table data={[...]}>
    <Head>
      <Row>
        <Column columnId="#ID" accessor="id" />
        <Column columnId="Product" accessor="name" />
        <Column columnId="Price" accessor="price" />
        // improve readability of stock amount
        <Column columnId="Stock" accessor={quantize} />
        <Column columnId="Actions" />
      </Row>
    </Head>
    <Body>
      // Or provide specific content for certain cells.
      {(data) => (
        <Row>
          <Cell columnId="#ID" style={leftStickyStyle} />
          <Cell columnId="Product" />
          <Cell columnId="Price">{displayCurrency(data.price)}</Cell>
          <Cell columnId="Stock" />
          <Cell columnId="Actions">
            <a href={`product/${data.id}/edit`}>Edit</a>
          </Cell>
        </Row>
      )}
    </Body>
  </Table>
);
```

There are 3 kinds of usage for row components. You could find in [BodyProps](./interfaces/core_props.bodyprops.html).

@jtable/core provides 2 kinds of table components - [Table](./interfaces/core_props.tableprops.html) and TableWithProvider
Table component is a presentation component and TableWithProvider is composition of Table and [TableProvider](./interfaces/core_props.tableproviderprops.html).

For more examples, check [storybook](./storybook/index.html) out.

## Roadmap

List out features I haven't done but important.

- Configurable element type.<br />
  Like [material ui implmentation](https://github.com/mui-org/material-ui/blob/next/packages/material-ui/src/Table/Table.js#L49). Users can decide what kind of element to be used, and a11y still be taken care of.

- Core modularize.<br />
  Userland is hard to extend or add features from outside.
  But it may be possible if we refactor implementation with plugin architecture.
  Like [react-table](https://github.com/tannerlinsley/react-table/blob/master/examples/pagination/src/App.js#L66)

- Type components.<br />
  All generic types are fallback to default as unknown.
  Providing a way to type data is more friendly for TypeScript users.

- Auto infer table cells and its order.<br />
  It should be possible to prevent user list <Cell /> repeatedly.
  For example, unlisted cells will be auto-generated according columns.

```jsx
import { Table, Head, Body, Row, Column, Cell } from '@jtable/core';

const App = () => (
  <Table>
    <Head>
      <Row>
        <Column columnId="#ID" accessor="id" />
        <Column columnId="Product" accessor="name" />
        <Column columnId="Price" accessor="price" />
        <Column columnId="Stock" accessor={quantize} />
        <Column columnId="Actions" />
      </Row>
    </Head>
    <Body>
      // Or provide specific content for certain cells.
      {(data) => (
        <Row>
          <Cell columnId="#ID" style={leftStickyStyle} />
          // auto insert <Cell columnId="Product">
          <Cell columnId="Price">{displayCurrency(data.price)}</Cell>
          // auto insert <Cell columnId="Stock">
          <Cell columnId="Actions">
            <a href={`product/${data.id}/edit`}>Edit</a>
          </Cell>
        </Row>
      )}
    </Body>
  </Table>
);
```
