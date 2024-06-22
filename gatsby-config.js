/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */



module.exports = {
  plugins: [],
}



exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
if (stage === "build-html") {
  actions.setWebpackConfig({


    module: {
      rules: [
        {
          test: /Draggable/,
          use: loaders.null(),
        },
        {
          test: /bootstrap/,
          use: loaders.null(),
        },
        {
          test: /^@?(react-)?firebase(.*)/,
          use: loaders.null(),
        },
        {
          test: /firebase/,
          use: loaders.null(),
        },
        {
          test: /\.css/,
          use: [ 'style-loader', 'css-loader' ],
        }
      ],
    },

  })
}
}
