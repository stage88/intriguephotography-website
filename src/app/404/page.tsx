import { getPageMetaData } from '@/lib/utils';
import Link from 'next/link';

export const metadata = getPageMetaData({ title: 'Not Found' });

export default function NotFoundPage() {
  return (
     <section id='not-found' className='prose'>
      <h1>Not Found</h1>
      <h2>Oops! We couldn't find that page.</h2>
      <p>
        We couldn't find the page you were looking for. Please check the URL or
        return to the <Link href='/'>homepage</Link>.
      </p>
    </section>
  );
}
