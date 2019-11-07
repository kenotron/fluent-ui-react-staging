import { UseKnobOptions } from './types'
import { text } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

const useStringKnob = (options: UseKnobOptions<string>): [string, (value: string) => void] => {
  const knob = text(options.name, options.initialValue || '')
  const knobAction = action(options.name)
  return [knob, knobAction]
}

export { useStringKnob }
