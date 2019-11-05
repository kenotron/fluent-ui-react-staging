import * as React from "react";
import { mergeSlotProps } from "../../utilities/mergeSlotProps";
import cx from "classnames";

export interface IPrimitiveProps extends React.AllHTMLAttributes<any> {
  as?: any;
  classes?: { root?: string };
}

export const PrimitiveBase = (
  props: React.PropsWithChildren<IPrimitiveProps>
) => {
  const { as: Root = "div", className, classes = {}, ...rest } = props;

  return <Root {...rest} className={cx(className, classes.root)} />;
};
