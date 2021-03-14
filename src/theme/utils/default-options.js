module.exports = (options = {}) => {
  // console.log(options);
  const basePath = options.basePath || '/';
  const projectsPath = options.projectsPath || 'content/photography';
  const projectsUrl = options.projectsUrl || '/photography';
  const projectsPrefix = options.projectsPrefix || '/photography';

  const projectsSort = options.projectsSort || [
    'Weddings',
    'Maternity',
    'Newborn',
    'Children',
    'Family',
  ];

  const pagesPath = options.pagesPath || 'content/pages';
  const formatString = options.formatString || 'DD.MM.YYYY';
  const navigation = options.navigation || [
    { name: 'Photography', slug: '/photography' },
    { name: 'About', slug: '/about' },
    { name: 'Contact', slug: '/contact' },
  ];  
  const homepagePageLimit = options.homepagePageLimit || 9999;
  const homepageProjectLimit = options.homepageProjectLimit || 9;

  return {
    basePath,
    projectsPath,
    projectsUrl,
    projectsPrefix,
    projectsSort,
    pagesPath,
    formatString,
    navigation,
    homepagePageLimit,
    homepageProjectLimit,
  };
};
