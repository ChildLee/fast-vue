module.exports = api => {
  api.cache(true)

  const presets = ['@babel/preset-env']
  const plugins = ['@babel/plugin-transform-runtime', '@babel/plugin-syntax-dynamic-import']

  return {
    presets,
    plugins,
  }
}
