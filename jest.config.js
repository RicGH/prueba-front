/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
        '^.+\\.(js|jsx|mjs)$': 'babel-jest',
    },
    transformIgnorePatterns: [
        'node_modules/(?!(axios|react-toastify)/)',
    ],
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': '<rootDir>/styleMock.js',
    },
    
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
