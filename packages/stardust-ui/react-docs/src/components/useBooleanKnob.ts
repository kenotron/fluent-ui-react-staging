import { UseKnobOptions } from './types'
import { boolean } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

type UseBooleanKnobOptions = UseKnobOptions<boolean>

export const useBooleanKnob = (
  options: UseBooleanKnobOptions,
): [boolean, (value: boolean) => void] => {
  const knob = boolean(options.name, options.initialValue)
  const knobAction = action(options.name)
  return [knob, knobAction]
}
