const path = require('path')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('ts-loader'),
        options: {
          transpileOnly: true,
          experimentalWatchApi: true,
          configFile: 'tsconfig.json',
        },
      },
      // Optional
      // {
      //   loader: require.resolve('react-docgen-typescript-loader')
      // }
    ],
  })
  config.resolve.extensions.push('.ts', '.tsx')
  config.plugins.push(new HardSourceWebpackPlugin())
  config.resolve.alias = {
    '@stardust-ui/docs-components': path.join(__dirname, '../src/components'),
    '@stardust-ui/code-sandbox': path.join(__dirname, '../src/codeSandbox'),
  }

  return config
}
