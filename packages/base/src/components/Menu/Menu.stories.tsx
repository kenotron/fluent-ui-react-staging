import * as React from "react";
import { Menu } from "./Menu";
// import { Divider } from "./Divider";
import { MenuItem, AnchorMenuItem } from "./MenuItem";
import { SubmenuItem, SubmenuList, Submenu } from "./Submenu";

export default {
  component: "Menu",
  title: "Menu"
};

const FancyItem =()=> {
  const [state, useState] = React.useState(false);
return <span> 
  <button onClick = {(ev) => {useState(!state); ev.preventDefault(); ev.stopPropagation();}}>
{state ? 'checked' : 'unckeced'}
  </button>
  Some text
</span>;
}

export const basicMenu = () => {
  const [open, setOpen] = React.useState(true);
  return (
    <div style={{ width: "300px", border: "1px solid grey" }}>
      <Menu
        onClick={() => {
          console.log("Menu clicked");
        }}
      >
        <MenuItem> First element</MenuItem>
        <MenuItem>
          <FancyItem></FancyItem>
        </MenuItem>
        <hr aria-hidden="true"></hr>
        {/* <Divider /> */}
        <AnchorMenuItem href={"https://www.bing.com"}> Click me</AnchorMenuItem>
        <Submenu id={"foo"}>
          <SubmenuItem>Submenu1</SubmenuItem>
          <SubmenuList>
            <MenuItem>I am in A submenu</MenuItem>
          </SubmenuList>
          <SubmenuList>
            <MenuItem>I am in A different submenu</MenuItem>
          </SubmenuList>
        </Submenu>
        <Submenu
          open={open}
          toggleSubmenu={() => {
            setOpen(!open);
          }}
        >
          <SubmenuItem>Submenu2</SubmenuItem>
          <div role="menuitem" style={{ textAlign: "center" }}>
            <SubmenuList>
              <MenuItem>I am in A submenu2</MenuItem>
              <Submenu>
                <SubmenuItem>
                  <FancyItem></FancyItem> >
                </SubmenuItem>
                <SubmenuList>
                  <MenuItem>I am in A submenu3</MenuItem>
                </SubmenuList>
              </Submenu>
            </SubmenuList>
          </div>
        </Submenu>
      </Menu>
    </div>
  );
    }