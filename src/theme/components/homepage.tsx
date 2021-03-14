/** @jsx jsx */
import { jsx } from 'theme-ui';
import React from 'react';
import { PageProps } from 'gatsby';
import Layout from './layout';
import { ChildImageSharp } from '../types';
import GridItem from './grid-item';
import { itemListWrapperStyles, itemStyles } from '../styles/item-list';
import locales from '../locales';
import { visuallyHidden } from '../styles/utils';
import modifyGrid from '../utils/modify-grid';
import { GatsbyImage } from 'gatsby-plugin-image';
import _ from 'lodash';
import useConfig from '../hooks/useConfig';

type DataProps = {
  projects: {
    nodes: {
      slug: string;
      title: string;
      cover: ChildImageSharp;
      __typename: 'MdxProject';
    }[];
  };
  pages: {
    nodes: {
      slug: string;
      title: string;
      cover: ChildImageSharp;
      __typename: 'MdxPage';
    }[];
  };
};

const Homepage: React.FC<PageProps<DataProps>> = ({ data: { projects } }) => {
  const { projectsSort, projectsPrefix } = useConfig();

  const rawItems = [...projects.nodes];
  const items = _.sortBy(modifyGrid(rawItems), x => {
    return projectsSort.indexOf(x.title);
  });
  // console.log({items, projectsSort, projectsPrefix});
  const itemsCount = items.length;
  let divisor = 9;

  for (let i = 0; i < itemsCount; i++) {
    const quotient = itemsCount % divisor;
    const quotientAlt = (itemsCount - 1) % divisor;

    if (quotient === 0 || quotientAlt === 0) {
      break;
    }

    divisor -= 1;
  }

  return (
    <Layout>
      <h1 sx={visuallyHidden as any} data-testid='page-title'>
        {locales.home}
      </h1>
      <div className={'item-list-wrapper'} sx={itemListWrapperStyles}>
        <div className={`item-list div${divisor}`}>
          {items.length > 0 ? (
            items.map((item) => (
              <GridItem
                to={`${projectsPrefix}${item.slug}`}
                className='item'
                key={item.title}
                sx={itemStyles}
                data-testid={item.title}
              >
                {item.cover?.childImageSharp && (
                  <GatsbyImage image={item.cover.childImageSharp.gatsbyImageData} alt={item.title} />
                )}
                <span>{item.title}</span>
              </GridItem>
            ))
          ) : (
            <div sx={{ padding: 3 }}>
              No projects and pages found at the locations defined for "projectsPath" and "pagesPath"
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Homepage;
