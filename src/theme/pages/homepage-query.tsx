import { graphql } from 'gatsby';
import HomepageComponent from './homepage';

export default HomepageComponent;

export const query = graphql`
  query($homepagePageLimit: Int!, $homepageProjectLimit: Int!) {
    pages: allPage(sort: { fields: title, order: ASC }, limit: $homepagePageLimit) {
      nodes {
        slug
        title
        cover {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH, quality: 95)
          }
        }
      }
    }
    projects: allProject(sort: { fields: date, order: DESC }, limit: $homepageProjectLimit) {
      nodes {
        slug
        title: shortTitle
        cover {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH, quality: 95)
          }
        }
      }
    }
  }
`;
