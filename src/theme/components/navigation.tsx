/** @jsx jsx */
import { jsx, Link as TLink } from 'theme-ui';
import { Link } from 'gatsby';
import { readableColor } from 'polished';
import useConfig from '../hooks/useConfig';

const Navigation = ({ bg }: { bg: string }) => {
  const config = useConfig();
  const { navigation } = config;

  return (
    <nav
      aria-label='Primary Navigation'
      sx={{
        a: {
          color: readableColor(bg),
          textDecoration: 'none',
          fontSize: [1, 2, 2, 3],
          marginLeft: [2, 3, 3, 0],
          '&:hover,&:focus': {
            color: readableColor(bg, 'primary', 'primaryLight', false),
          },
        },
        ul: {
          margin: 0,
          padding: 0,
          li: {
            listStyle: 'none',
            display: ['inline-block', 'inline-block', 'inline-block', 'block'],
          },
        },
        variant: 'navigation',
      }}
    >
      <ul>
        {navigation.map((item) => {
          // @ts-ignore
          const link = <TLink as={Link} to={item.slug}>{item.name}</TLink>;
          return <li key={item.slug}>{link}</li>;
        })}
      </ul>
    </nav>
  );
};

export default Navigation;
