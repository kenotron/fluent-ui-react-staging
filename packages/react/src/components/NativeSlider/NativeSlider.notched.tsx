/** @jsx withSlots */
import { INativeSliderTokens } from "./NativeSlider.types";
import { ISliderProps } from "@fluentui/base";
import { compose, IUseComposeStyling, IComposeSlots, IComposeRenderData } from "@fluentui/native-compose";
import { NativeSlider } from "./NativeSlider";
import { mergeSettings } from "@uifabricshared/foundation-settings";
import { withSlots } from "@uifabricshared/foundation-composable";

export interface INotchedSliderProps extends ISliderProps {
  notches?: number;
}

export interface INotchedSliderType {
  props: INotchedSliderProps;
  tokens: INativeSliderTokens & {
    notches?: number;
    notchWidth?: number | string;
    notchColor?: string;
  };
  slotProps: {
    root: ISliderProps & React.HTMLAttributes<HTMLDivElement>;
    notch: React.HTMLAttributes<HTMLDivElement>;
  };
  state: {
    vertical?: boolean;
    notchPos?: string[];
  }
}

export interface INotchedSliderTokens extends INativeSliderTokens {
  notches?: number;
  notchWidth?: number | string;
  notchColor?: string;
}

export const NotchedSlider = compose<INotchedSliderType>({
  displayName: 'NotchedSlider',
  slots: {
    root: { slotType: NativeSlider },
    notch: { slotType: 'div' }
  },
  settings: [
    { 
      tokens: {
        notchWidth: '50%',
        notches: 3,
        notchColor: '#b3b3b3'
      }
    }, 'NotchedSlider'
  ],
  styles: {
    root: {
      keys: ['vertical']
    },
    notch: { 
      fn: t => { return {
        style: {
          position: 'absolute',
          [t.vertical ? 'left' : 'top']: '50%',
          transform: t.vertical ? 'translateX(-50%)' : 'translateY(-50%)',
          width: t.vertical ? t.notchWidth : 1,
          height: t.vertical ? 1 : t.notchWidth,
          backgroundColor: t.notchColor
        }
      }},
      keys: ['notchWidth', 'vertical', 'notchColor']
    }
  },
  usePrepareProps: (props: INotchedSliderProps, useStyling: IUseComposeStyling<INotchedSliderType>) => {
    const forwarded = { root: props };
    const vertical = props.vertical;
    const styleProps = useStyling(props);
    const notches = props.hasOwnProperty('notches') ? props.notches : styleProps.tokens && styleProps.tokens.notches || 0;
    const notchPos: string[] = [];
    if (notches && notches > 1) {
      for (let i = 0; i < notches; i++) {
        const PosVal = 100 * (i / (notches - 1));
        notchPos.push(`${PosVal}%`);
      }
    }
    return { slotProps: mergeSettings<INotchedSliderType['slotProps']>(styleProps, forwarded), state: { vertical, notchPos } };
  },
  // eslint-disable-next-line react/display-name
  render: (Slots: IComposeSlots<INotchedSliderType>, renderData: IComposeRenderData<INotchedSliderType>, ...children: React.ReactNode[]) => {
    const { vertical, notchPos = [] } = renderData.state!;
    return (
      <Slots.root>
        {...children}
        {...notchPos.map(val => {
          return <Slots.notch style={{ [vertical ? 'top' : 'left']: val }} key={val} />;
        })}
      </Slots.root>
    );
  }
});