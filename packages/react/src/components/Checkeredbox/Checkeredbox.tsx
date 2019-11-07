import * as React from "react";
import { ITheme } from "@fluentui/react-theming";

interface Props extends React.AllHTMLAttributes<HTMLElement> {}

const useTheme = (a: any, b: any) => {
  return "";
};

const useCheckeredboxState = (props: any, classNames: any) => {
  return {
    label: {},
    labelText: "",
    root: {},
    input: {
        type: "checkbox"
    }
  };
};

const tokens = {
  fontSize: 12
};

const styles = (theme: ITheme, tokens: any) => {
  return {};
};

export const Checkeredbox = (props: Props) => {
  const classNames = useTheme(tokens, styles);
  const state = useCheckeredboxState(props, classNames);

  return (
    <div {...state.root}>
      <label {...state.label}>
        <input {...state.input} /> {state.labelText}
      </label>
    </div>
  );
};
