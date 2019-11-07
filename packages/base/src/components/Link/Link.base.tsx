import * as React from "react";
import PropTypes from "prop-types";
import { ILinkProps, ILinkSlots } from "./Link.types";
import { useLink } from "./useLink";

export const LinkBase: React.FunctionComponent<ILinkProps> = (
  props: ILinkProps
) => {
  const { children, href, slots } = props;
    const {
        root: Root = href ? 'a' : 'button'
    } = (slots || {}) as ILinkSlots;

    const { slotProps = {} } = useLink(props);

    return (
        <Root {...slotProps.root}>
            {children}
        </Root>
    );
};