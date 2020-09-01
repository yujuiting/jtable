/**
 * @packageDocumentation
 * @internal
 */
import originalStyled, { ThemedStyledInterface, ThemedCssFunction, css as originalCss } from 'styled-components';
import type { BuiltInThemeName, Theme } from './types';

const styled = originalStyled as ThemedStyledInterface<Theme>;

export default styled;

export const css = originalCss as ThemedCssFunction<Theme>;

export const builtInThemes: Record<BuiltInThemeName, Theme> = {
  light: {
    'table.background': '#f5f5f5',
    'table.font-color': '#191919',
    'row.background.hover': '#191919',
    'row.font-color.hover': '#f5f5f5',
    'column.color.sortable': 'steelblue',
  },
  dark: {
    'table.background': '#191919',
    'table.font-color': '#f5f5f5',
    'row.background.hover': '#f5f5f5',
    'row.font-color.hover': '#191919',
    'column.color.sortable': 'steelblue',
  },
};
