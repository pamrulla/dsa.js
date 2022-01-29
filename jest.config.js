module.exports = {
    bail: false,

    verbose: false,

    collectCoverage: false,

    coverageDirectory: './coverage/',

    testPathIgnorePatterns: ['<rootDir>/node_modules/'],

    coveragePathIgnorePatterns: ['<rootDir>/node_modules/'],

    testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.jsx?$',

    testURL: 'http://localhost/',

    coverageThreshold: {
        global: {
            statements: 100,
            branches: 95,
            functions: 100,
            lines: 100,
        },
    },
};
