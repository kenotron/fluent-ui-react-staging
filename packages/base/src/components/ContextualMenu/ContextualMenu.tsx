import * as React from 'react';
import { Menu } from "../Menu/Menu";
import { subSingleReducer } from "../Menu/useMenu";
import { MenuItemProps } from "../Menu/MenuItem.types";
import { MenuItem, AnchorMenuItem, Divider } from "../Menu/MenuItem";
import { SubmenuItem, SubmenuList, Submenu } from "../Menu/Submenu";
import { useSubmenuItem} from "../Menu/useSubmenu";

export interface ContextualMenuItemProps extends MenuItemProps {
  subMenuProps?: ContextualMenuItemProps[];
  isDivider?: boolean;
}

export interface ContextualMenuProps {
    items: ContextualMenuItemProps[];
}

export const ContextualMenuWithSubmenuItem = (props: ContextualMenuItemProps) => {
    return <Submenu>
        <SubmenuItem>
        </SubmenuItem>
        <SubmenuList submenuManager={subSingleReducer}>
            <RenderItems items={props.subMenuProps || []}></RenderItems>
        </SubmenuList>
    </Submenu>;
};

export const RenderItems = (props: {items: ContextualMenuItemProps[]}) => {
    const { items } = props;
    const ret: JSX.Element[] = [];
    for (const item of items) {
      if (item.subMenuProps) {
        ret.push(
          <ContextualMenuWithSubmenuItem
            {...item}
          ></ContextualMenuWithSubmenuItem>
        );
      } else if (item.href) {
        ret.push(<AnchorMenuItem {...item}></AnchorMenuItem>);
      } else if (item.isDivider) {
        ret.push(<Divider></Divider>);
      } else {
        return <MenuItem {...item}> {item.label} </MenuItem>;
      }
    }
    return <> items </>;
};

export const ContextualMenu = (props: ContextualMenuProps) => {
    return <Menu submenuManager={subSingleReducer}>
        {
            <RenderItems items={props.items}/>
        }
    </Menu>;
};