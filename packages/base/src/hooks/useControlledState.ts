import { useState } from 'react'

export const useControlledState = <T>(controlledValue: T, defaultValue: T) => {
  const [value, setValue] = useState(defaultValue)
  return [controlledValue === undefined ? value : controlledValue, setValue]
}
