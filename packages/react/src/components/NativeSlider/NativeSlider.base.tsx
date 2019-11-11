/** @jsx withSlots */
import * as React from 'react';
import { ISliderProps, useSlider } from "@fluentui/base";
import { composable, withSlots, IUseStyling, ISlots } from "@uifabricshared/foundation-composable";
import { mergeSettings } from '@uifabricshared/foundation-settings';

export const sliderClassNames: { [key: string]: string } = {
  root: 'slider-root',
  rootFocused: 'slider-root-focused',
  rootDisabled: 'slider-root-disabled',
  rootVertical: 'slider-root-vertical',
};

export interface ISliderSlotProps {
  /** Intended to contain the slider */
  root: ISliderProps & React.HTMLAttributes<HTMLDivElement>;
  /** Intended to provide a track space for the thumb to slide on */
  rail: React.HTMLAttributes<HTMLDivElement>;
  /** Intended to provide a selected track section from left to thumb. */
  track: React.HTMLAttributes<HTMLDivElement>;
  /** Intended to be a child of the track, where left represents a percentage */
  thumb: React.HTMLAttributes<HTMLDivElement>;
}

export const NativeSliderBase = composable<ISliderProps, ISliderSlotProps>({
  slots: {
    root: { slotType: 'div' },
    rail: { slotType: 'div' },
    track: { slotType: 'div' },
    thumb: { slotType: 'div' }
  },
  usePrepareProps: (props: ISliderProps, useStyling: IUseStyling<ISliderProps, ISliderSlotProps>) => {
    const { slotProps, state } = useSlider({ ...props, classes: sliderClassNames });
    // this order should be reversed but the tokens package is still bundling the wrong mergeSettings version
    return { slotProps: mergeSettings<ISliderSlotProps>(useStyling(props), slotProps), state };
  },
  // eslint-disable-next-line react/display-name
  render: (Slots: ISlots<ISliderSlotProps>, _renderData, ...children: React.ReactNode[]) => {
    return (
      <Slots.root>
        {...children}
        <Slots.rail />
        <Slots.track />
        <Slots.thumb />
      </Slots.root>
    );
  }
});
