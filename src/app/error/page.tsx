import { getPageMetaData } from '@/lib/utils';
import Link from 'next/link';

export const metadata = getPageMetaData({ title: 'Error' });

export default function ErrorPage() {
  return (
    <section id='not-found' className='prose'>
      <h1>Error</h1>
      <h2>Oops! Something went wrong.</h2>
      <p>
        There was an error. Please check the URL or return to the{' '}
        <Link href='/'>homepage</Link>.
      </p>
    </section>
  );
}
