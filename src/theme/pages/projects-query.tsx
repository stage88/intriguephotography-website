import { graphql } from 'gatsby';
import ProjectsComponent from '../components/projects';

export default ProjectsComponent;

export const query = graphql`
  query {
    projects: allProject(sort: { fields: date, order: DESC }) {
      nodes {
        shortTitle
        slug
        cover {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH, quality: 90)
          }
        }
      }
    }
  }
`;
