import { getPageMetaData } from '@/lib/utils';

export const metadata = getPageMetaData({ title: 'About Us' });

export default function AboutPage() {
  return (
    <article className='prose w-full max-w-none'>
      <h1>About</h1>
      <p>
        Intrigue Photography and Gallery has a very high level of expertise in a
        diverse range of photography, and combines artistic talent with a
        professional and friendly approach.
      </p>
      <p>
        Intrigue Photography and Gallery has two main directions: a personalised
        photography service for newborns, children, family, couples and
        weddings, and an art gallery which specialises in creative imagery.
      </p>
      <p>
        You are invited to explore this website to discover the photography that
        can be produced for you and the fine art that can be viewed at and
        purchased from the gallery.
      </p>
      <p>
        Intrigue Photography and Gallery's purpose is to supply creative,
        beautiful and thoughtful images through a process of involvement with
        the client and the subject.
      </p>
      <p>
        Intrigue Photography and Gallery achieves each client's needs by
        combining unique styling and personal feeling to produce stunning
        images. Nina Lange is the owner of and principal photographer for
        Intrigue Photography and Gallery.
      </p>
      <p>
        Nina has been photographing for over 14 years. Her early passion for and
        love of photography ignited her enthusiasm to complete a four-year
        Bachelor of Design (Photography) Degree and an Advanced Diploma in
        Commercial Photography.
      </p>
      <p>
        Nina evaluates what she sees and experiences - and, most importantly,
        feels - all through the prism of her lens. Nina's broad-ranging
        experience is enhanced by her skill and her ability to meet the special
        needs of her clients.
      </p>
      <p>
        <strong>Nina Lange - Photographer</strong>
      </p>
    </article>
  );
}
