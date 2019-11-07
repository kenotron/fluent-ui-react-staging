import * as React from "react";
import {MenuContextState} from './Menu.types';

export const MenuContextObject = React.createContext<MenuContextState>({});

export const MenuContext = (props: React.PropsWithChildren<MenuContextState> )=> { 
    const {children, ...rest} = props;
    return <MenuContextObject.Provider value={rest}>{children}</MenuContextObject.Provider>;
};

export const useMenuContext = () => {
    const context = React.useContext(MenuContextObject);
    if(!context) {
        throw 'Menu is being used without context';
    }
    return context;
};