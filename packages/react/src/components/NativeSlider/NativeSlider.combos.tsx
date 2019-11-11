import { compose } from "@fluentui/native-compose";
import { INotchedSliderProps, NotchedSlider, INotchedSliderTokens, INotchedSliderType } from "./NativeSlider.notched";
import { IDualSliderTokens, DualNativeSlider } from "./NativeSlider.dual";
import { IComposableDefinition } from "@uifabricshared/foundation-composable";

export interface IDualNotchedSliderType {
  props: INotchedSliderProps;
  tokens: IDualSliderTokens & INotchedSliderTokens;
  slotProps: INotchedSliderType['slotProps'];
}

export const DualNotchedNativeSlider = compose<IDualNotchedSliderType>({
  slots: {
    root: { slotType: DualNativeSlider }
  } as IComposableDefinition<INotchedSliderProps, INotchedSliderType['slotProps']>['slots'],
  settings: [
    { tokens: { notchWidth: '70%' }}
  ]
}, NotchedSlider);