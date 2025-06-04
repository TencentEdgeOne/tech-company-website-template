import { GetServerSideProps } from 'next';
import i18nextConfig from '../../next-i18next.config.js';

const DOMAIN = 'https://example.com'; // 替换为你的实际域名

// 定义所有静态路由
const STATIC_PAGES = [
  '',           // 首页
  '/about',     // 关于页
  '/contact',   // 联系页
  '/partners',  // 合作伙伴页
  '/projects',  // 项目页
];

function generateSiteMap(domain: string): string {
  const locales = i18nextConfig.i18n.locales;
  const defaultLocale = i18nextConfig.i18n.defaultLocale;
  
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:xhtml="http://www.w3.org/1999/xhtml">
      ${STATIC_PAGES.map(page => 
        locales.map(locale => {
          const path = locale === defaultLocale ? page : `/${locale}${page}`;
          return `<url>
            <loc>${domain}${path}</loc>
            ${locales.map(alterLocale => {
              const alterPath = alterLocale === defaultLocale ? page : `/${alterLocale}${page}`;
              return `<xhtml:link 
                rel="alternate" 
                hreflang="${alterLocale}" 
                href="${domain}${alterPath}"/>`;
            }).join('')}
            <changefreq>weekly</changefreq>
            <priority>${page === '' ? '1.0' : '0.8'}</priority>
            <lastmod>${new Date().toISOString()}</lastmod>
          </url>`;
        }).join('')
      ).join('')}
    </urlset>`;
}

const SiteMap = () => {
  // getServerSideProps 会处理 XML 生成
  return null;
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  // 生成 sitemap XML
  const sitemap = generateSiteMap(DOMAIN);

  // 设置正确的 header
  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=1200, stale-while-revalidate=600');
  
  // 发送 XML
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default SiteMap; 