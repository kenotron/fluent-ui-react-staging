import { resolveCwd, argv } from 'just-scripts';
import path from 'path';

export function storybookConfigExists() {
  return !!resolveCwd('./.storybook/config.js');
}

export function startStorybookTask() {
  const { port } = argv();

  return async function() {
    const storybook = require('@storybook/react/standalone');
    await storybook({
      mode: 'dev',
      staticDir: [path.join(process.cwd(), 'static')],
      configDir: path.join(process.cwd(), '.storybook'),
      port: port || 3000
    });
  };
}

export async function buildStorybookTask() {
  const { port } = argv();

  return async function() {
    const storybook = require('@storybook/react/standalone');
    await storybook({
      mode: 'static',
      staticDir: [path.join(process.cwd(), 'static')],
      configDir: path.join(process.cwd(), '.storybook'),
      outputDir: path.join(process.cwd(), 'dist'),
      quiet: true,
      port: port || 3000
    });
  };
}
