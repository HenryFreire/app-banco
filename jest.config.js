module.exports = {
  preset: 'react-native',
  setupFiles: ['./jest/setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-native-vector-icons|@react-navigation|react-native-modal|@react-native-community/datetimepicker)/)'
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/jest/__mocks__/fileMock.js',
  },
};
