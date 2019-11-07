import * as React from "react";
import { Menu} from "./Menu";
import { MenuProps } from './Menu.types';
import { MenuItem } from "./MenuItem";
import { useOpenableContext, OpenableContext } from "./Openable";
import { useSubmenuItem, SubmenuItemProps, useSubmenu, SubmenuProps } from "./useSubmenu";

// Should submenu use it's own context? It seems usefull to just use openAble instead
// There seems like there is a good chance that submenu will have additional things to
// track of
// export const SubmenuContext = React.createContext<OpenableState | undefined>(
//   undefined
// );



export function SubmenuItem(props: SubmenuItemProps) {
  const state = useSubmenuItem(props);

  return (
    <MenuItem
    {...state}
    >
      {props.children}
    </MenuItem>
  );
}

export function SubmenuList(props: MenuProps) {
  const context = useOpenableContext();
  return <>{context!.open && <Menu>{props.children}</Menu>}</>;
}

export function Submenu(props: React.PropsWithChildren<SubmenuProps>) {
  const state = useSubmenu(props);

  return (
    <OpenableContext open={state.open} id={state.id}>
      {props.children}
    </OpenableContext>
  );
}