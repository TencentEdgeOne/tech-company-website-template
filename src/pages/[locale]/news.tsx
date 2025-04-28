import { GetStaticPaths } from 'next';
import { useTranslation } from 'next-i18next';
import Link from '@/components/Link'; // 使用你的自定义 Link 组件
import Head from 'next/head';
import i18nextConfig from '../../../next-i18next.config.js'; // Import config for defaultLocale
import { makeStaticProps } from '@/lib/getStatic.js';

// 假设的新闻数据结构 - 你之后需要替换成真实数据源（CMS, API, Markdown等）
const placeholderNewsData = [
  {
    id: '1',
    slug: 'first-announcement', // 用于生成链接
    image: '/images/placeholder-news-1.webp', // 示例图片路径
    date: '2023-10-27',
    titleKey: 'article1Title', // 对应翻译文件中的 key
    excerptKey: 'article1Excerpt',
  },
  {
    id: '2',
    slug: 'tech-update-q3',
    image: '/images/placeholder-news-2.webp',
    date: '2023-10-20',
    titleKey: 'article2Title',
    excerptKey: 'article2Excerpt',
  },
   {
    id: '3',
    slug: 'new-partnership-deal',
    image: '/images/placeholder-news-3.webp',
    date: '2023-10-15',
    titleKey: 'article3Title',
    excerptKey: 'article3Excerpt',
  },
  // ... 更多新闻条目
];

const NewsPage = () => {
  const { t } = useTranslation('news'); // 使用 news 命名空间
  const { t: tCommon } = useTranslation('common'); // 加载 common 翻译

  return (
    <>
      <Head>
        <title>{t('pageTitle', { defaultValue: '新闻中心'})}</title>
        <meta name="description" content={t('metaDescription', { defaultValue: '了解我们的最新动态和公告。'})} />
      </Head>

      <div className="bg-gray-50 py-16 md:py-24 px-4">
        <div className="container mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--secondary)] font-[Poppins] mb-4">
              {t('mainHeading', { defaultValue: '新闻中心'})}
            </h1>
            <p className="text-lg text-[var(--accent-gray)] font-[Asap] leading-relaxed">
              {t('description', { defaultValue: '关注我们的最新进展、公告和行业见解。'})}
            </p>
          </div>

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {placeholderNewsData.map((item) => (
              <Link key={item.id} href={`/news/${item.slug}`} className="block group no-underline rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-white">
                {/* Placeholder for Image */}
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-400">
                   {/* 你可以在这里放一个真实的图片，或者保留这个占位符 */}
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                   </svg>
                   {/* <img src={item.image} alt={t(item.titleKey)} className="w-full h-full object-cover" /> */}
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-500 mb-2">{item.date}</p>
                  <h3 className="text-xl font-semibold text-[var(--secondary)] font-[Poppins] mb-3 group-hover:text-[var(--primary)] transition-colors duration-300">
                    {t(item.titleKey, { defaultValue: `文章标题 ${item.id}`})}
                  </h3>
                  <p className="text-base text-[var(--accent-gray)] font-[Asap] mb-4 line-clamp-3">
                     {t(item.excerptKey, { defaultValue: `文章 ${item.id} 的摘要内容...`})}
                  </p>
                  <span className="text-[var(--primary)] font-medium group-hover:underline">
                     {tCommon('readMore', { defaultValue: '阅读更多'})} &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  if (process.env.CMS_URL === 'ignore') {
    return {
      paths: [],
      fallback: false,
    };
  }

  const locales = i18nextConfig.i18n.locales;
  const paths = locales.map((locale) => ({
    params: { locale },
  }));
  return { paths, fallback: false };
};
const namespacesRequired = ['common', 'navbar','footer','news'];
// 使用 getStaticProps 实现 SSG 并加载翻译
export const getStaticProps = makeStaticProps(namespacesRequired);

export default NewsPage; 
