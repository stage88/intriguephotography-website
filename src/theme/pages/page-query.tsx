import { graphql } from 'gatsby';
import PageComponent from '../components/page';

export default PageComponent;

export const query = graphql`
  query($slug: String!) {
    page: mdx(frontmatter: {slug: {eq: $slug}}) {
      frontmatter {
        title
        color
        slug
        cover {
          childImageSharp {
            resize(width: 1200, quality: 85) {
              src
            }
          }
        }
      }
      excerpt
    }
  }
`;
