import * as React from "react";
import {useMenuItemState} from './useMenuItem'
import { MenuItemProps } from "./MenuItem.types";

// The div should be a slot to remove the AnchorMenuItem and reduce the amount of
// duplication
export function MenuItem(props: MenuItemProps) {
  const state = useMenuItemState(props);
  return (
    <div {...state}>
      {props.children}
    </div>
  );
}

export function AnchorMenuItem(props: MenuItemProps) {
  const state = useMenuItemState(props);
  return (
    <a {...state} >
      {props.children}
    </a>
  );
}

export function Divider() {
  return <hr aria-hidden={true}></hr>
}