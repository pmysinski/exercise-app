const config = {
  verbose: true,
  testEnvironment: "node",
  roots: ['<rootDir>'],
  testMatch: ["**/tests/integration/**/*.test.js"],
  globalSetup: '<rootDir>/tests/integration/global-setup.js',
  globalTeardown: '<rootDir>/tests/integration/global-teardown.js',
};



module.exports = config;