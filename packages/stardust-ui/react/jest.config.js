const config = require('@fluentui/scripts/config/jest/jest.stardust-ui')
module.exports = {
  ...config,
  name: 'react',
  moduleNameMapper: {
    'docs/(.*)$': `<rootDir>/../../docs/$1`,

    // Legacy aliases, they should not be used in new tests
    '^src/(.*)$': `<rootDir>/src/$1`,
    'test/(.*)$': `<rootDir>/test/$1`,
  },
}
