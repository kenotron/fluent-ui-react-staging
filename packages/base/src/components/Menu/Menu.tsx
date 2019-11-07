import * as React from "react";
import { MenuContext } from "./MenuContext";
import { MenuProps } from "./Menu.types";
import { useMenuState } from "./useMenu";


export const Menu: React.FunctionComponent<MenuProps> = props => {

  const state = useMenuState(props);

  // This feels weird and somewhat like it tightly couples the menu with it's items
  // which I don't like.
  // OTOH it does provide the most important part of our menu, a way of keeping state
  // managed and consistent for it and all of it's children.
  return (
    <MenuContext {...state.menuContext}>
      <div {...state.root}></div>
    </MenuContext>
  );
};