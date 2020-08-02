const path = require('path');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allClubsYaml {
        edges {
          node {
            slug
          }
          previous {
            slug
            name
          }
          next {
            slug
            name
          }
        }
      }
    }
  `);
  result.data.allClubsYaml.edges.forEach(({ node, previous, next }) => {
    createPage({
      path: `/club/${node.slug}`,
      component: path.resolve(`./src/templates/club.tsx`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        previous,
        next,
        slug: node.slug,
      },
    });
  });
};
