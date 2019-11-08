import { IClasses, ISlotProps, ISlottableProps } from "../../utilities/ISlots";

export interface ILinkSlots {
  /** Intended to contain the link. */
  root: React.ReactType;
}

export type ILinkSlotProps = ISlotProps<ILinkSlots>;

export interface ILinkClasses extends IClasses<ILinkSlots> {}

export interface ILinkProps extends ISlottableProps<ILinkSlotProps, ILinkClasses> {
  /** Defines the children of the Link component. */
  children?: React.ReactNode;

  /** Defines whether the Link is in an enabled or disabled state. */
  disabled?: boolean;

  /** Defines an href that serves as the navigation destination when clicking on the Link. */
  href?: string;
}