/** @jsx jsx */
import { jsx } from 'theme-ui';
import * as React from 'react';
import { PageProps } from 'gatsby';
import Layout from './layout';
import { ChildImageSharp } from '../types';
import SEO from './seo';
import GridItem from './grid-item';
import locales from '../locales';
import { visuallyHidden } from '../styles/utils';
import { GatsbyImage } from 'gatsby-plugin-image';
import useConfig from '../hooks/useConfig';
import _ from 'lodash';

type DataProps = {
  projects: {
    nodes: {
      shortTitle: string;
      slug: string;
      cover: ChildImageSharp;
    }[];
  };
};

const Project: React.FC<PageProps<DataProps>> = ({ data: { projects }, location }) => {
  const { projectsSort, projectsPrefix } = useConfig();
  // console.log(projects);
  return (
    <Layout>
      <SEO title='Projects' pathname={location.pathname} />
      <h1 sx={visuallyHidden as any} data-testid='page-title'>
        {locales.photography}
      </h1>
      <div
        sx={{
          display: 'grid',
          gridTemplateColumns: ['1fr', '1fr 1fr'],
          gridAutoRows: '50vw',
        }}
      >
        {projects.nodes.length > 0 ? (
          _.orderBy(projects.nodes, x => projectsSort.indexOf(x.shortTitle)).map((project) => (
            <GridItem to={`${projectsPrefix}${project.slug}`} key={project.slug} data-testid={project.shortTitle}>
              <GatsbyImage image={project.cover.childImageSharp.gatsbyImageData} alt={project.shortTitle} />
              <span>{project.shortTitle}</span>
            </GridItem>
          ))
        ) : (
          <div sx={{ padding: 3 }}>No projects found at the location defined for "projectsPath"</div>
        )}
      </div>
    </Layout>
  );
};

export default Project;
