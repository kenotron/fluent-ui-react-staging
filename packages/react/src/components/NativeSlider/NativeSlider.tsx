import { compose } from '@fluentui/native-compose';
import { NativeSliderBase } from './NativeSlider.base';
import { INativeSliderType } from './NativeSlider.types';
import { styles, settings } from './NativeSlider.settings';

export const NativeSlider = compose<INativeSliderType>({
  displayName: 'Slider',
  settings,
  styles
}, NativeSliderBase);