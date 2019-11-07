const { defaults: tsjPreset } = require('ts-jest/presets');
const { resolveCwd } = require('just-scripts');

module.exports = {
  globalSetup: 'jest-environment-puppeteer/setup',
  globalTeardown: 'jest-environment-puppeteer/teardown',
  testEnvironment: 'jest-environment-puppeteer',
  setupFilesAfterEnv: ['expect-puppeteer'],
  transform: {
    ...tsjPreset.transform
  },
  testRegex: '(/__tests__/.*|\\.(scenarios|e2e|perf))\\.(ts|tsx)$',
  globals: {
    'ts-jest': {
      isolatedModules: true,
      tsConfig: resolveCwd('tsconfig.json'),
      packageJson: resolveCwd('package.json')
    }
  }
};
