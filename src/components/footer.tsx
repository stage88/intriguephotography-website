import { getPageMetaData } from '@/lib/utils';
import Link from 'next/link';

const metadata = getPageMetaData();

export default function Footer() {
  return (
    <footer className='p-6 text-center text-sm text-gray-500 lg:hidden'>
      <div className='mt-auto text-xs text-gray-500'>
        &copy; {new Date().getFullYear()} {metadata.openGraph?.title as string}
        <div>
          <Link
            aria-label="Link to the theme's GitHub repository"
            href='https://github.com/stage88/intriguephotography-website'>
            Theme
          </Link>{' '}
          by{' '}
          <Link
            aria-label="Link to the theme author's website"
            href='https://github.com/stage88'>
            Sam Ilic
          </Link>
        </div>
      </div>
    </footer>
  );
}
