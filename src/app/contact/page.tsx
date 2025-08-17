import { getPageMetaData, getSiteConfig } from '@/lib/utils';

const config = getSiteConfig();
export const metadata = getPageMetaData({ title: 'Contact Us' });

export default function ContactPage() {
  return (
    <article className='prose w-full max-w-none'>
      <h1>Contact</h1>
      <p>
        <strong>{metadata.openGraph?.title as string}</strong>
      </p>
      <p>
        Phone: {config.phone}
        <br />
        Mobile: {config.mobile}
      </p>
      <p>
        <a href={`mailto:${config.email}`}>{config.email}</a>
      </p>
      <p>{config.address}</p>
      <div className='aspect-[4/3] w-full'>
        <iframe
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3228.4451632174814!2d150.11575541526716!3d-35.984988080124594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b15f678b32e8a3d%3A0xf593f897a7563502!2s125%20Bingie%20Rd%2C%20Meringo%20NSW%202537!5e0!3m2!1sen!2sau!4v1615611782663!5m2!1sen!2sau'
          className='h-[400px] w-full border-0'
          loading='lazy'
          referrerPolicy='no-referrer-when-downgrade'
          allowFullScreen
        />
      </div>
    </article>
  );
}
