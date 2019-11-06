import { useImperativeHandle, useRef } from "react";
import { mergeSlotProps } from "@fluentui/react-theming";
import { IStateProps } from "../../utilities/Slots.types";
import { ILinkProps } from "./Link.types";

export interface ILinkState {
  rootRef: React.Ref<Element>;
}

const useLinkState = (userProps: IStateProps<ILinkProps>): ILinkState => {
  const { componentRef } = userProps;
  
  const rootRef = useRef<HTMLElement>(null);

  useImperativeHandle(componentRef, () => ({
    focus: () => {
      rootRef.current && rootRef.current.focus();
    }
  }));

  return { 
    rootRef
  };
};

export const useLink = (props: IStateProps<ILinkProps>) => {
  const { disabled, href } = props;

  const state = useLinkState(props);
  const { rootRef } = state;

  const slotProps = mergeSlotProps(props, {
    root: {
      "aria-disabled": disabled,
      href,
      ref: rootRef,
      role: "link",
      type: href ? "link" : "button"
    }
  })

  return {
    slotProps,
    state
  };
};