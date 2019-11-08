import React from "react";
import { IButtonProps, IButtonSlots } from "./Button.types";
import { useButton } from "./useButton";

export const ButtonBase = React.forwardRef((props: IButtonProps, componentRef: React.Ref<HTMLElement>) => {
    const { children, href, slots } = props;
    const {
        endIcon: EndIcon = "i",
        root: Root = href ? 'a' : 'button',
        startIcon: StartIcon = "i"
    } = slots || ({} as IButtonSlots);

    const { slotProps = {} } = useButton({ ...props, componentRef });

    return (
        <Root {...slotProps.root}>
            <StartIcon {...slotProps.startIcon} />
            {children}
            <EndIcon {...slotProps.endIcon} />
        </Root>
    );
});