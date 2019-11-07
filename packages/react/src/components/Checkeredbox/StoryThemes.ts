import { ITheme, createTheme } from "@fluentui/react-theming";
const defaultColorRamp = {
  values: [],
  index: -1
};

export const fluentLight: ITheme = createTheme({
  direction: "ltr",
  colors: {
    background: "salmon",
    bodyText: "black",
    subText: "#333",
    disabledText: "#ccc",
    brand: {
      values: ["blue"],
      index: 0
    },
    accent: defaultColorRamp,
    neutral: defaultColorRamp,
    success: defaultColorRamp,
    warning: defaultColorRamp,
    danger: defaultColorRamp,
    text: defaultColorRamp
  },
  components: {},
  icons: {},
  radius: {
    base: 0,
    scale: 0,
    unit: "px"
  },
  fonts: {
    default: "",
    userContent: "",
    mono: ""
  },
  fontSizes: {
    base: 0,
    scale: 0,
    unit: "px"
  },
  animations: {
    fadeIn: {},
    fadeOut: {}
  },
  spacing: {
    base: 0,
    scale: 0,
    unit: "px"
  },

  schemes: {
    header: {
      colors: {
        background: "black",
        bodyText: "white"
      }
    }
  }
});

export const teamsLight: ITheme = createTheme(fluentLight, {
  colors: {
    background: "chartreuse",
    brand: {
      values: ["green"],
      index: 0
    }
  },
  components: {
      name: {
          tokens: {
              borderWidth: 20
          }
      }
  }
});
