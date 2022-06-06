const withOptions = require('./src/theme/utils/default-options');
const options = withOptions();

const { mdx = true } = options;

module.exports = {
  siteMetadata: {
    siteTitle: 'Intrigue Photography and Gallery',
    siteTitleAlt: 'Intrigue Photography and Gallery',
    siteHeadline: 'Intrigue Photography and Gallery',
    siteUrl: 'https://intriguephotography.com.au/',
    siteDescription: 'Intrigue Photography and Gallery has a high level of expertise in a diverse range of photography,'
      +' combining artistic talent with a professional and friendly attitude.',
    siteLanguage: 'en',
    siteImage: '/logo-2.png',
    author: '@stage88',
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: options.projectsPath,
        path: `${__dirname}/${options.projectsPath}`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: options.pagesPath,
        path: `${__dirname}/${options.pagesPath}`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'common',
        path: `${__dirname}/src/assets/`,
      },
    },
    mdx && {
      resolve: 'gatsby-plugin-mdx',
      options: {},
    },
    {
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        trackingIds: [
          'G-8G4TVKDKJT',
        ],
        pluginConfig: {
          head: true,
        },
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-theme-ui',
    'gatsby-transformer-sharp',
  ],
};
