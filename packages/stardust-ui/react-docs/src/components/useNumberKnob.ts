import { UseKnobOptions } from './types'
import { number } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

const useNumberKnob = (options: UseKnobOptions<number>): [number, (value: number) => void] => {
  const knob = number(options.name, options.initialValue || 0)
  const knobAction = action(options.name)
  return [knob, knobAction]
}

export { useNumberKnob }
