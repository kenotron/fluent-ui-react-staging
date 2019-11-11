import { ISlotProps } from '@uifabricshared/foundation-settings';

export type IStyleFunction<TProps extends object, TTokens extends object, TTheme> = (tokens: TTokens, theme: TTheme) => TProps;

export interface IStyleEntry<TProps extends object, TTokens extends object, TTheme> {
  fn?: IStyleFunction<TProps, TTokens, TTheme>;
  keys?: (keyof TTokens)[];
};

export type AsObject<T> = T extends object ? T : object;

export type IStyleEntries<TProps extends object, TTokens extends object, TTheme> = 
  IStyleEntry<TProps, TTokens, TTheme> | IStyleEntry<TProps, TTokens, TTheme>[];

export type IStyles<TSlotProps extends ISlotProps, TTokens extends object, TTheme> = {
  [K in keyof TSlotProps]?: IStyleEntries<AsObject<TSlotProps[K]>, TTokens, TTheme>; 
};

/**
 * Style finalizer function.  Allows transforming props and styles before they are cached.  This could be used
 * to create css rules for the styles and changing the reference to be by class name
 */
export type IStyleFinalizer<TProps extends object> = (props: TProps, slotName: string, cacheInfo: ICacheInfo) => TProps;

/**
 * Resolved token definitions, ready to be rendered
 */
export interface IComponentTokens<TSlotProps extends ISlotProps, TTokens extends object, TTheme> {
  /** token keys put into a map for quick lookups */
  tokenKeys: { [key: string]: undefined };

  /** keys for each slot */
  slotKeys: { [K in keyof TSlotProps]?: (keyof TTokens)[] };

  /** styles to process */
  styles: IStyles<TSlotProps, TTokens, TTheme>;

  /** finalizer */
  finalizer?: IStyleFinalizer<TSlotProps['root']>;

  /** token cache key */
  tokenCacheKey: symbol;
}

export interface ICacheInfo {
  /** string to prepend for cache lookups */
  prefix: string;

  /** cache to use for looking up the cache entry */
  cache: object;

  /** for web name of the object to name created styles */
  displayName?: string;
}