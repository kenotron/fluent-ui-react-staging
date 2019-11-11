# `@fluentui/react-theming`

The Fluent UI React theming package allows developers to build libraries that can be themed according to a common contract.

## Usage

```
const reactCompose = require('react-theming');

// TODO: DEMONSTRATE API
```

## Concerns

 When building UX, you often need a slightly different styling or token set in specific circumstances. Using `compose` for every permutation may be problematic.

 What if we instead just allowed the `themedName` to be specified as a prop. Ultimately this would act as if recomposing a one-off themed component.

 Instead of this:

 ```tsx
 const SlightlyDifferentSlider = compose(Slider, {
   name: 'SlightglyDifferentSlider'
 });

loadBaseTheme({
  components: {
    SlightlyDifferentSlider: {
      tokens: {
        railSize: 20
      }
    }
  }
});

```

You could 
