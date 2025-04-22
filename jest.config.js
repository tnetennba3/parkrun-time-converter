const nextJest = require('next/jest');

const createJestConfig = nextJest({
    dir: './',
});

const customJestConfig = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    moduleDirectories: ['node_modules', '<rootDir>/'],
    testEnvironment: 'jsdom',
};

module.exports = createJestConfig(customJestConfig);