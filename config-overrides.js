const { override, addBabelPlugins, addBabelPreset } = require('customize-cra');

module.exports = override(
    ...addBabelPlugins('emotion'),
    addBabelPreset('@emotion/babel-preset-css-prop'),
)