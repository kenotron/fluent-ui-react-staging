import { action } from '@storybook/addon-actions'
import { LogFormatter } from './types'

const defaultFormatter: LogFormatter = (name: string) =>
  `${new Date().toLocaleTimeString()}: ${name}`

export const useLogKnob = <T extends Function = (...args: any[]) => any>(
  name: string,
  callback?: T,
  _formatter: LogFormatter = defaultFormatter,
): T => {
  const handler = action(name)

  if (callback) {
    return (function() {
      handler()
      return callback.apply(this, arguments)
    } as unknown) as T
  } else {
    return (handler as unknown) as T
  }
}
