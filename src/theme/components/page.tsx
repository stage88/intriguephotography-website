/** @jsx jsx */
import { jsx } from 'theme-ui';
import * as React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { PageProps } from 'gatsby';
import Layout from './layout';
import SEO from './seo';

type DataProps = {
  page: {
    frontmatter: {
      title: string;
      slug: string;
      color: string;
      cover: {
        childImageSharp: {
          resize: {
            src: string;
          };
        };
      };
    };
    custom: boolean;
    excerpt: string;
  };
};

const Page: React.FC<PageProps<DataProps>> = ({ data: { page }, location, children }) => {
  // console.log({ page, location });
  return (
    <Layout color={page.frontmatter.color || undefined}>
      <SEO
        title={page.frontmatter.title}
        description={page.excerpt}
        pathname={location.pathname}
        image={page.frontmatter.cover?.childImageSharp.resize.src}
      />
      <div
        sx={{
          variant: page.custom ? 'content.custom' : 'content.page',
        }}
        data-testid='page-content'
      >
        <MDXProvider>{children}</MDXProvider>
      </div>
    </Layout>
  );
};

export default Page;
