import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import { getSiteConfig, getPageMetaData, toTitleCase } from '@/lib/utils';

const { navigation } = getSiteConfig();
export const dynamicParams = false; // only build the known categories

export function generateStaticParams() {
  return navigation
    .filter(c => c.category)
    .map(c => ({ category: c.category }));
}

export async function generateMetadata({ params }: any) {
  const { category } = await params;
  const title = `${toTitleCase(category)} Photography`;
  return getPageMetaData({ title });
}

function getImages(slug: string): string[] {
  const dir = path.join(process.cwd(), 'public', 'images', 'photography', slug);
  try {
    if (fs.existsSync(dir)) {
      return fs.readdirSync(dir).filter(f => /\.jpe?g$/i.test(f));
    }
  } catch (e) {
    console.error('Error reading images', e);
  }

  return [];
}

export default async function CategoryPage({ params }: any) {
  const { category } = await params;
  const title = category.charAt(0).toUpperCase() + category.slice(1);
  const images = getImages(category);
  return (
    <section className='w-full max-w-none'>
      <h1 className='mb-8 text-4xl font-bold'>{title} Photography</h1>
      {/* Changed: single column full-width images */}
      <div className='flex flex-col gap-8'>
        {images.map(img => (
          <figure
            key={img}
            className='relative w-full overflow-hidden rounded shadow'>
            <Image
              src={`/images/photography/${category}/${img}`}
              alt={img}
              className='h-auto w-full object-cover'
              width={2000} // arbitrary large width for responsive scaling
              height={1333} // maintain a 3:2-ish ratio; adjust if desired
              sizes='100vw'
              loading='lazy'
            />
          </figure>
        ))}
      </div>
    </section>
  );
}
