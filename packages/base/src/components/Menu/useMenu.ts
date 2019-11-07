
import * as React from "react";
import {MenuContextState, MenuProps, SubmenuReducer} from './Menu.types';

export interface MenuState {
    root: React.AllHTMLAttributes<HTMLElement>;
    menuContext: MenuContextState;
}

// I like this, we need more stuff like this.
// const invalidChildren = (rootElement: HTMLElement) => {
//   for (let i = 0; i < rootElement.children.length; i++) {
//     const child = rootElement.children[i];
//     const role = child.attributes.getNamedItem("role");
//     if (
//       (!role && child.tagName !== "HR") ||
//       (!!role &&
//        (role.value !== "menuitem") &&
//        (role.value !== "presentation"))
//     ) {
//       console.warn("invalid role on menu elements");
//     }
//   }
// }
//   const menuRoot = React.useRef<HTMLDivElement>(null);
//   React.useEffect(() => {
//     invalidChildren(menuRoot.current!);
//   });

export const subReducer: SubmenuReducer = (state, args)=>{
    const {action, id} = args;
    const newMenus = { ...state };
    const open = !!newMenus[id];
  switch (action) {
    case "open": {
      if (!open) {
        newMenus[id] = true;
      }
      break;
    }
    case "close": {
      if (open) {
        newMenus[id] = false;
      }
      break;
    }
    case "toggle": {
      if (open) {
        newMenus[id] = false;
      } else {
        newMenus[id] = true;
      }
      break;
    }
  }
  return newMenus;
}

export const subSingleReducer: SubmenuReducer = (state, args)=>{
    const {action, id} = args;
    const newMenus = { ...state };
    const open = !!newMenus[id];
  switch (action) {
    case "open": {
      if (!open) {
        return {[id]: true};
      }
      break;
    }
    case "close": {
      if (open) {
        return {[id]: false};
      }
      break;
    }
    case "toggle": {
      if (open) {
        return {[id]: false};
      } else {
        return {[id]: true};
      }
    }
  }
  return newMenus;
}

export const useMenuState = (userProps: MenuProps): MenuState => {
  const {submenusOpen, submenuManager} = userProps;

  // #TODO make sure that if submenusOpen is passed in that that is the only value used.
  const [submenuState, changeSubmenuOpen] = React.useReducer(submenuManager || subReducer,  submenusOpen || {});
  
  // const submenuChangeCallback = React.useCallback((id: string)=> {
  //   changeSubmenuOpen({id, action: 'toggle'});
  // }, [submenuState]);

  return {
    root: {
      role: "menu",
      ...userProps
    },
    menuContext: {
      horizontal: userProps.horizontal,
      submenuReducer: changeSubmenuOpen,
      submenusOpen: submenuState
    }
  };
};