const server = {
  command: 'yarn just e2e:server',
  launchTimeout: 5000,
  port: 3456
};

const e2eServer = process.env.JEST_E2E_SERVER;
const headless = process.env.JEST_E2E_HEADLESS;

module.exports = {
  ...(e2eServer && { server }),
  launch: {
    dumpio: true,
    headless
  },
  browserContext: 'default'
};
