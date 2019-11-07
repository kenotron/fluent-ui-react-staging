import * as React from "react";

// TODO Extract this out into a more distinct and useful subunit

export interface Openable {
  open?: boolean;
  id?: string;
  setOpen?: () => void;
  onOpen?: () => boolean;
  onClose?: () => boolean;
}


export type OpenableActions = "open" | "close" | "toggle";

export interface OpenableArgs {
  action: OpenableActions;
}

const OpenableContextObject = React.createContext<Openable | undefined>(
  undefined
);

export const OpenableContext = (props: React.PropsWithChildren<Openable> )=> { 
    const {children, ...rest} = props;
    return <OpenableContextObject.Provider value={rest}>{children}</OpenableContextObject.Provider>;
};

export const useOpenableContext = () => {
    const context = React.useContext(OpenableContextObject);
    if(!context) {
        throw 'Openable is being used without context';
    }
    return context;
};

export function openableReducer(state: Openable, action: OpenableArgs) {
  switch (action.action) {
    case "open": {
      if (!state.open) {
        state.onOpen && state.onOpen();
        return { ...state, open: true };
      }
      return state;
    }
    case "close": {
      if (state.open) {
        state.onClose && state.onClose();
        return { ...state, open: false };
      }
      return state;
    }
    case "toggle": {
      if (state.open) {
        state.onClose && state.onClose();
        return { ...state, open: false };
      } else {
        state.onOpen && state.onOpen();
        return { ...state, open: true };
      }
    }
  }
}