/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Link } from 'gatsby';
import { readableColor } from 'polished';
import useSiteMetadata from '../hooks/useSiteMetadata';
import Navigation from './navigation';
import { StaticImage } from 'gatsby-plugin-image';

type SidebarProps = { bg: string };

const Sidebar = ({ bg }: SidebarProps) => {
  const { siteTitle } = useSiteMetadata();

  return (
    <header
      sx={{
        p: [3, 3, 4],
        width: (t: any): any => ['100%', '100%', '100%', t.sidebar?.normal, t.sidebar?.wide],
        backgroundColor: bg,
        position: ['relative', 'relative', 'relative', 'fixed'],
        height: '100%',
        display: 'flex',
        flexDirection: ['column', 'row', 'row', 'column'],
        alignItems: ['flex-end', 'center', 'center', 'flex-start'],
        justifyContent: ['space-between', 'space-between', 'space-between', 'flex-start'],
        svg: {
          fill: readableColor(bg),
        },
        variant: 'sidebar',
      }}
      data-testid='sidebar'
    >
      <Link to='/' aria-label={`${siteTitle}, Back to Home`} sx={{ width: ['100%', '14rem', '20rem', '100%'] }}>
        <StaticImage src='../../images/logo-1.png' alt={siteTitle} />
      </Link>
      <div sx={{ py: 4, display: ['none', 'none', 'none', 'block'] }} />
      <Navigation bg={bg} />
    </header>
  );
};

export default Sidebar;
