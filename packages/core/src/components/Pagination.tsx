import React, { forwardRef, useCallback } from 'react';
import type * as Props from 'types';
import { setPageCurrent } from 'actions';

type PagePrevProps = Props.PagePrevProps & Props.WithTable;

type PageNextProps = Props.PageNextProps & Props.WithTable;

type PageFirstProps = Props.PageFirstProps & Props.WithTable;

type PageLastProps = Props.PageLastProps & Props.WithTable;

type PageNumberProps = Props.PageNumberProps & Props.WithTable;

type PageInfoProps = Props.PageInfoProps & Props.WithTable;

type PaginationProps = Props.PaginationProps & Props.WithTable;

export const PagePrev = forwardRef<HTMLButtonElement, PagePrevProps>(function PagePrev(props, ref) {
  const { table, ...rest } = props;
  const {
    dispatch,
    state: { pageCurrent },
  } = table;
  const disabled = pageCurrent <= 1;
  const onClick = useCallback(() => dispatch(setPageCurrent(pageCurrent - 1)), [dispatch, pageCurrent]);
  return <button onClick={onClick} disabled={disabled} {...rest} ref={ref} />;
});

export const PageNext = forwardRef<HTMLButtonElement, PageNextProps>(function PageNext(props, ref) {
  const { table, ...rest } = props;
  const {
    dispatch,
    state: { pageTotal, pageCurrent },
  } = table;
  const disabled = pageCurrent >= pageTotal;
  const onClick = useCallback(() => dispatch(setPageCurrent(pageCurrent + 1)), [dispatch, pageCurrent]);
  return <button onClick={onClick} disabled={disabled} {...rest} ref={ref} />;
});

export const PageFirst = forwardRef<HTMLButtonElement, PageFirstProps>(function PageFirst(props, ref) {
  const { table, ...rest } = props;
  const {
    dispatch,
    state: { pageCurrent },
  } = table;
  const disabled = pageCurrent === 1;
  const onClick = useCallback(() => dispatch(setPageCurrent(1)), [dispatch]);
  return <button onClick={onClick} disabled={disabled} {...rest} ref={ref} />;
});

export const PageLast = forwardRef<HTMLButtonElement, PageLastProps>(function PageLast(props, ref) {
  const { table, ...rest } = props;
  const {
    dispatch,
    state: { pageTotal, pageCurrent },
  } = table;
  const disabled = pageCurrent === pageTotal;
  const onClick = useCallback(() => dispatch(setPageCurrent(pageTotal)), [dispatch, pageTotal]);
  return <button onClick={onClick} disabled={disabled} {...rest} ref={ref} />;
});

export const PageNumber = forwardRef<HTMLButtonElement, PageNumberProps>(function PageNumber(props, ref) {
  const { table, page, ...rest } = props;
  const { dispatch } = table;
  const onClick = useCallback(() => dispatch(setPageCurrent(page)), [page, dispatch]);
  return <button onClick={onClick} {...rest} ref={ref} />;
});

export const PageInfo = forwardRef<HTMLSpanElement, PageInfoProps>(function PageInfo(props, ref) {
  const { table, ...rest } = props;
  const {
    state: { pageCurrent, pageTotal },
  } = table;
  return (
    <span {...rest} ref={ref}>
      {pageCurrent} / {pageTotal}
    </span>
  );
});

export const Pagination = forwardRef<HTMLTableRowElement, PaginationProps>(function Pagination(props, ref) {
  const { children, ...rest } = props;
  return (
    <tr {...rest} ref={ref}>
      <td colSpan={Number.MAX_SAFE_INTEGER}>{children}</td>
    </tr>
  );
});
