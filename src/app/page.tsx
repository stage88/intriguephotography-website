import { getPageMetaData, getSiteConfig, toTitleCase } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

const { navigation } = getSiteConfig();
export const metadata = getPageMetaData();

function getTileClasses(i: number) {
  // Pattern: 0 full-width, 1 tall-left, 2 small-top-right, 3 small-bottom-right, 4 full-width, repeat
  const patternIndex = i % 5;
  switch (patternIndex) {
    case 0:
    case 4:
      return 'col-span-full row-span-2';
    case 1:
      return 'row-span-2';
    default:
      return 'row-span-1';
  }
}

export default function HomePage() {
  const items = navigation.filter(c => c.category);

  return (
    <section className='w-full'>
      <h1 className='mb-8 text-4xl font-bold'>
        Intrigue Photography &amp; Gallery
      </h1>
      <div className='grid auto-rows-[180px] grid-cols-1 gap-4 md:auto-rows-[220px] md:grid-cols-2'>
        {items.map((c, i) => {
          const tileShape = getTileClasses(i);

          // If it's a full-width row, force it to span both columns on md+
          const spanClasses = tileShape.includes('col-span-full')
            ? 'md:col-span-2'
            : '';

          const label = toTitleCase(c.label || c.category || '');

          return (
            <Link
              key={label + i}
              href={c.href}
              className={`group relative block overflow-hidden rounded-lg bg-gray-200 shadow-sm ring-1 ring-black/5 transition hover:shadow-md ${tileShape} ${spanClasses}`}>
              {c.hero && (
                <Image
                  src={c.hero}
                  alt={c.label}
                  fill
                  sizes='(max-width: 768px) 100vw, (min-width: 769px) 50vw'
                  className='object-cover transition duration-500 group-hover:scale-105'
                  priority={i < 3}
                />
              )}

              {/* Dark overlay for readability */}
              <div className='pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/40 via-black/10 to-transparent opacity-70 transition group-hover:opacity-60' />

              {/* Category label top-right */}
              <div className='absolute top-2 right-2'>
                <span className='rounded px-2 py-1 text-2xl font-bold tracking-wide text-white backdrop-blur'>
                  {label}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
