/**
 * Defines the 'classes' object based on TSlots props passed.
 */
export declare type IClasses<TSlots> = {
  [key in keyof TSlots]: string;
}

/**
 * Defines the 'slotProps' object based on TSlots props passed.
 */
export declare type ISlotProps<TSlots> = {
  [key in keyof TSlots]: {}; 
}

/**
 * Defines the set of slot related props a component should inherit.
 */
export interface ISlottableProps<TSlots, TClasses> {
  /** Defines a partial TClasses object that specifies user provided classnames for specific component classes. */
  classes?: Partial<TClasses>;

  /** Defines a partial TSlotProps object that specifies user provided props that are propagated to the corresponding slots. */
  slotProps?: Partial< ISlotProps<TSlots> >;
  
  /** Defines a TSlotProps object that  */
  slots?: TSlots;
}