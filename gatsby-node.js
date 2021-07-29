const path = require("path");

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'Mdx') {
    const { sourceInstanceName } = getNode(node.parent);

    createNodeField({
      node,
      name: 'type',
      value: sourceInstanceName
    });
  }
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  // The components and optional pagination for lists
  const listAssociation = {
    post: {
      component: './src/lists/Posts.tsx',
      perPage: 10
    },
    talk: {
      component: './src/lists/Talks.tsx',
      perPage: 10,
    },
    class: {
      component: './src/lists/Classes.tsx',
    },
    research: {
      component: './src/lists/Research.tsx',
    },
  };

  const pageResult = await graphql(`
  query {
    allMdx(sort: {fields: frontmatter___date, order: DESC}) {
      group(field: fields___type) {
        fieldValue
        totalCount
        edges {
          node {
            id
            slug
          }
          next {
            id
          }
          previous {
            id
          }
        }
      }
    }
  }`);
  if (pageResult.errors) {
    reporter.panicOnBuild('ERROR: Loading "createPages" query');
  }
  for (const { fieldValue: type, totalCount, edges } of pageResult.data.allMdx.group) {

    if (listAssociation[type]) {
      const { component, perPage } = listAssociation[type];
      if (perPage) {
        const numPages = Math.ceil(totalCount / perPage);
        Array.from({ length: numPages }).forEach((_, i) => {
          createPage({
            path: i === 0 ? `/${type}` : `/${type}/${i + 1}`,
            component: path.resolve(component),
            context: {
              limit: perPage,
              skip: i * perPage,
              numPages,
              currentPage: i + 1,
            },
          });
        });
      } else {
        createPage({
          path: `/${type}`,
          component: path.resolve(component),
        });
      }
    };

    // Create all the pages
    edges.forEach(({
      node: {
        id,
        slug,
      },
      previous,
      next
    }) => {
      createPage({
        path: `${type}/${slug}`,
        component: path.resolve(`./src/components/Page.tsx`),
        context: {
          id,
          previousId: previous?.id,
          nextId: next?.id
        },
      });
    });
  }

  // Tag pages
  const tagResult = await graphql(`
  query {
    allMdx {
      group(field: frontmatter___tags) {
        fieldValue
      }
    }
  }`);
  if (tagResult.errors) {
    reporter.panicOnBuild(`Error while running tags GraphQL query.`);
    return;
  }
  const tags = tagResult.data.allMdx.group;
  tags.forEach(tag => {
    createPage({
      path: `/tag/${tag.fieldValue}/`,
      component: path.resolve("./src/lists/Tags.tsx"),
      context: {
        tag: tag.fieldValue,
      },
    });
  });
};
