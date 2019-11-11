import * as React from 'react';
import { ISlotProps, IComponentSettings, IOverrideLookup, mergeProps } from '@uifabricshared/foundation-settings';
import { getThemedSettings } from '@uifabricshared/themed-settings';
import { IWithComposable } from '@uifabricshared/foundation-composable';
import { IStylingSettings, IDefineUseStyling } from './compose.types';
import { useTheme } from '@fluentui/react-theming/src/themeContext';
import { ITheme } from '@fluentui/react-theming';
import jss from 'jss';
import { processTokens, buildComponentTokens } from './Token';
import { IComponentTokens, ICacheInfo } from './Token.types';

/* tslint:disable-next-line no-any */
export function getOptionsFromObj<TComponent>(obj: any): TComponent | undefined {
  const objType = obj && typeof obj;
  return ((objType === 'object' || objType === 'function') && (obj as IWithComposable<object, TComponent>).__composable) || undefined;
}

/**
 * Get the cache for the given component from the theme, creating it if necessary
 *
 * @param component - component to get the cache for, the component object itself will store the unique symbol for its lookups
 * @param theme - theme where the cache will be stored
 */
function _getComponentCache(cacheKey: symbol, theme: any): { [key: string]: ISlotProps } {
  theme[cacheKey] = theme[cacheKey] || {};
  return theme[cacheKey];
}

function _getSettingsFromTheme(theme: ITheme, name: string): IComponentSettings | undefined {
  //return getSettings(theme, name);
  return undefined;
}

const _noTheme: ITheme = {} as ITheme;

function useStylingCore<TProps extends object, TSlotProps extends ISlotProps, TTokens extends object>(
  props: TProps,
  options: IStylingSettings<TSlotProps, TTokens>,
  tokenInfo: IComponentTokens<TSlotProps, TTokens, ITheme>,
  name: string,
  lookupOverride?: IOverrideLookup
): TSlotProps {
  // get the theme value from the context (or the default theme if it is not set)
  const theme: ITheme = useTheme() || _noTheme;
  // get the cache for this component from the theme
  const cache = _getComponentCache(tokenInfo.tokenCacheKey, theme);
  const baseKey = options.displayName!;

  // resolve the array of settings for these options
  lookupOverride = lookupOverride || props;
  const { settings = {}, key } = getThemedSettings(options.settings!, theme, cache, baseKey, lookupOverride, _getSettingsFromTheme);

  // finish by processing the tokens
  return processTokens<TProps, TSlotProps, TTokens, ITheme>(props, theme, settings, tokenInfo, key, cache, name);
}

function _finalizeStyles<TProps extends object>(inputProps: TProps, slotName: string, cacheInfo: ICacheInfo): TProps {
  const props = inputProps as { style?: React.CSSProperties; className?: string };
  if (props && props.style) {
    const { style, ...rest } = props;
    const styles = { [slotName]: style };
    const sheet = jss.createStyleSheet(styles, { classNamePrefix: cacheInfo.displayName + '-' });
    sheet.attach();
    const className = Object.keys(sheet.classes).map(k => sheet.classes[k]).join(' ');
    const newProps = { className };
    return mergeProps(rest, newProps);
  }
  return inputProps;
}

/**
 * return a useStyling implementation, in the form of IUseComposeStyling, based on the passed in styleSettings.  The
 * styleSettings will be captured in the created closure and will be set up to enable the appropriate levels of caching.
 *
 * @param styleSettings - style settings to configure this function.  Note that this should be scoped to a single component.
 * @param name - optional base name to use as a cache key
 */
export function initializeStyling<TProps extends object, TSlotProps extends ISlotProps, TTokens extends object>(
  styleSettings: IStylingSettings<TSlotProps, TTokens>,
): IDefineUseStyling<TProps, TSlotProps, TTokens> {
  // process the tokens and get them ready to render
  const tokenInfo = buildComponentTokens<TSlotProps, TTokens, ITheme>(styleSettings.styles || {}, styleSettings.displayName!, _finalizeStyles);
  //styleSettings.resolvedTokens = buildComponentTokens<TSlotProps['root'], ITheme>(slots, _getHasToken(slots), _finalizeStyles);

  // create a useStyling implementation for this component type (per type, not per instance)
  return (props: TSlotProps['root'], lookupOverride?: IOverrideLookup) => {
    return useStylingCore<TProps, TSlotProps, TTokens>(props as TProps, styleSettings, tokenInfo, name, lookupOverride);
  };
}
