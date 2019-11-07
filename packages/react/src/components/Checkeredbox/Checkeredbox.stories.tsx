
import React from "react";
import { Checkeredbox } from "./Checkeredbox";
import { ThemeProvider, ITheme } from "@fluentui/react-theming";
import {fluentLight, teamsLight} from './StoryThemes';

export default {
  component: "Checkeredbox",
  title: "Checkeredbox"
};

export const basic =  () => <Checkeredbox />
export const labeled =  () => <Checkeredbox label="this is a checkbox" />
export const checked =  () => <Checkeredbox checked={true} label="this is a checkbox" />
export const callback =  () => <Checkeredbox onClick={(e) => console.log(e)} label="check in the console" />
export const multiball = () => (
         <div>
           <ThemeProvider theme={fluentLight}>
             <Checkeredbox label="boorrinnngg" />
           </ThemeProvider>
           <ThemeProvider theme={teamsLight}>
             <Checkeredbox label="fancy color " />
           </ThemeProvider>
         </div>
       );