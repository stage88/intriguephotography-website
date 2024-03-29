const _ = require('lodash');
const withDefaults = require('./src/theme/utils/default-options');

const mdxResolverPassthrough = (fieldName) => async (source, args, context, info) => {
  const type = info.schema.getType('Mdx');
  const mdxNode = context.nodeModel.getNodeById({
    id: source.parent,
  });
  const resolver = type.getFields()[fieldName].resolve;
  const result = await resolver(mdxNode, args, context, {
    fieldName,
  });
  return result;
};

// Create general interfaces that you could can use to leverage other data sources
// The core theme sets up MDX as a type for the general interface
exports.createSchemaCustomization = ({ actions, schema }, themeOptions) => {
  const { createTypes, createFieldExtension } = actions;

  const { basePath } = withDefaults(themeOptions);

  const slugify = (source) => {
    const slug = source.slug ? source.slug : _.kebabCase(source.title);

    return `/${basePath}/${slug}`.replace(/\/\/+/g, '/');
  };

  createFieldExtension({
    name: 'slugify',
    extend() {
      return {
        resolve: slugify,
      };
    },
  });

  createFieldExtension({
    name: 'mdxpassthrough',
    args: {
      fieldName: 'String!',
    },
    extend({ fieldName }) {
      return {
        resolve: mdxResolverPassthrough(fieldName),
      };
    },
  });

  createFieldExtension({
    name: 'defaultFalse',
    extend() {
      return {
        resolve(source, args, context, info) {
          if (source[info.fieldName] == null) {
            return false;
          }
          return source[info.fieldName];
        },
      };
    },
  });

  createTypes(`
    interface Project @nodeInterface {
      id: ID!
      title: String!
      shortTitle: String!
      category: String!
      slug: String! @slugify
      date: Date! @dateformat
      color: String
      cover: File @fileByRelativePath
      excerpt(pruneLength: Int = 160): String!
      body: String!
    }

    type MdxProject implements Node & Project {
      title: String!
      shortTitle: String!
      category: String!
      slug: String! @slugify
      date: Date! @dateformat
      color: String
      cover: File @fileByRelativePath
      excerpt(pruneLength: Int = 140): String! @mdxpassthrough(fieldName: "excerpt")
      body: String! @mdxpassthrough(fieldName: "body")
    }

    interface Page @nodeInterface {
      id: ID!
      slug: String!
      title: String!
      color: String
      custom: Boolean @defaultFalse
      cover: File @fileByRelativePath
      excerpt(pruneLength: Int = 160): String!
      body: String!
    }

    type MdxPage implements Node & Page {
      slug: String!
      title: String!
      color: String
      custom: Boolean @defaultFalse
      cover: File @fileByRelativePath
      excerpt(pruneLength: Int = 140): String! @mdxpassthrough(fieldName: "excerpt")
      body: String! @mdxpassthrough(fieldName: "body")
    }

    type SiteConfig implements Node {
      navigation: [navigationEntry!]
    }

    type navigationEntry {
      name: String
      slug: String
    }
  `);
};

exports.onCreateNode = ({ node, actions, getNode, createNodeId, createContentDigest }, themeOptions) => {
  const { createNode, createParentChildLink } = actions;

  const { projectsPath, pagesPath } = withDefaults(themeOptions);

  // Make sure that it's an MDX node
  if (node.internal.type !== 'Mdx') {
    return;
  }

  // Create a source field
  // And grab the sourceInstanceName to differentiate the different sources
  // In this case "projectsPath" and "pagesPath"
  const fileNode = getNode(node.parent);
  const source = fileNode.sourceInstanceName;

  // Check for "projects" and create the "Project" type
  if (node.internal.type === 'Mdx' && source === projectsPath) {
    const fieldData = {
      slug: node.frontmatter.slug ? node.frontmatter.slug : undefined,
      title: node.frontmatter.title,
      shortTitle: node.frontmatter.shortTitle,
      cover: node.frontmatter.cover,
      date: node.frontmatter.date,
      category: node.frontmatter.category,
      color: node.frontmatter.color ? node.frontmatter.color : undefined,
    };

    const mdxProjectId = createNodeId(`${node.id} >>> MdxProject`);

    createNode({
      ...fieldData,
      // Required fields
      id: mdxProjectId,
      parent: node.id,
      children: [],
      internal: {
        type: 'MdxProject',
        contentDigest: createContentDigest(fieldData),
        content: JSON.stringify(fieldData),
        description: 'Mdx implementation of the Project interface',
      },
    });

    createParentChildLink({ parent: node, child: getNode(mdxProjectId) });
  }

  // Check for "pages" and create the "Page" type
  if (node.internal.type === 'Mdx' && source === pagesPath) {
    const fieldData = {
      title: node.frontmatter.title,
      slug: node.frontmatter.slug,
      color: node.frontmatter.color ? node.frontmatter.color : undefined,
      custom: node.frontmatter.custom,
      cover: node.frontmatter.cover,
    };

    const mdxPageId = createNodeId(`${node.id} >>> MdxPage`);

    createNode({
      ...fieldData,
      // Required fields
      id: mdxPageId,
      parent: node.id,
      children: [],
      internal: {
        type: 'MdxPage',
        contentDigest: createContentDigest(fieldData),
        content: JSON.stringify(fieldData),
        description: 'Mdx implementation of the Page interface',
      },
    });

    createParentChildLink({ parent: node, child: getNode(mdxPageId) });
  }
};

