import { MenuItemProps } from "./MenuItem.types";
import { useMenuContext } from "./MenuContext";

export const useMenuItemState = (props: MenuItemProps) => {
  const context = useMenuContext();

  return {
    ...props,
    role: 'menuitem',
    tabindex: 0
  };
};