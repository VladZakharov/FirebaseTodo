module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['transform-inline-environment-variables', {
      'exclude': 'NODE_ENV'
    }],
    '@babel/plugin-transform-runtime'
  ]
};
