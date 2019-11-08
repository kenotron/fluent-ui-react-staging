import { useTheme } from "./themeContext";
import { resolveTokens } from "./resolveTokens";
import jss from "jss";
import { ITheme } from "./theme.types";
type Options = any;
type SlotsAssignment = any;

/** _composeFactory returns a compose function.
 * This allows tests to override aspects of compose.
 *
 * @internal
 */
export const _composeFactory = (useThemeHook: any = useTheme) => {
  const composeInstance = <TProps = {}>(
    baseComponent: React.SFC<TProps>,
    options?: any
  ) => {
    const classNamesCache = new WeakMap();
    let optionsSet = [options];
    if (baseComponent && (baseComponent as any).__optionsSet) {
      optionsSet = [...(baseComponent as any).__optionsSet, options];
    }

    const renderFn = (baseComponent as any).__directRender || baseComponent;

    const name = options.name || "WARNING-UNNAMED";
    let mergedOptions = {};
    optionsSet.forEach(o => {
      mergedOptions = { ...mergedOptions, ...o };
    });

    const Component = (props: TProps) => {
      const theme: ITheme = useThemeHook();
      const slots = resolveSlots(name, optionsSet, theme);

      if (!theme) {
        throw new Error(
          "No theme specified. Plese provide a ThemeProvider. See aka.url/fluent-theming TODO for more detauls"
        );
      }

      return renderFn({
        ...props,
        classes: _getClasses(name, theme, classNamesCache, optionsSet),
        slots
      } as any);
    };

    for (const slotName in options.slots) {
      (Component as any)[slotName] = options.slots[slotName];
    }

    Component.propTypes = baseComponent.propTypes;
    Component.__optionsSet = optionsSet;
    Component.__directRender =
      (baseComponent as any).__directRender || baseComponent;

    Component.displayName = options.name || "Composed Component";

    return Component;
  };

  const resolveSlots = (
    name: string,
    optionsSet: Options[],
    theme: any
  ): SlotsAssignment => {
    const result = {};
    if (optionsSet && optionsSet.length > 0) {
      optionsSet.forEach(os => {
        if (os.slots) {
          Object.keys(os.slots).forEach(k => {
            (result as any)[k] = os.slots[k];
          });
        }
      });
    }
    if (
      theme &&
      theme.components &&
      theme.components[name] &&
      theme.components[name].slots &&
      typeof theme.components[name].slots === "object"
    ) {
      Object.keys(theme.components[name].slots).forEach(k => {
        (result as any)[k] = theme.components[name].slots[k];
      });
    }
    return result;
  };

  composeInstance.resolveSlots = resolveSlots;

  return composeInstance;
};

/**
 * Composed allows you to create composed components, which
 * have configurable, themable state, view, and slots. Composed
 * components can be recomposed.
 * @public
 */
export const compose = _composeFactory();

const _getClasses = (
  name: string,
  theme: ITheme,
  classNamesCache: WeakMap<any, any>,
  optionsSet: any[]
) => {
  let classes = classNamesCache.get(theme);

  if (!classes) {
    const tokens = resolveTokens(
      name,
      theme,
      optionsSet.map(o => o.tokens || {})
    );
    let styles: any = {};

    optionsSet.forEach((options: any) => {
      if (options && options.styles) {
        if (typeof options.styles === "function") {
          styles = { ...styles, ...options.styles(tokens) };
        } else {
          styles = { ...styles, ...options.styles };
        }
      }
    });

    // Create a stylesheet for this permutation.
    const sheet = jss.createStyleSheet(styles, {
      classNamePrefix: name + "-"
    });
    sheet.update(theme);
    sheet.attach();

    classes = sheet.classes;
    classNamesCache.set(theme, classes);
  }

  return classes;
};
