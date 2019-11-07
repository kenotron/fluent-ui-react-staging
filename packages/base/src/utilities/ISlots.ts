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
 * Defines the slot related props a component should inherit.
 */
export interface ISlottableProps<TSlotProps, TClasses> {
  classes?: Partial<TClasses>;
  slotProps?: Partial<TSlotProps>;
  slots?: TSlotProps;
}