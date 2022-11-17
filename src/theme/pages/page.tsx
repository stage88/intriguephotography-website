import * as React from 'react';
import { PageProps } from 'gatsby';
import Page from '../components/page';

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

export default function SiteCorePage(props: PageProps<DataProps>) {
  const { children, ...rest } = props;
  return <Page {...rest}>{children}</Page>;
}
