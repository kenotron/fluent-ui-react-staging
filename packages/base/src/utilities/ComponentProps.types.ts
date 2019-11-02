/**
 * Defines what a reference to an object can be.
 */
export declare type IRefObject<T> = React.RefObject<T> | RefObject<T> | ((ref: T | null) => void);
export declare type RefObject<T> = {
  (component: T | null): void;
  current: T | null;
};

/**
 * Defines the common set of props a component should inherit.
 */
export interface IComponentProps<T> {
  /** Defines a reference to access the T interface's public properties and methods. */
  componentRef?: IRefObject<T>;
}