import { IComposeOptions, IComposeReturnType, IStylingSettings, ISettingsWithTokens, IExtractProps, IExtractTokens, IExtractStatics, IExtractState, IExtractSlotProps } from './compose.types';
import { composable, INativeSlotType, IComposableDefinition } from '@uifabricshared/foundation-composable';
import { initializeStyling, getOptionsFromObj } from './useStyling';
import { immutableMerge } from '@uifabricshared/immutable-merge';
import { ISlotProps } from '@uifabricshared/foundation-settings';
import { ISettingsEntry } from '@uifabricshared/themed-settings';
import { ITheme } from '@fluentui/react-theming'; 
import { mergeStyleDefinitions } from './Token';

/**
 * Merge current and base options together to form the new object definition.  These objects will merge with the
 * exception of settings which will be appended
 *
 * @param inputComponent - input component
 * @param base - component to use as a baseline (if it exists)
 */
function _getComponentOptions<TProps extends object, TSlotProps extends ISlotProps, TTokens extends object, TState extends object, TStatics extends object>(
  inputComponent: Partial<IComposeOptions<TProps, TSlotProps, TTokens, TState, TStatics>>,
  base?: IComposeOptions<TProps, TSlotProps, TTokens, TState, TStatics>
): IComposeOptions<TProps, TSlotProps, TTokens, TState, TStatics> {
  if (base) {
    return {
      ...immutableMerge(base, inputComponent),
      settings: ([] as object[]).concat(base.settings || [], inputComponent.settings || []).filter(v => v),
      styles: mergeStyleDefinitions<TSlotProps, TTokens, ITheme>(inputComponent.styles, base.styles)
    }
  }
  return inputComponent;
}

function _nameFromSettings<TSlotProps extends ISlotProps, TTokens extends object>(styleSettings: IStylingSettings<TSlotProps, TTokens>): string | undefined {
  const settings = styleSettings.settings || [];
  const names: string[] = settings.filter(v => typeof v === 'string').map(v => v as string);
  return names && names.length > 0 ? names.join('-') : undefined;
}

/**
 * Assembles a higher order component, optionally composing a base HOC or base primitive control.  The compose pattern
 * allows a greater degree of customization than is available via props and allows for customization without adding
 * additional layers to the react hierarchy.
 *
 * @param inputComponent - component definition for the component to be created.  See IComposeOptions for more details.
 * @param base - optional base component to compose, this can be an intrinsic, a stock element, or another composable
 */
export function compose<TTypes extends object>(
  inputComponent: Partial<IComposeOptions<IExtractProps<TTypes>, IExtractSlotProps<TTypes>, IExtractTokens<TTypes>, IExtractState<TTypes>, IExtractStatics<TTypes>>>,
  base?: INativeSlotType
): IComposeReturnType<IExtractProps<TTypes>, IExtractSlotProps<TTypes>, IExtractTokens<TTypes>, IExtractState<TTypes>, IExtractStatics<TTypes>> {
  // create local type aliases for the various types in here
  type IProps = IExtractProps<TTypes>;
  type ITokens = IExtractTokens<TTypes>;
  type IStatics = IExtractStatics<TTypes>;
  type IState = IExtractState<TTypes>;
  type IThisSlotProps = IExtractSlotProps<TTypes>;

  // get merged options for the component
  const options = _getComponentOptions<IProps, IThisSlotProps, ITokens, IState, IStatics>(inputComponent, base ? getOptionsFromObj(base) : undefined);
  options.displayName = options.displayName || _nameFromSettings(options) || 'anonymous';
  
  // set up the styling injection function
  options.useStyling = initializeStyling<IProps, IThisSlotProps, ITokens>(options);

  // use composable to create the function implementation
  const Component = composable(options as IComposableDefinition<IProps, IThisSlotProps, IState>) as IComposeReturnType<IProps, IThisSlotProps, ITokens, IState, IStatics>;

  // attach extra information to the returned function component
  Component.displayName = options.displayName;
  Object.assign(Component, options.statics);

  // set up the customize handler
  Component.customize = (...settings: ISettingsEntry<ISettingsWithTokens<IThisSlotProps, ITokens>, ITheme>[]) => {
    return compose(
      { settings },
      Component
    );
  };

  // set up the compose handler
  Component.compose = (newOptions: Partial<IComposeOptions<IProps, IThisSlotProps, ITokens, IState, IStatics>>) => {
    return compose<TTypes>(
      newOptions,
      Component
    );
  };

  // now return the newly created component
  return Component;
}
