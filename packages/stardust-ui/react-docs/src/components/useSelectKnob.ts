import { UseKnobOptions } from './types'
import { select } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

type UseSelectKnobOptions<T extends string> = UseKnobOptions<T> & {
  allowsNone?: boolean
}

export const useSelectKnob = <T extends string = string>(
  options: UseSelectKnobOptions<T>,
): [T, (value: T) => void] => {
  const knob = select(options.name, options.values as string[], options.initialValue)
  const knobAction = action(options.name)
  return [knob as T, knobAction]
}
