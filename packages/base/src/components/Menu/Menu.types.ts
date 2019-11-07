import * as React from 'react';

export type SubmenuActions = "open" | "close" | "toggle";

export interface SubmenuReducerArgs {
  action: SubmenuActions;
  id: string;
}

export interface SubmenuState {
  [key: string]: boolean;
}

export type SubmenuReducer = (submenuState: SubmenuState, args: SubmenuReducerArgs ) => SubmenuState;

export interface MenuProps extends React.PropsWithChildren<React.AllHTMLAttributes<HTMLElement>>,  MenuContextState {
  submenuManager?: SubmenuReducer;
}

export interface MenuState {

}

export interface MenuContextState {
  submenusOpen?: {[key: string]: boolean};
  submenuReducer?: React.Dispatch<SubmenuReducerArgs>;
  activeItemKey?: string;
  horizontal?: boolean;
}