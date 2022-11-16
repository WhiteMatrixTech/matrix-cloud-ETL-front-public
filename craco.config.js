/* eslint-disable node/no-unpublished-require */
// eslint-disable-next-line node/no-unpublished-require
const CracoLessPlugin = require('craco-less');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { whenProd } = require('@craco/craco');

module.exports = {
  reactScriptsVersion: 'react-scripts' /* (default value) */,
  style: {
    postcss: {
      mode: 'extends' /* (default value) */ || 'file',
      plugins: [require('postcss-preset-env')], // Additional plugins given in an array are appended to existing config.
      // plugins: (plugins) => [require('plugin-to-prepend')].concat(plugins), // Or you may use the function variant.
      env: {
        autoprefixer: {
          /* Any autoprefixer options: https://github.com/postcss/autoprefixer#options */
        },
        stage: 3 /* Any valid stages: https://cssdb.org/#staging-process. */,
        features: {
          /* Any CSS features: https://preset-env.cssdb.org/features. */
        }
      },
      loaderOptions: {
        /* Any postcss-loader configuration options: https://github.com/postcss/postcss-loader. */
      }
    }
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#F3B74F'
            },
            javascriptEnabled: true
          }
        },
        cssLoaderOptions: {
          modules: {
            localIdentName: '[path][name]__[local]--[hash:base64:5]'
          }
        }
      }
    }
  ],
  devServer: {
    https: true,
    useLocalIp: true,
    proxy: {
      '/notification': {
        target: 'https://api-dev.rivermen.io',
        changeOrigin: true
      },
      '/rivernft': {
        target: 'https://api-dev.rivermen.io',
        changeOrigin: true
      }
    }
  },
  webpack: {
    plugins: [
      ...whenProd(
        () => [
          new UglifyJsPlugin({
            uglifyOptions: {
              compress: {
                drop_debugger: true,
                drop_console: true
              }
            },
            sourceMap: false,
            parallel: true
          })
        ],
        []
      )
    ]
  }
};
