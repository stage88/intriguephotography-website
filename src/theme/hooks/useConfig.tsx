import { graphql, useStaticQuery } from 'gatsby';

type useConfigProps = {
  siteConfig: {
    projectsPrefix: string;
    basePath: string;
    formatString: string;
    navigation: {
      name: string;
      slug: string;
    }[];
    pagesPath: string;
    projectsPath: string;
    projectsUrl: string;
    projectsSort: string[];
  };
};

const useConfig = () => {
  const data = useStaticQuery<useConfigProps>(graphql`
    query {
      siteConfig {
        projectsPrefix
        basePath
        formatString
        navigation {
          name
          slug
        }
        pagesPath
        projectsPath
        projectsUrl,
        projectsSort,
      }
    }
  `);

  return data.siteConfig;
};

export default useConfig;
