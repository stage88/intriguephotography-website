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
  console.log(JSON.stringify(props, null, 2));
  return <Page {...rest}>{children}</Page>;
}
