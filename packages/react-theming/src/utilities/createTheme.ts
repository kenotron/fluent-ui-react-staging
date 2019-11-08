import { IPartialTheme } from "../theme.types";
import { merge } from "@uifabric/utilities";

export const createTheme = (...themes: IPartialTheme[]) => {
  let finalTheme: any = {};

  for (const theme of themes) {
    const { schemes, ...rest } = theme;

    merge(finalTheme, rest);

    finalTheme.schemes = {
      default: finalTheme
    };

    for (let schemeName in schemes) {
      const scheme = schemes[schemeName];

      finalTheme.schemes[schemeName] = merge({}, finalTheme, scheme);
    }
  }

  return finalTheme;
};
