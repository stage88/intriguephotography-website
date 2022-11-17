import { graphql } from 'gatsby';
import HomepageComponent from './homepage';

export default HomepageComponent;

export const query = graphql`
  query ($homepagePageLimit: Int!, $homepageProjectLimit: Int!) {
    pages: allMdxPage(sort: { title: ASC }, limit: $homepagePageLimit) {
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
    projects: allMdxProject(sort: { date: DESC }, limit: $homepageProjectLimit) {
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
