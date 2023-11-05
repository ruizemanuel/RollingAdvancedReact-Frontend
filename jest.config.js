// module.exports = {
//     testEnvironment: 'jest-environment-jsdom',
//     setupFiles: ['./jest.setup.js'],
//     moduleNameMapper: {
//         '^axios$': require.resolve('axios'),
//     },
// }

module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    setupFiles: ['./jest.setup.js'],
    transformIgnorePatterns: [],
    
    //ModuleNameMapper sólo si ocupamos importar CSS en nuestros componentes para el testing
    moduleNameMapper: {
        '\\.(css|less)$': '<rootDir>/test/mocks/styleMock.js',
        '^axios$': require.resolve('axios'),
    },
}