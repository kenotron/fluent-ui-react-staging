import { ITheme } from "../../theme.types";

// recipes (TODO: move these out.)
const backgroundColor = (t: ITheme) => t.colors.background;
const accessibleTextColor = (t: ITheme) => t.colors.neutral;
const defaultFontFamily = (t: ITheme) => t.fonts.default;

export const BoxStyles = {
  root: {
    background: backgroundColor,
    color: accessibleTextColor,
    fontFamily: defaultFontFamily
  }
};

export default BoxStyles;
