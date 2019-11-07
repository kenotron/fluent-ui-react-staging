import * as React from "react";
import {ContextualMenu} from './ContextualMenu';

export default {
  component: "ContextualMenu",
  title: "ContextualMenu"
};

export const basicMenu = () => {
    return <ContextualMenu items={[{label: "weee"}]}/>;
};