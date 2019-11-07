import * as React from "react";
import { ITheme, ThemeContext, resolveTokens, generateClassNames } from "@fluentui/react-theming";

interface Props extends React.AllHTMLAttributes<HTMLElement> {}
interface CheckeredboxState {
  label: any;
  labelText: string | undefined;
  root: React.HTMLAttributes<HTMLDivElement>;
  input: React.AllHTMLAttributes<HTMLInputElement>;
}

const useTheme = (name: string, a: tokensType, b: any) => {
  const themeContext = React.useContext(ThemeContext);
  if (!themeContext) {
    console.warn("u need theme");
    return {};
  } else {
    const tokens = resolveTokens(name, themeContext, [a]);
    const style = styles(tokens);
    return generateClassNames(style);
  }
};

const useCheckeredboxState = (
  props: Props,
  classNames: any
): CheckeredboxState => {
  return {
    label: {},
    labelText: props.label,
    root: {
        className: classNames.root
    },
    input: {
      type: "checkbox",
      checked: props.checked,
      onClick: props.onClick
    }
  };
};

const tokens = () => {
  return {
    fontSize: 12,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: (_: any, t: ITheme) => t.colors.brand.values[t.colors.brand.index]
  };
};

type tokensType = ReturnType<typeof tokens>;
type stylesType = ReturnType<typeof styles>;

const styles = (tokens: tokensType) => {
  return {
    root: {
      borderWidth: tokens.borderWidth,
      borderColor: tokens.borderColor,
      borderStyle: tokens.borderStyle
    },
    label: {
      fontSize: tokens.fontSize
    }
  };
};

export const Checkeredbox = (props: Props) => {
  const classNames = useTheme("name", tokens(), styles);
  const state = useCheckeredboxState(props, classNames);

  return (
    <div {...state.root}>
      <label {...state.label}>
        <input {...state.input} /> {state.labelText}
      </label>
    </div>
  );
};
