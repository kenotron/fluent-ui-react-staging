import * as React from 'react';
// Taken from https://github.com/OfficeDev/office-ui-fabric-react/blob/master/packages/react-hooks/src/useId.ts 
let id = 0;
export function useId(prefix?: string): string {
  // getId should only be called once since it updates the global constant for the next ID value.
  // (While an extra update isn't likely to cause problems in practice, it's better to avoid it.)
  const ref = React.useRef<string>();
  if (!ref.current) {
    if(!prefix) {
      id++;
      ref.current = id.toString(); 
    } else {
      ref.current = prefix;
    }
  }
  return ref.current;
}