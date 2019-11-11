import { IRenderData, IComposableDefinition, ISlots } from '@uifabricshared/foundation-composable';
import { ISlotProps, IComponentSettings, IOverrideLookup } from '@uifabricshared/foundation-settings';
import { ISettingsEntry } from '@uifabricshared/themed-settings';
import { ITheme } from '@fluentui/react-theming';
import * as React from 'react';
import { IStyles } from './Token.types';

interface IPropsFragment<TProps extends object> { props: TProps; }
interface ITokensFragment<TTokens extends object> { tokens: TTokens; }
interface IStateFragment<TState extends object> { state: TState; }
interface IStaticsFragment<TStatics extends object> { statics: TStatics; }
interface ISlotPropsFragment<TSlotProps extends ISlotProps<object>> { slotProps: TSlotProps; }

// required fragments, returns never if non-existent
export type IExtractProps<T> = T extends IPropsFragment<infer U> ? U : never;
export type IExtractSlotProps<T> = T extends ISlotPropsFragment<infer U> ? U : never;

// non-required fragments
export type IExtractTokens<T> = T extends ITokensFragment<infer U> ? U : object;
export type IExtractState<T> = T extends IStateFragment<infer U> ? U : object;
export type IExtractStatics<T> = T extends IStaticsFragment<infer U> ? U : object;

export interface IComposeType<TProps extends object, TSlotProps extends ISlotProps<object>, TTokens extends object = object, TState extends object = object, TStatics extends object = object> {
  props: TProps;
  slotProps: TSlotProps;
  tokens: TTokens;
  state: TState;
  statics: TStatics;
}

/**
 * Function signature for useStyling as implemented by compose.  This adds the lookup function to enable
 * more control over how overrides are applied.
 */
export type IDefineUseStyling<TProps extends object, TSlotProps extends ISlotProps, TTokens extends object = object> = (props: TProps, lookup?: IOverrideLookup) => TSlotProps & { tokens?: TTokens };
export type IUseComposeStyling<TComponent> = IDefineUseStyling<IExtractProps<TComponent>, IExtractSlotProps<TComponent>, IExtractTokens<TComponent>>;

export type IComposeSlots<TComponent> = ISlots<IExtractSlotProps<TComponent>>;
export type IComposeRenderData<TComponent> = IRenderData<IExtractSlotProps<TComponent>, IExtractState<TComponent>>;

/**
 * Type to add tokens to settings
 */
export type ISettingsWithTokens<TSlotProps extends ISlotProps, TTokens extends object> = IComponentSettings<TSlotProps & { tokens: TTokens }>;

/**
 * Array of:
 *  IComponentSettings for the component
 *  string - name of the entry to query in the theme
 *  `theme => IComponentSettings` function
 *
 * These settings are layered together in order to produce the merged settings for a component
 */
export type IDefineComposeSettings<TSlotProps extends ISlotProps, TTokens extends object> = ISettingsEntry<ISettingsWithTokens<TSlotProps, TTokens>, ITheme>[];
export type IComposeSettings<TComponent> = IDefineComposeSettings<IExtractSlotProps<TComponent>, IExtractTokens<TComponent>>;

export type IComposeStyles<TComponent> = IStyles<IExtractSlotProps<TComponent>, IExtractTokens<TComponent>, ITheme>;

/**
 * Settings which dictate the behavior of useStyling, as implemented by the compose package.  These are
 * separated from IComponentOptions to allow the styling portion to be used independently if so desired.
 */
export interface IStylingSettings<TSlotProps extends ISlotProps, TTokens extends object> {
  /**
   * Optional display name to set on the component
   */
  displayName?: string;

  /**
   * settings used to build up the style definitions
   */
  settings?: IDefineComposeSettings<TSlotProps, TTokens>;

  /**
   * Styles object, to make setting styleFactories easier in some scenarios
   * NEW ADDITION FROM NATIVE
   * - just playing with this now
   */
  styles?: IStyles<TSlotProps, TTokens, ITheme>;
}

/**
 * Options to be used with compose.  These drive the actual behavior of the component and are comprised of styling
 * options as well as options which configure composable.
 */
export interface IComposeOptions<
  TProps extends object = object,
  TSlotProps extends ISlotProps = ISlotProps<TProps>,
  TTokens extends object = object,
  TState extends object = object,
  TStatics extends object = object
  > extends Omit<IComposableDefinition<TSlotProps['root'], TSlotProps, TState>, 'useStyling'>, IStylingSettings<TSlotProps, TTokens> {
  /**
   * Add an additional option to use styling to allow for injecting override lookup functions
   */
  useStyling?: IDefineUseStyling<TProps, TSlotProps, TTokens>;

  /**
   * Use prepare props will take the more opinionated version of useStyling
   */
  usePrepareProps?: (props: TSlotProps['root'], useStyling: IDefineUseStyling<TProps, TSlotProps, TTokens>) => IRenderData<TSlotProps, TState>;

  /**
   * Optional statics to attach to the component.  This is primary used to attach a sub-component to a parent component
   */
  statics?: TStatics;
}

/**
 * The signature of the component returned from compose.
 */
export type IComposeReturnType<
  TProps extends object,
  TSlotProps extends ISlotProps,
  TTokens extends object,
  TState extends object = object,
  TStatics extends object = object
  > = React.FunctionComponent<TProps> &
  TStatics & {
    /**
     * composable options, used by composable for chaining objects.  For compose this also includes the extensions
     * such as settings or token information.
     */
    __composable: IComposeOptions<TProps, TSlotProps, TTokens, TState, TStatics>;

    /**
     * shorthand function for doing quick customizations of a component by appending to settings
     */
    customize: (...settings: IDefineComposeSettings<TSlotProps, TTokens>) => IComposeReturnType<TProps, TSlotProps, TTokens, TState, TStatics>;

    /**
     * helper function to quickly add new partial options to the base component.  The primary advantage is that
     * this is strongly typed for the component type which avoids needing to pass all the type parameters correctly.
     */
    compose: (
      newOptions: Partial<IComposeOptions<TProps, TSlotProps, TTokens, TState, TStatics>>
    ) => IComposeReturnType<TProps, TSlotProps, TTokens, TState, TStatics>;
  };
