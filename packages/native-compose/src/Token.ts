import { IComponentTokens, AsObject, IStyles, IStyleFinalizer, IStyleEntry, ICacheInfo } from './Token.types';
import { ISlotProps, IComponentSettings, mergeProps } from '@uifabricshared/foundation-settings';
import { ISettingsWithTokens } from './compose.types';

function asArray<T>(input?: T | T[]): T[] {
  return input ? (Array.isArray(input) ? input : [input]) : [];
}

/**
 * Take the input props and props from settings and return a merged set of token props (a single source
 * of truth) as well as an abbreviated collection with tokens that have been overridden from the user
 * props
 *
 * @param props - user props passed in to render
 * @param rootSlotProps - props for the root slot, this will have any tokens loaded from settings
 * @param tokenKeys - an object that contains the set of keys we care about for tokens on this component
 */
function _getTokenPropInfo<TSlotProps extends ISlotProps, TTokens extends object>(
  props: TTokens, 
  settings: ISettingsWithTokens<TSlotProps, TTokens>, 
  tokenKeys: { [key: string]: undefined }
): { tokens: TTokens, deltas: TTokens } {
  const tokens = { ...settings.tokens } as TTokens;
  const deltas = {} as TTokens;
  for (const keyAsString in tokenKeys) {
    const key: keyof TTokens = keyAsString as keyof TTokens;
    if (props.hasOwnProperty(key) && props[key] !== tokens[key]) {
      deltas[key] = tokens[key] = props[key];
    }
  }
  return { tokens, deltas };
}

function _buildTokenKey<TProps extends object>(deltas: TProps, keys: (keyof TProps)[], slotName: string, cacheInfo: ICacheInfo): string {
  const key = cacheInfo.prefix + '-' + slotName + '-';
  return key + keys.map(val => (deltas.hasOwnProperty(val) ? String(deltas[val]) : '')).join('-');
}

function _returnAsSlotProps<TSlotProps extends ISlotProps>(settings: IComponentSettings<TSlotProps>): TSlotProps {
  const { _precedence, _overrides, ...slotProps } = settings;
  return slotProps as TSlotProps;
}

/** an entry with keys and no function just means forward the keys */
function _copyKeysWorker<TTokens extends object>(t: TTokens, keys: (keyof TTokens)[]): TTokens {
  const result = {} as TTokens;
  keys.forEach(key => { if (t.hasOwnProperty(key)) { result[key] = t[key]; }});
  return result;
}

export function mergeStyleDefinitions<TSlotProps extends ISlotProps, TTokens extends object, TTheme>(
  newStyles?: IStyles<TSlotProps, TTokens, TTheme>,
  baseStyles?: IStyles<TSlotProps, TTokens, TTheme>
): IStyles<TSlotProps, TTokens, TTheme> {
  const styles: IStyles<TSlotProps, TTokens, TTheme> = { ...(baseStyles || {}) };
  if (newStyles) {
    for (const key in newStyles) {
      const newStyle = newStyles[key];
      if (newStyle) {
        styles[key] = [...asArray(styles[key])].concat(asArray(newStyle));
      }
    }
  }
  return styles;
}

export function buildComponentTokens<TSlotProps extends ISlotProps, TTokens extends object, TTheme>(
  styles: IStyles<TSlotProps, TTokens, TTheme>,
  name: string,
  finalizer?: IStyleFinalizer<TSlotProps['root']>
): IComponentTokens<TSlotProps, TTokens, TTheme> {
  const tokenKeys: IComponentTokens<TSlotProps, TTokens, TTheme>['tokenKeys'] = {};
  const slotKeys: IComponentTokens<TSlotProps, TTokens, TTheme>['slotKeys'] = {};
  const tokenCacheKey = Symbol(name);

  for (const slot in styles) {
    type IThisProp = AsObject<TSlotProps[Extract<keyof TSlotProps, string>]>;
    const styleSet: IStyleEntry<IThisProp, TTokens, TTheme>[] = asArray(styles[slot]);
    const thisSlotKeys: { [key: string]: boolean } = {};
    for (const style of styleSet) {
      if (style.keys) {
        style.keys.forEach(key => { tokenKeys[key as string] = undefined; thisSlotKeys[key as string] = true; });
      }
      if (!style.fn && style.keys) {
        style.fn = (t: TTokens) => { return _copyKeysWorker<TTokens>(t, style.keys!) as unknown as IThisProp; }
      }
    }
    slotKeys[slot] = Object.keys(thisSlotKeys) as (keyof TTokens)[];
  }
  return { tokenKeys, slotKeys, finalizer, styles, tokenCacheKey };
}

/**
 * Run through the end to end token workflow for render.  This will resolve the tokens and attempt to preempt style creation
 * by referencing values in the cache
 *
 * @param props - user props passed in and copied into a mutable object, these have precedence
 * @param theme - theme to get styling info from
 * @param slotProps - starting slotProps, the root entry may have token defaults filled in
 * @param tokenInfo - the set of token props as well as the shortened set that have been overridden
 * @param prefix - cache key to append token info to, this generally refers to the settings
 * @param cache - cache which holds the slotProps if they have been built before
 * @param displayName - optional component display name, used for class building
 * @param finalizer - optional function to process styles before caching happens
 */
export function processTokens<TProps extends object, TSlotProps extends ISlotProps, TTokens extends object, TTheme>(
  props: TProps,
  theme: TTheme,
  slotProps: ISettingsWithTokens<TSlotProps, TTokens>,
  tokenInfo: IComponentTokens<TSlotProps, TTokens, TTheme>,
  prefix: string,
  cache: any,
  displayName: string
): TSlotProps {
  // merge in tokens and build up the cache key which are the tokens overridden by the user
  slotProps = slotProps || {} as ISettingsWithTokens<TSlotProps, TTokens>;
  const { styles, tokenKeys, slotKeys, finalizer } = tokenInfo;
  const { tokens, deltas } = _getTokenPropInfo<TSlotProps, TTokens>(props as unknown as TTokens, slotProps, tokenKeys);
  const cacheInfo: ICacheInfo = { cache, prefix, displayName };
  const resolvedSlotProps: TSlotProps & { tokens?: TTokens } = _returnAsSlotProps(slotProps);
  resolvedSlotProps.tokens = tokens;

  for (const slot in styles) {
    const slotKeyList = slotKeys[slot] || [];
    const key = _buildTokenKey(deltas, slotKeyList!, slot, cacheInfo);
    type IThisProp = AsObject<TSlotProps[Extract<keyof TSlotProps, string>]>;
    
    if (!cache[key]) {
      const styleSet = asArray(styles[slot]);
      let newProps = styleSet.length > 0 ? mergeProps<IThisProp>(slotProps[slot], ...styleSet.map(style => {
        return style.fn ? style.fn(tokens, theme) : undefined;
      })) : slotProps[slot];
      if (finalizer) {
        newProps = finalizer(newProps as any, slot, cacheInfo) as IThisProp;
      }
      cache[key] = newProps;
    }
    resolvedSlotProps[slot] = cache[key];
  }

  return resolvedSlotProps;
}
