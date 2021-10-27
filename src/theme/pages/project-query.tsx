import { graphql } from 'gatsby';
import ProjectComponent from '../components/project';

export default ProjectComponent;

export const query = graphql`
  query($slug: String!, $formatString: String!, $relativeDirectory: String!) {
    project: mdxProject(slug: { eq: $slug }) {
      body
      excerpt
      color
      date(formatString: $formatString)
      slug
      title
      shortTitle
      category
      cover {
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH, quality: 85, width: 1200)
        }
      }
    }
    images: allFile(
      filter: {
        relativeDirectory: { eq: $relativeDirectory }
        extension: { regex: "/(jpg)|(png)|(tif)|(tiff)|(webp)|(jpeg)/" }
      }
    ) {
      nodes {
        name
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH, quality: 90)
        }
      }
    }
  }
`;
