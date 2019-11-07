## Mods to SD to make this compatible:

### All packages

- tsconfig.json modified to use proj refs (composite: true)
- ran yarn projrefs to autogenerate proj refs
- package.json
  - change to use @fluentui/scripts
  - change main fields
    - main: src/index.ts
    - remove module, jsnext:main
    - main fields are modified to allow editing before build / start
    - main fields will be modified pre-publish
  - delete types field
    - will be generated pre-publish
- fixes for ts3.3 -> ts3.7 upgrade
  - https://github.com/microsoft/TypeScript/issues/31661 everywhere!
  - Generic T extends Record<string, ???> will not allow someone to assign based on string index type anymore, effectively this pattern is meaningless... we have to cast at the time of assignment now

### @stardust-ui/react

- shouldEnterInnerZone is defined as `Function` AND `(ev: React.KeyboardEvent<HTMLElement>) => boolean` - this is incompatible
- factories.ts has issues with the ts3.3->ts3.7 WRT `Props<P>`:
  - http://www.typescriptlang.org/play/?ts=3.7-Beta#code/C4TwDgpgBA8gRgKwgY2DAZgHgCoD4oC8UA3lANoDWEIAXFAM7ABOAlgHYDmAundlAL4AoUJCgAFJgHsw9HIRL98RPgDJYiFGiwBDNiFyDD6AK5tULSWygdMYqBAAewCGwAm9ElGQAbbfXps2gC2EHSMrJwCuAAUAJQkglBJXpaMUGBSMnQS0rJiSgpQfuKZebgA3InJ0Rm5RR7wSKgYmLr6sWQA5AAWEN7ekp1c8j0snZXJ6aUAdD5+AcHQRKOdgkJAA
- Dropdown - search can be "true" or function

### @stardust-ui/react-docs

- copied src from fluent-ui/docs
- create a package.json based on stardust-ui/react
- require.context magic in .storybook/config.js
- references to code-editor and docs-components need to be replaced (removed?)
- replace docs-components useXYZKnobs and code-sandbox with storybook knobs
- remove index.ts/index.tsx files

### Tests

- had to comment out behavior-tests.ts in accessibility (depends on docs?)

### TODO

- @types rationalization - do we install from @fluent/scripts or inside the packages?
