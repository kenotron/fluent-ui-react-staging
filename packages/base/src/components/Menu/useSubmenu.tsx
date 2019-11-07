import * as React from 'react';
import {useMenuContext} from './MenuContext';
import { useOpenableContext, OpenableContext } from "./Openable";
import { MenuItemProps } from "./MenuItem.types";
import { SubmenuReducerArgs } from "./Menu.types";
import { useId } from "../../hooks/useId";

export type SubmenuItemProps = Omit<MenuItemProps, "onClick">;

export interface SubmenuProps {
    open?: boolean;
    id?: string;
    toggleSubmenu?: (id: string) => void;
}

export interface SubmenuState {
    open: boolean;
    id: string;
}

export const useSubmenuClick = (props: SubmenuItemProps): React.EventHandler<React.MouseEvent<HTMLElement>> => {
    const context = useMenuContext();
    const idcontext = useOpenableContext();
    const onClick = React.useCallback(()=> {context.submenuReducer!({id: idcontext.id!, action: 'toggle' })}, [context.submenusOpen, props.open]);
    return onClick;
}
export const useSubmenuMouseEnter = (props: SubmenuItemProps): React.EventHandler<React.MouseEvent<HTMLElement>> => {
    const context = useMenuContext();
    const idcontext = useOpenableContext();
    const onMouseEnter = React.useCallback(()=> {context.submenuReducer!({id: idcontext.id!, action: 'open' })}, [context.submenusOpen, props.open]);
    return onMouseEnter;
}

export const useSubmenuMouseLeave = (props: SubmenuItemProps): React.EventHandler<React.MouseEvent<HTMLElement>> => {
    const context = useMenuContext();
    const idcontext = useOpenableContext();
    const onMouseLeave = React.useCallback(()=> {context.submenuReducer!({id: idcontext.id!, action: 'close' })}, [context.submenusOpen, props.open]);
    return onMouseLeave;
}

export const useSubmenuItem = (props: SubmenuItemProps): MenuItemProps => {
    const context = useOpenableContext();
    const onClick = useSubmenuClick(props);
    const onMouseEnter = useSubmenuMouseEnter(props);
    const onMouseLeave = useSubmenuMouseLeave(props);
    return {
      ...props,
      id: context.id!,
      onClick,
      onMouseEnter,
      onMouseLeave
    };
};

export const useSubmenu = (props: SubmenuProps): SubmenuState => {
  const menuContext = useMenuContext();
  const id = useId(props.id);

  const isOpen = React.useMemo(()=> {
    return props.open === undefined ? !!menuContext.submenusOpen![id] : props.open;
  }, [menuContext.submenusOpen, props.open]);

//   const toggleSubmenu = React.useCallback(()=> {
//       props.toggleSubmenu === undefined ? menuContext.submenuReducer!({id, action: 'toggle'}) : props.toggleSubmenu(id);
//   }, [menuContext.submenusOpen, props.open]);

  return {
      open: isOpen,
      id: id
  };

};

export const useSubmenuList = () => {

};