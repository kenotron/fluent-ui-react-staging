import { ISliderSlotProps } from "./NativeSlider.base";
import { ISliderProps } from "@fluentui/base";

export interface INativeSliderTokens {
  disabled?: boolean;
  vertical?: boolean;
  railBorderRadius?: number;
  railColor?: string;
  // railColorDisabled: string;
  railColorHovered?: string;
  railColorPressed?: string;
  railSize?: number;
  size?: number;
  thumbBorderColor?: string;
  // thumbBorderColorDisabled: string;
  thumbBorderColorHovered?: string;
  thumbBorderRadius?: number;
  thumbBorderWidth?: number;
  thumbColor?: string;
  // thumbColorDisabled: string;
  thumbColorFocused?: string;
  thumbColorHovered?: string;
  thumbColorPressed?: string;
  thumbSize?: number;
  trackBorderRadius?: number;
  trackColor?: string;
  // trackColorDisabled: string;
  trackColorHovered?: string;
  trackColorPressed?: string;
  trackSize?: number;
}

export type INativeSliderSlotProps = ISliderSlotProps;

export interface INativeSliderType {
  props: ISliderProps;
  tokens: INativeSliderTokens;
  slotProps: INativeSliderSlotProps;
}