/** @jsx jsx */
import { jsx } from 'theme-ui';
import * as React from 'react';
import '@fontsource/work-sans/latin.css';
import { Global } from '@emotion/react';
import Wrapper from './layout-wrapper';
import Sidebar from './sidebar';
import Footer from './footer';
import SEO from './seo';
import { SkipNavTarget, SkipNavTrigger } from './skip-nav';

type LayoutProps = { children: React.ReactNode; color?: string };

const Layout = ({ children, color = '#fff' }: LayoutProps) => (
  <React.Fragment>
    <Global
      styles={(theme: any) => {
        // console.log(theme);
        return {
          '*,*:after,*:before': {
            boxSizing: 'border-box',
          },
          html: {
            fontSize: '18px',
            WebkitTextSizeAdjust: '100%',
          },
          img: {
            borderStyle: 'none',
          },
          pre: {
            fontFamily: 'monospace',
            fontSize: '1em',
          },
          '[hidden]': {
            display: 'none',
          },
          '::selection': {
            background: theme.rawColors.primary,
            color: theme.rawColors.white,
          },
          'ul > li > code, ol > li > code, p > code': {
            color: '#393A34',
            background: '#f6f8fa',
            padding: 2,
          },
          '@media(max-width: 600px)': {
            html: {
              fontSize: '16px',
            },
          },
        };
      }}
    />
    <SEO />
    <SkipNavTrigger />
    <Wrapper>
      <Sidebar bg={color} />
      <main sx={{ gridColumnStart: [1, 1, 1, 2] }}>
        <SkipNavTarget />
        {children}
      </main>
      <Footer bg={color} />
    </Wrapper>
  </React.Fragment>
);

export default Layout;
