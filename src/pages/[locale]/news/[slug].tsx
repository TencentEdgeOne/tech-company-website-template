import { GetStaticPaths, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import Link from '@/components/Link'; // Your custom Link component
import i18nextConfig from '../../../../next-i18next.config.js'; // Adjust path as needed

// --- Placeholder Data ---
// In a real app, fetch this from your CMS/API/Markdown files
interface NewsArticle {
  id: string;
  slug: string;
  image: string;
  date: string;
  titleKey: string;
  excerptKey: string; // Keep excerpt for potential reuse or meta description
  contentKey: string; // Key for the full article content
}

const placeholderNewsData: NewsArticle[] = [
   {
    id: '1',
    slug: 'first-announcement',
    image: '/images/placeholder-news-1.webp',
    date: '2023-10-27',
    titleKey: 'article1Title',
    excerptKey: 'article1Excerpt',
    contentKey: 'article1Content', // Added content key
  },
  {
    id: '2',
    slug: 'tech-update-q3',
    image: '/images/placeholder-news-2.webp',
    date: '2023-10-20',
    titleKey: 'article2Title',
    excerptKey: 'article2Excerpt',
    contentKey: 'article2Content', // Added content key
  },
   {
    id: '3',
    slug: 'new-partnership-deal',
    image: '/images/placeholder-news-3.webp',
    date: '2023-10-15',
    titleKey: 'article3Title',
    excerptKey: 'article3Excerpt',
    contentKey: 'article3Content', // Added content key
  },
  // ... more articles
];

// --- Page Component ---
interface NewsDetailPageProps {
  article: NewsArticle | null; // Article data passed as props
}

const NewsDetailPage: React.FC<NewsDetailPageProps> = ({ article }) => {
  const { t } = useTranslation('news');
  const { t: tCommon } = useTranslation('common');

  if (!article) {
    // Handle case where article is not found (though getStaticPaths should prevent this if fallback: false)
    // You might want to render a specific component or redirect
    return <div>{t('articleNotFound', { defaultValue: '文章未找到。'})}</div>;
  }

  return (
    <>
      <Head>
        {/* Use article title from translation */}
        <title>{t(article.titleKey)}</title>
        {/* Use excerpt for meta description */}
        <meta name="description" content={t(article.excerptKey)} />
      </Head>

      <div className="bg-white py-12 md:py-20 px-4">
        <div className="container mx-auto max-w-3xl">
          {/* Back link */}
          <div className="mb-8">
            <Link href="/news" className="text-[var(--primary)] hover:underline flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {tCommon('backToNewsList', { defaultValue: '返回新闻列表'})}
            </Link>
          </div>

          {/* Article Header */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--secondary)] font-[Poppins] mb-4">
            {t(article.titleKey)}
          </h1>
          <p className="text-base text-gray-500 mb-6">
            {tCommon('publishedOn', { defaultValue: '发布于'})} {article.date}
          </p>

          {/* Optional: Article Image */}
          {/* <div className="mb-8 rounded-lg overflow-hidden">
             <img src={article.image} alt={t(article.titleKey)} className="w-full h-auto object-cover" />
          </div> */}

          {/* Article Content */}
          <article className="prose lg:prose-xl max-w-none text-[var(--accent-gray)] font-[Asap] leading-relaxed">
            {/* Render translated content. Use dangerouslySetInnerHTML if content includes HTML */}
            <p>{t(article.contentKey, { defaultValue: '文章内容加载中...'})}</p>
            {/* Example if content were HTML: */}
            {/* <div dangerouslySetInnerHTML={{ __html: t(article.contentKey) }} /> */}
          </article>
        </div>
      </div>
    </>
  );
};

// --- Data Fetching ---

export const getStaticPaths: GetStaticPaths = async () => {
  if (process.env.CMS_URL === 'ignore') {
    return {
      paths: [],
      fallback: false,
    };
  }

  const locales = i18nextConfig.i18n.locales;
  const paths: Array<{ params: { locale: string; slug: string } }> = [];

  // Generate paths for each slug in each locale
  locales.forEach((locale) => {
    placeholderNewsData.forEach((article) => {
      paths.push({
        params: { locale: locale, slug: article.slug },
      });
    });
  });

  return {
    paths,
    fallback: false, // Means other routes should 404
  };
};

export const getStaticProps: GetStaticProps<NewsDetailPageProps> = async ({ params }) => {
  const locale = params?.locale as string || i18nextConfig.i18n.defaultLocale;
  const slug = params?.slug as string;

  // Find the article data based on the slug
  // In a real app, you'd fetch this from your data source based on slug and locale
  const article = placeholderNewsData.find((a) => a.slug === slug) || null;

  if (!article) {
    // Should not happen with fallback: false, but good practice
    return { notFound: true };
  }

  return {
    props: {
      article,
      ...(await serverSideTranslations(locale, ['common', 'navbar', 'footer', 'news'])), // Load necessary translations
    },
  };
};

export default NewsDetailPage; 