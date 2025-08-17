import { getPageMetaData } from '@/lib/utils';
import Link from 'next/link';

export const metadata = getPageMetaData({ title: 'Access Denied' });

export default function NotFoundPage() {
  return (
    <section id='not-found' className='prose'>
      <h1>Access Denied</h1>
      <h2>Oops! You don't have permission to access this page.</h2>
      <p>
        You don't have permission to access the page you were looking for.
        Please check the URL or return to the <Link href='/'>homepage</Link>.
      </p>
    </section>
  );
}
