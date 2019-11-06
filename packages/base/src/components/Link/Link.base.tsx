import * as React from "react";
import { ILinkProps, ILinkSlots } from "./Link.types";
import { useLink } from "./useLink";

export const LinkBase = React.forwardRef((props: ILinkProps, componentRef: React.Ref<HTMLElement>) => {
  const { children, href, slots } = props;
    const {
        root: Root = href ? 'a' : 'button'
      } = slots || ({} as ILinkSlots);

    const { slotProps = {} } = useLink({ ...props, componentRef });

    return (
        <Root {...slotProps.root}>
            {children}
        </Root>
    );
});