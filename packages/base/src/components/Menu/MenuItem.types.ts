import * as React from 'react';
export interface IMenuItemProps extends React.AllHTMLAttributes<HTMLElement> {}
export type MenuItemProps = Omit<IMenuItemProps, 'role'>;