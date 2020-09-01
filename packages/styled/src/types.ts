/**
 * @packageDocumentation
 * @module styled
 */
export type BuiltInThemeName = 'light' | 'dark';

export interface Theme {
  'table.background'?: string;
  'table.font-color'?: string;
  'head.background'?: string;
  'head.font-color'?: string;
  'foot.background'?: string;
  'foot.font-color'?: string;
  'row.background.hover'?: string;
  'row.font-color.hover'?: string;
  'column.color'?: string;
  /**
   * font color for sortable column
   */
  'column.color.sortable'?: string;
}

export interface ThemeProviderProps {
  theme: BuiltInThemeName | Theme;
}
