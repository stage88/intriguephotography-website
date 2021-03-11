module.exports = {
  siteMetadata: {
    title: 'Intrigue Photography and Gallery',
    description: 'Intrigue Photography and Gallery has a high level of expertise in a diverse range of photography'
      +', combining artistic talent with a professional and friendly',
    author: 'Sam Ilic',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-styled-components',
      options: {
        minify: false, // Breaks styles if not set to false
      },
    },
    'gatsby-plugin-react-helmet',
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
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: `${__dirname}/src/data/`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-60941248-1',
      },
    },
  ],
};
