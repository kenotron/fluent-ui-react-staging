import { IComposeSettings, IStyles, IComposeStyles } from "@fluentui/native-compose";
import { INativeSliderTokens, INativeSliderSlotProps, INativeSliderType } from "./NativeSlider.types";
import { ITheme } from "@fluentui/react-theming";

/**
 * This is the equivalent of the tokens + styles files from the fluent slider
 */

/**
 * Settings define the default values for the tokens (though they can also set props or style defaults)
 * 
 * This is just flat but settings can also be a function that takes a theme.
 */
export const settings: IComposeSettings<INativeSliderType> = [
    {
      tokens: {
        disabled: false,
        vertical: false,
        size: 28,
        railBorderRadius: 4,
        railColor: "rgb(200, 198, 196)",        
        railColorHovered: "rgb(222, 236, 249)",
        railColorPressed: "rgb(222, 236, 249)",
        railSize: 4,
        thumbBorderColor: "rgb(96, 94, 92)",
        thumbBorderColorHovered: "rgb(0, 90, 158)",
        thumbBorderRadius: 50,
        thumbBorderWidth: 2,
        thumbColor: "#FFF",
        thumbColorFocused: "#FFF",
        thumbColorHovered: "#FFF",
        thumbColorPressed: "#FFF",
        thumbSize: 16,
        trackBorderRadius: 4,
        trackColor: "rgb(96, 94, 92)",
        trackColorHovered: "rgb(0, 120, 212)",
        trackColorPressed: "rgb(0, 120, 212)",
        trackSize: 4
      },
      /** 
       * in the default mode, if the component has a prop called disabled that is truthy the override will be applied
       * If this is applied the root for style caching is changed so 'Slider' becomes 'Slider_disabled'
       */
      _precedence: ['disabled'],
      _overrides: {
        disabled: {
          tokens: {
            railColor: "rgb(243, 242, 241)",
            thumbBorderColor: "rgb(200, 198, 196)",
            trackColor: "rgb(161, 159, 157)",
            thumbColor: "#FFF",
          }
        }
      }
    },
    'Slider'
];

export const styles: IComposeStyles<INativeSliderType> = {
  /** styles are defined slot by slot, the keys denote the caching for the style classes.  If one key changes only affected styles need to be regenerated */
  root: {
    fn: (t: INativeSliderTokens) => {
      return { style: {
        position: "relative",
        height: t.vertical ? '100%' : t.size,
        ...(t.vertical ? { width: t.size } : {})
      }}
    },
    keys: ['vertical', 'size']
  },

  rail: {
    fn: (t: INativeSliderTokens) => {
      return { style: {
        position: "absolute",
        left: 0,
        right: 0,
        top: "50%",
        transform: "translateY(-50%)",
        width: "auto",
        height: t.railSize,
        borderRadius: t.railBorderRadius,
        backgroundColor: t.railColor,

        ".slider-root-vertical &": {
          left: "50%",
          right: "auto",
          top: 0,
          bottom: 0,
          transform: "translateX(-50%)",
          width: t.railSize,
          height: "100%"
        },

        ".slider-root:hover &, .slider-root-focused &": {
          backgroundColor: t.railColorHovered
        },

        ".slider-root:active &": {
          backgroundColor: t.railColorPressed
        }
      }}
    }, 
    keys: ['railSize', 'railBorderRadius', 'railColor', 'railColorHovered', 'railColorPressed']
  },

  track: { fn: (t: INativeSliderTokens) => {
    return { style: {
      position: "absolute",
      left: 0,
      top: "50%",
      transform: "translateY(-50%)",
      height: t.trackSize,
      backgroundColor: t.trackColor,
      borderRadius: t.trackBorderRadius,

      ".slider-root-vertical &": {
        left: "50%",
        top: "auto",
        bottom: 0,
        transform: "translateX(-50%)",
        width: t.trackSize
      },

      ".slider-root:hover &, .slider-root-focused &": {
        backgroundColor: t.trackColorHovered
      },

      ".slider-root:active &": {
        backgroundColor: t.trackColorPressed
      },
    }}; },
    keys: ['trackColor', 'trackBorderRadius', 'trackSize', 'trackColorHovered', 'trackColorPressed']
  },

  thumb: { fn: (t: INativeSliderTokens) => {
    return { style: {
      position: "absolute",
      transform: "translateX(-50%)",
      boxSizing: "border-box",
      width: t.size,
      height: t.size,

      ".slider-root-vertical &": {
        transform: "translateY(50%)"
      },

      "&:after": {
        content: '""',
        position: "absolute",
        height: t.thumbSize,
        width: t.thumbSize,
        borderRadius: t.thumbBorderRadius,
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: t.thumbColor,
        borderWidth: t.thumbBorderWidth,
        borderStyle: "solid",
        borderColor: t.thumbBorderColor
      },
    }}; },
    keys: ['size', 'thumbSize', 'thumbBorderColor', 'thumbBorderWidth', 'thumbBorderRadius', 'thumbColor']
  }
};
