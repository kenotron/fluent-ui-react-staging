import React from "react";
import { NativeSlider } from "./NativeSlider";
import { NotchedSlider } from "./NativeSlider.notched";
import { DualNativeSlider } from "./NativeSlider.dual";
import { DualNotchedNativeSlider } from "./NativeSlider.combos";
// import { ThemeProvider } from "@fluentui/react-theming";

export default {
  component: "NativeSlider",
  title: "NativeSlider"
};

const Wrapper = (p: React.HTMLAttributes<any>) => (
  <div style={{ padding: 20, ...p.style }}>{p.children}</div>
);

export const fluentSlider = () => (
  <Wrapper>
    <NativeSlider
      defaultValue={50}
      slotProps={{ thumb: { "aria-label": "I am a slider" } }}
    />
  </Wrapper>
);

export const fluentSliderDisabled = () => (
  <Wrapper>
    <NativeSlider disabled defaultValue={50} />
  </Wrapper>
);

export const fluentVerticalSlider = () => (
  <Wrapper style={{ display: "flex", height: 200 }}>
    <NativeSlider vertical defaultValue={50} />
    <NativeSlider vertical defaultValue={50} />
    <NativeSlider vertical defaultValue={50} />
  </Wrapper>
);

export const fluentNotchedSlider = () => (
  <Wrapper>
    <NotchedSlider defaultValue={50} />
    <NotchedSlider notches={5} defaultValue={50} />
    <NotchedSlider notches={9} defaultValue={50} />
    <NotchedSlider notches={17} defaultValue={50} />
  </Wrapper>
)

export const fluentVerticalNotchedSlider = () => (
  <Wrapper style={{ display: "flex", height: 200 }}>
    <NotchedSlider vertical defaultValue={50} />
    <NotchedSlider vertical notches={5} defaultValue={50} /> 
    <NotchedSlider vertical notches={9} defaultValue={50} />
    <NotchedSlider vertical notches={17} defaultValue={50} />
  </Wrapper>
)

export const fluentDualSlider = () => (
  <Wrapper>
    <DualNativeSlider defaultValue={50} />
    <DualNotchedNativeSlider notches={9} defaultValue={50} />
  </Wrapper>
)

export const fluentVerticalDualSlider = () => (
  <Wrapper style={{ display: "flex", height: 200 }}>
    <DualNativeSlider vertical defaultValue={50} />
    <DualNotchedNativeSlider vertical notches={9} defaultValue={50} />
  </Wrapper>
)

// export const styledFluentSlider = () => (
//   <ThemeProvider
//     theme={{
//       components: {
//         Slider: {
//           tokens: {
//             trackColor: "green",
//             railColor: "red"
//           } as ISliderTokens
//         }
//       }
//     }}
//   >
//     <Slider />
//   </ThemeProvider>
// );
