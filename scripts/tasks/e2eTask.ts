import { jestTask, resolveCwd } from 'just-scripts';
import path from 'path';

export function e2eTask() {
  return jestTask({
    runInBand: true,
    config: resolveCwd('jest.puppeteer.js'),
    env: {
      ...process.env,
      JEST_E2E_HEADLESS: 'true',
      JEST_E2E_SERVER: 'true',
      JEST_PUPPETEER_CONFIG: path.join(__dirname, '../config/jest/jest-puppeteer.config.js')
    }
  });
}

export function e2eWatchTask() {
  return jestTask({
    runInBand: true,
    config: resolveCwd('jest.puppeteer.js'),
    _: ['--watchAll'],
    env: {
      ...process.env,
      JEST_PUPPETEER_CONFIG: path.join(__dirname, '../config/jest/jest-puppeteer.config.js')
    }
  });
}