exports.sourceNodes = ({ actions, createContentDigest }, themeOptions) => {
  const { createNode } = actions;

  const { projectsPrefix, basePath, formatString, navigation, pagesPath, projectsPath, projectsUrl, projectsSort } =
    withDefaults(themeOptions);

  const siteConfig = {
    projectsPrefix,
    basePath,
    formatString,
    navigation,
    pagesPath,
    projectsPath,
    projectsUrl,
    projectsSort,
  };

  // console.log(siteConfig);

  createNode({
    ...siteConfig,
    id: 'site-config',
    parent: null,
    children: [],
    internal: {
      type: 'SiteConfig',
      contentDigest: createContentDigest(siteConfig),
      content: JSON.stringify(siteConfig),
      description: 'Options for site config',
    },
  });
};

// These template are only data-fetching wrappers that import components
const homepageTemplate = require.resolve('./src/theme/pages/homepage-query.tsx');
const projectTemplate = require.resolve('./src/theme/pages/project-query.tsx');
const projectsTemplate = require.resolve('./src/theme/pages/projects-query.tsx');
const pageTemplate = require.resolve('./src/theme/pages/page-query.tsx');

exports.createPages = async ({ actions, graphql, reporter }, themeOptions) => {
  const { createPage } = actions;

  const defaults = withDefaults(themeOptions);
  const {
    basePath,
    projectsUrl,
    projectsPrefix,
    formatString,
    homepagePageLimit,
    homepageProjectLimit,
    projectsPath,
    pagesPath,
  } = defaults;

  createPage({
    path: basePath,
    component: homepageTemplate,
    context: {
      homepagePageLimit,
      homepageProjectLimit,
    },
  });

  createPage({
    path: `/${basePath}/${projectsUrl}`.replace(/\/\/+/g, '/'),
    component: projectsTemplate,
  });

  const result = await graphql(`
    query {
      allMdxProject(sort: { date: DESC }) {
        nodes {
          slug
          ... on MdxProject {
            parent {
              ... on Mdx {
                parent {
                  ... on File {
                    relativeDirectory
                  }
                }
              }
            }
          }
        }
      }
      allMdxPage {
        nodes {
          slug
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild('There was an error loading your projects or pages', result.errors);
    return;
  }

  // console.log(JSON.stringify(result, null, 2));

  const projects = result.data.allMdxProject.nodes;

  if (projects.length > 0) {
    projects.forEach((project) => {
      const path = `/${basePath}${projectsPrefix}${project.slug}`.replace(/\/\/+/g, '/');
      const contentFilePath = require.resolve(`./${projectsPath}${project.slug}/index.mdx`);
      const component = `${projectTemplate}?__contentFilePath=${contentFilePath}`;

      // console.log(path, component);

      createPage({
        path,
        component,
        context: {
          slug: project.slug,
          formatString,
          relativeDirectory: project.parent.parent.relativeDirectory,
        },
      });
    });
  }

  const pages = result.data.allMdxPage.nodes;

  if (pages.length > 0) {
    pages.forEach((page) => {
      const path = `/${basePath}/${page.slug}`.replace(/\/\/+/g, '/');
      const contentFilePath = require.resolve(`./${pagesPath}${page.slug}/index.mdx`);
      const component = `${pageTemplate}?__contentFilePath=${contentFilePath}`;

      // console.log(path, component);
      createPage({
        path,
        component,
        context: {
          slug: page.slug,
        },
      });
    });
  }
};
