import { configure } from '@storybook/react'
import { addDecorator } from '@storybook/react'

import { withA11y } from '@storybook/addon-a11y'
import { withKnobs } from '@storybook/addon-knobs'
import { withActions } from '@storybook/addon-actions'

import React from 'react'

import { Provider, themes, mergeThemes } from '@stardust-ui/react'

addDecorator(withKnobs())
addDecorator(withA11y())
addDecorator(withActions())

// Adds stardust theme
addDecorator(story => (
  <Provider
    as={React.Fragment}
    theme={mergeThemes(themes.fontAwesome, themes['teams'], {
      staticStyles: [
        {
          a: {
            textDecoration: 'none',
          },
        },
      ],
    })}
  >
    {story()}
  </Provider>
))

export const req = require.context(
  '../src/examples/components',
  true,
  /(\w+Example(\w|\.)*|\w+.perf)\.tsx$/,
)

function isFunctionalComponent(Component) {
  return !Component.prototype.render
}

function loadStories() {
  const stories = new Map()
  const nameMatcher = /\.\/([^/]+)\//

  req.keys().forEach((/** @type {string} */ key) => {
    const matches = key.match(nameMatcher)

    if (matches) {
      const componentName = matches[1]
      if (!stories.has(componentName)) {
        stories.set(componentName, {
          default: {
            title: componentName,
          },
        })
      }

      const storyName = key.substr(key.lastIndexOf('/') + 1).replace('.tsx', '')
      const story = stories.get(componentName)

      const Component = req(key).default

      if (Component) {
        if (isFunctionalComponent(Component)) {
          story[storyName] = Component
        } else {
          story[storyName] = () => <Component />
        }
      }
    }
  })

  return [...stories.values()]
}

configure(loadStories, module)
