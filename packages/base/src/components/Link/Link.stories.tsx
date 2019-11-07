import React from "react";
import { LinkBase } from "./Link.base";

export default {
  component: "Link",
  title: "Base Link"
};

export const baseLink = () => (
  <LinkBase href="https://www.bing.com">
    This renders as a link
  </LinkBase>
);

export const baseLinkWithoutHref = () => (
  <LinkBase>
    This renders as a button
  </LinkBase>
); 