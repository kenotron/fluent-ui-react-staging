import parseValue from '../utils/parseRangeValue'

type UseRangeKnobSpecificOptions = {
  min?: number | string
  max?: number | string
  step?: number | string
  unit?: string
}
type UseRangeKnobOptions<T> = UseKnobOptions<T> & UseRangeKnobSpecificOptions

import { UseKnobOptions } from './types'
import { number } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

const useRangeKnob = <T extends number | string>(
  options: UseRangeKnobOptions<T>,
): [T, (value: T) => void] => {
  const { initialValue = 3 as T, min = 0, max = parseValue(initialValue), step = 1 } = options

  const unit = `${initialValue}`.replace(`${parseValue(initialValue)}`, '')

  const knob = number(options.name, parseValue(options.initialValue), {
    range: true,
    min: parseValue(min),
    max: parseValue(max),
    step: parseValue(step),
  })
  const knobAction = action(options.name)
  return [`${knob}${unit}` as T, knobAction]
}

export { useRangeKnob }
