import { getPageMetaData, getSiteConfig } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';

const { navigation } = getSiteConfig();
const metadata = getPageMetaData();

export default function Navigation() {
  const pathname = usePathname();
  const [photoOpen, setPhotoOpen] = useState(false);
  const photoMenuRef = useRef<HTMLDivElement | null>(null);

  // Close on route change
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setPhotoOpen(false);
  }

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent | TouchEvent) {
      if (
        photoOpen &&
        photoMenuRef.current &&
        !photoMenuRef.current.contains(e.target as Node)
      ) {
        setPhotoOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('touchstart', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('touchstart', handleClick);
    };
  }, [photoOpen]);

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setPhotoOpen(false);
    }
    if (photoOpen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [photoOpen]);

  const isActive = (href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(href + '/'));

  const categoryItems = navigation.filter(i => i.category);
  const pageItems = navigation.filter(i => !i.category);

  function NavItem(i: any) {
    const active = isActive(i.href);
    return (
      <Link
        key={i.href}
        href={i.href}
        aria-current={active ? 'page' : undefined}
        className={`relative px-1 py-0.5 transition ${
          active
            ? 'font-semibold text-pink-600'
            : 'text-gray-700 hover:text-pink-600'
        }`}>
        {i.label}
      </Link>
    );
  }

  return (
    <>
      {/* Mobile / tablet header (< lg) */}
      <header className='sticky top-0 z-40 flex flex-wrap items-center gap-x-6 gap-y-2 bg-white px-4 py-3 shadow lg:hidden'>
        <Link
          href='/'
          aria-label='Intrigue Photography and Gallery, Back to Home'
          className='flex flex-shrink-0 items-center'>
          <Image
            src='/images/logo-1.png'
            alt='Intrigue Photography and Gallery'
            width={400}
            height={86}
            priority
            className='h-10 w-auto'
          />
        </Link>

        {/* When space is tight the whole nav block wraps below the logo (pure CSS) */}
        <nav className='flex min-w-max flex-none items-center gap-6 text-sm font-medium'>
          {/* Photography dropdown */}
          <div ref={photoMenuRef} className='relative'>
            <button
              type='button'
              onClick={() => setPhotoOpen(o => !o)}
              aria-haspopup='menu'
              aria-expanded={photoOpen}
              aria-controls='mobile-photography-menu'
              className={`px-1 py-0.5 transition ${
                pathname.startsWith('/photography') || photoOpen
                  ? 'text-pink-600'
                  : 'text-gray-700 hover:text-pink-600'
              }`}>
              Photography
            </button>
            <div
              id='mobile-photography-menu'
              role='menu'
              className={`absolute left-0 z-50 mt-2 w-32 rounded-md border border-black/5 bg-white p-2 shadow-lg ring-1 ring-black/5 transition duration-150 ${
                photoOpen
                  ? 'scale-100 opacity-100'
                  : 'pointer-events-none scale-95 opacity-0'
              }`}>
              <ul className='space-y-1'>
                {categoryItems.map(ci => {
                  const active = isActive(ci.href);
                  return (
                    <li key={ci.href}>
                      <Link
                        href={ci.href}
                        role='menuitem'
                        className={`block rounded px-3 py-1.5 text-sm transition ${
                          active
                            ? 'bg-pink-50 text-pink-600'
                            : 'text-gray-700 hover:bg-gray-100 hover:text-pink-600'
                        }`}
                        onClick={() => setPhotoOpen(false)}>
                        {ci.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          {/* Standard pages (e.g., About, Contact) */}
          {pageItems.map(i => {
            const active = isActive(i.href);
            return (
              <Link
                key={i.href}
                href={i.href}
                className={`px-1 py-0.5 transition ${
                  active ? 'text-pink-600' : 'text-gray-700 hover:text-pink-600'
                }`}>
                {i.label}
              </Link>
            );
          })}
        </nav>
      </header>

      {/* Desktop sidebar (>= lg) */}
      <aside className='sticky top-0 hidden h-screen flex-col gap-8 overflow-y-auto bg-white p-6 lg:flex'>
        <Link
          href='/'
          aria-label='Intrigue Photography and Gallery, Back to Home'
          className='block'>
          <Image
            src='/images/logo-1.png'
            alt='Intrigue Photography and Gallery'
            width={1031}
            height={222}
            priority
            className='h-12 w-auto sm:h-14 md:h-16'
          />
        </Link>

        <nav className='flex flex-col gap-2 md:text-lg'>
          {categoryItems.map(NavItem)}
          {categoryItems.length && pageItems.length ? (
            <div role='separator' className='my-4 h-px' />
          ) : null}
          {pageItems.map(NavItem)}
        </nav>

        <div className='mt-auto text-xs text-gray-500'>
          &copy; {new Date().getFullYear()}{' '}
          {metadata.openGraph?.title as string}
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
      </aside>
    </>
  );
}
