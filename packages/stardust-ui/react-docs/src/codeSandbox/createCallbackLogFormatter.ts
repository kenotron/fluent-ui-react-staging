import { LogFormatter } from 'src/components/types'

// TODO: (ken) need to remove the need for this with code mod if possible
export const createCallbackLogFormatter = (..._args: any[]): LogFormatter => {
  return (_name: string, ..._innerArgs: any[]) => ''
}
