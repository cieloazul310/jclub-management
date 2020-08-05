const blue = require('@material-ui/core/colors/blue').default;

module.exports = {
  siteMetadata: {
    title: `Jクラブ経営情報2005-2019`,
    description: `Jリーグが毎年公開している「Jクラブ個別経営情報開示資料」の15年分のデータをクラブ別、年度別に表示したサイトです。`,
    siteUrl: `https://cieloazul310.github.io/jclub-management`,
  },
  pathPrefix: '/jclub-management',
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
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./docs`,
      },
    },
    `gatsby-transformer-remark`,
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
        short_name: `Jクラブ経営情報`,
        start_url: `/`,
        background_color: blue[600],
        theme_color: blue[600],
        display: `minimal-ui`,
        icon: `src/images/310hub.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-sitemap`,
  ],
};
