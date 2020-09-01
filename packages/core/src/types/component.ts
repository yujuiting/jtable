/**
 * @packageDocumentation
 * @module core/props
 */
/* eslint-disable @typescript-eslint/no-empty-interface */
import type { ColumnInfo } from './context';

/**
 * @typeparam T Data type
 */
export interface TableProviderProps<T = unknown> {
  data?: T[];
  pageSize?: number;
}

/**
 * @internal
 * @typeparam T Data type
 */
export interface RowProviderProps<T = unknown> {
  data: T;
  index: number;
}

/**
 * `<Table>` represent a native <table> element.
 * All native attributes are worked.
 */
export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {}

/**
 * `<Head>` represent a native <thead> element.
 * All native attributes are worked.
 */
export interface HeadProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

/**
 * `<Foot>` represent a native <tfoot> element.
 * All native attributes are worked.
 */
export interface FootProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

/**
 * `<Body>` represent a native <tbody> element.
 * All native attributes are worked.
 *
 * @typeparam T Data type
 */
export interface BodyProps<T = unknown> extends React.HTMLAttributes<HTMLTableSectionElement> {
  /**
   * By default, `<Body>` render whole table through column configuration.
   * But you can still customize body rendering directly.
   * Follows are 3 ways of acceptable children format.
   *
   * We can customize row or cell style we need.
   * ```jsx
   * const CustomBody = () => (
   *   <Body>
   *     <Row style={rowStyle}>
   *       <Cell columnId="Name" style={primaryCellStyle} />
   *       <Cell columnId="Age" />
   *     </Row>
   *   </Body>
   * );
   * ```
   *
   * If multiple `<Row>` presented, it will be take orderly for row rendering.
   * ```jsx
   * const CustomBody = () => (
   *   <Body>
   *     <Row style={oddRowStyle}>
   *       <Cell columnId="Name" style={primaryCellStyle} />
   *       <Cell columnId="Age" />
   *     </Row>
   *     <Row style={evenRowStyle}>
   *       <Cell columnId="Name" style={primaryCellStyle} />
   *       <Cell columnId="Age" />
   *     </Row>
   *   </Body>
   * );
   * ```
   *
   * Or with a rendering function, you could even decide cell content.
   * ```jsx
   * const CustomBody = () => (
   *   <Body>
   *     {({ age }) => (
   *       <Row>
   *         <Cell columnId="Name" />
   *         <Cell columnId="Age">
   *           {age} {age > 1 ? 'years' : 'year'} old
   *         </Cell>
   *       </Row>
   *     )}
   *   </Body>
   * )
   * ```
   */
  children?:
    | React.ReactElement
    | React.ReactElement[]
    | ((data: T, index: number, collection: readonly T[]) => React.ReactNode);

  /**
   * if `children` did not presented, body will render data with givin Row component.
   */
  Row?: React.ComponentType<RowProps>;
}

/**
 * `<Row>` represent a native <tr> element.
 * All native attributes are worked.
 */
export interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  children?: React.ReactNode;
  /**
   * if `children` did not presented, body will render data with givin Cell component.
   */
  Cell?: React.ComponentType<CellProps>;
}

/**
 * `<Cell>` represent a native <td> element.
 * All native attributes are worked.
 */
export interface CellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  /**
   * if present, this cell will render through column configuration.
   */
  columnId?: string;
  children?: React.ReactNode;
}

/**
 * `<Column>` represent a native <th> element.
 * All native attributes are worked.
 * `<Column>` is also a configuration component. Check [[ColumnInfo]] for more detail.
 *
 * @typeparam T Data type
 */
export interface ColumnProps<T = unknown> extends React.ThHTMLAttributes<HTMLTableHeaderCellElement>, ColumnInfo<T> {
  /**
   * Sort icon will be rendered if this column has been selected as sort key.
   */
  sortIcon?: React.ReactNode;
}

/**
 * `<Caption>` represent a native `<caption>` element.
 * All native attributes are worked.
 */
export interface CaptionProps extends React.HTMLAttributes<HTMLTableCaptionElement> {}

/**
 * `<PagePrev>` represent a native `<button>` element, it used to navigate to previous page.
 * All native attributes are worked.
 */
export interface PagePrevProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

/**
 * `<PageNext>` represent a native `<button>` element, it used to navigate to next page.
 * All native attributes are worked.
 */
export interface PageNextProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

/**
 * `<PageFirst>` represent a native `<button>` element, it used to navigate to first page.
 * All native attributes are worked.
 */
export interface PageFirstProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

/**
 * `<PageLast>` represent a native `<button>` element, it used to navigate to last page.
 * All native attributes are worked.
 */
export interface PageLastProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

/**
 * `<PageNumber>` represent a native `<button>` element, it used to navigate to certain page.
 * All native attributes are worked.
 */
export interface PageNumberProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Which page this button will go to.
   */
  page: number;
}

/**
 * `<PageInfo>` represent a native `<span>` element, it used to present the current page and total page.
 * All native attributes are worked.
 */
export interface PageInfoProps extends React.HTMLAttributes<HTMLSpanElement> {}

/**
 * `<Pagination>` represent a native `<tr>` element.
 * It's a helper component for quick setup a pagination UI in <Table>.
 * `<Pagination>` is a `<Row>` component with a single `<Cell>`.
 * All native attributes are worked.
 */
export interface PaginationProps extends React.HTMLAttributes<HTMLTableRowElement> {}
