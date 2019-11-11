/** @jsx withSlots */
import { INativeSliderTokens, INativeSliderSlotProps } from "./NativeSlider.types";
import { compose, IUseComposeStyling, IComposeSlots, IComposeRenderData } from "@fluentui/native-compose";
import { withSlots, IRenderData, IComposableDefinition } from "@uifabricshared/foundation-composable";
import { ISliderProps } from "@fluentui/base";
import { NativeSlider } from "./NativeSlider";

/**
 * This is a demo of replacing an intrinsic slot (like a 'div') with a component based slot.  This also demoes various forms
 * of style/tree compression
 */

export interface IDualSliderTokens extends INativeSliderTokens {
  barGap?: number;
}

export interface IMultiTrackRailProps extends IDualSliderTokens {
  style?: React.CSSProperties;
}

export interface IMultiTrackRailType {
  props: IMultiTrackRailProps;
  tokens: IDualSliderTokens;
  state: {
    barStyles: React.CSSProperties[];
    injectedStyle?: React.CSSProperties;
  };
  slotProps: {
    root: React.HTMLAttributes<HTMLDivElement>;
    bar: React.HTMLAttributes<HTMLDivElement>;
  }
}

/**
 * First create a track/rail base component, this is done because most of the style infrastructure is shared
 * between the track and the rail
 */
const TrackRailBase = compose<IMultiTrackRailType>({
  displayName: 'TrackRailBase',
  /** two slots, a root container and a bar that will be rendered twice for top and bottom */
  slots: { root: { slotType: 'div' }, bar: { slotType: 'div' } },
  styles: {
    /** root style pulls in the tokens, passed via props, and will create a style for the positioning */
    root: { fn: t => {
      return { style: {
        position: "absolute",
        left: 0,
        top: "50%",
        transform: "translateY(-50%)",
        height: (t.trackSize! * 2) + t.barGap!,
    
        ".slider-root-vertical &": {
          left: "50%",
          top: "auto",
          bottom: 0,
          transform: "translateX(-50%)",
          width: (t.trackSize! * 2) + t.barGap!
        }
      }}; },
      keys: ['trackSize', 'barGap']
    },
    /** base style for the bar as well, similar concept */
    bar: { fn: t => {
      return { style: {
        position: "absolute",
        left: 0,
        height: t.trackSize,
        width: '100%',

        ".slider-root-vertical &": {
          top: "auto",
          bottom: 0,
          width: t.trackSize,
          height: '100%'
        }
      }}
    }, keys: ['trackSize'] }
  },
  /**
   * this picks up the styling information, calculates the style offset values for each bar, then pulls in the injected style
   * from the props.  The injected style is used only for track where the width is being set dynamically
   */
  usePrepareProps: (props: IMultiTrackRailProps, useStyling: IUseComposeStyling<IMultiTrackRailType>) => {
    const offset = props.trackSize! + props.barGap!;
    const slotProps = useStyling(props);
    const barStyles: React.CSSProperties[] = [
      { [props.vertical ? 'left' : 'top']: 0 },
      { [props.vertical ? 'left' : 'top']: offset }
    ]
    return { slotProps, state: { barStyles, injectedStyle: props.style } };
  },
  /** render is pretty straightforward though the eslint rule is pretty dumb, maybe this should be renamed */
  // eslint-disable-next-line react/display-name
  render: (Slots: IComposeSlots<IMultiTrackRailType>, renderData: IComposeRenderData<IMultiTrackRailType>) => {
    const { barStyles, injectedStyle } = renderData.state!;
    return (
      <Slots.root style={injectedStyle}>
        <Slots.bar style={barStyles[0]} />
        <Slots.bar style={barStyles[1]} />
      </Slots.root>
    )
  }
});

/**
 * To turn this into a track just add the various colors to the bar, nothing needs to be done to root
 * 
 * This composes the base and the styles will be merged before they are turned into classes
 */
const MultiTrack = compose<IMultiTrackRailType>({
  displayName: 'MultiTrack',
  styles: {
    bar: { fn: t => {
      return { style: {
        backgroundColor: t.trackColor,
        borderRadius: t.trackBorderRadius,
    
        ".slider-root:hover &, .slider-root-focused &": {
          backgroundColor: t.trackColorHovered
        },
    
        ".slider-root:active &": {
          backgroundColor: t.trackColorPressed
        },
      }}
    }, keys: ['trackColor', 'trackBorderRadius', 'trackColorHovered', 'trackColorPressed']}
  }
}, TrackRailBase);

/**
 * For the rail, use different colors and update the root styling to ensure the positioning
 * 
 * This also composes the base using the same type of style merging
 */
const MultiRail = compose<IMultiTrackRailType>({
  displayName: 'MultiRail',
  styles: {
    root: [{ fn: t => {
      return { style: {
        left: 0,
        right: 0,
        width: 'auto',
    
        ".slider-root-vertical &": {
          left: "50%",
          right: 'auto',
          top: 0,
          bottom: 0,
          height: '100%'
        }
      }};}
    }],
    bar: { fn: t => {
      return { style: {
        backgroundColor: t.railColor,
        borderRadius: t.railBorderRadius,
    
        ".slider-root:hover &, .slider-root-focused &": {
          backgroundColor: t.railColorHovered
        },
    
        ".slider-root:active &": {
          backgroundColor: t.railColorPressed
        },
      }}
    }, keys: ['railColor', 'railBorderRadius', 'railColorHovered', 'railColorPressed']}
  }
}, TrackRailBase);

export interface IDualSliderType {
  props: ISliderProps;
  tokens: IDualSliderTokens;
  slotProps: INativeSliderSlotProps;
}

/**
 * This combines a bunch of concepts.  It replaces two simple div components, styled directly by the outer class, with complex components
 * that do styling internally.  Because everything is using compose the various sub-components never hit the react hierarchy, instead just
 * running through their logic and internal caching layers.
 */
export const DualNativeSlider = compose<IDualSliderType>({
  displayName: 'DualNativeSlider',
  /** Replace the 'div' types with the two sub-components */
  slots: {
    track: { slotType: MultiTrack },
    rail: { slotType: MultiRail },
  } as IComposableDefinition<ISliderProps, INativeSliderSlotProps>['slots'],
  /** Instead of creating styles, just forward the tokens to each of the sub-components */
  styles: {
    track: { keys: ['vertical', 'trackSize', 'trackColor', 'trackBorderRadius', 'trackColorHovered', 'trackColorPressed', 'barGap'] },
    rail: { keys: ['vertical', 'trackSize', 'railBorderRadius', 'railColor', 'railColorHovered', 'railColorPressed', 'barGap'] }
  },
  /** Patch the default values of slider.  This is layered on top of whatever NativeSlider provides */
  settings: [
    { tokens: { barGap: 4, trackSize: 4 } }
  ],
  usePrepareProps: (props: ISliderProps, useStyling: IUseComposeStyling<IDualSliderType>) => {
    return NativeSlider.__composable.usePrepareProps!(props as any, useStyling);
  }
}, NativeSlider);
