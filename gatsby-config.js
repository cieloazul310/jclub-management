module.exports = {
  siteMetadata: {
    title: `Jクラブ経営情報2005-2019`,
    description: `Jリーグクラブの経営情報をクラブ別・年別に閲覧できるページ`,
    author: `@cieloazul310`,
    siteUrl: `https://cieloazul310.github.io/jclub-financial-table/`,
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-top-layout',
      options: {
        siteId: 'jclub-financial-report',
      },
    },
    `gatsby-plugin-material-ui`,
    `gatsby-plugin-graphql-codegen`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'frames',
        path: `./data/frames`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'dataset',
        path: `./data/dataset`,
      },
    },
    {
      resolve: `gatsby-transformer-yaml`,
      options: {
        typeName: ({ node }) => {
          return node.sourceInstanceName === 'dataset'
            ? `dataset`
            : node.relativePath === 'clubs.yml'
            ? `clubsYaml`
            : node.relativePath === 'years.yml'
            ? `yearsYaml`
            : node.relativePath === 'dict.yml'
            ? `dictYaml`
            : `yaml`;
        },
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-74683419-3',
      },
    },
    {
      resolve: `gatsby-plugin-google-adsense`,
      options: {
        publisherId: 'ca-pub-7323207940463794',
      },
    },
    {
      resolve: `gatsby-plugin-eslint`,
      options: {
        test: /\.js$|\.jsx$|\.ts$|\.tsx$/,
        exclude: /(node_modules|.cache|public)/,
        stages: ['develop'],
        options: {
          emitWarning: true,
          failOnError: false,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Jクラブ経営情報2005-2019`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-sitemap`,
  ],
};
