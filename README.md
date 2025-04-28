# Technology Company Website Template
This template is a general-purpose technology company website template. You can quickly build your own company website by modifying the text, images, and colors.

The UI is based on [Business Tech Company UI Kit](https://www.figma.com/community/file/1286806143648573757/business-tech-company-ui-kit).

Tech stack: Next.js + Tailwind CSS, with internationalization support.

## Environment Variables
The news page in this template uses the Plasmic CMS API for content management.
> If this feature and its pages are not needed, you can set the corresponding environment variable to `ignore`. The project will then automatically skip all news-related pages and links.

Plasmic CMS API configuration and documentation: https://docs.plasmic.app/learn/plasmic-cms-api-reference/

This template uses internationalization, so the article content also requires corresponding multi-language versions. You need to configure `Locales` on the Plasmic settings page:
![](https://cdnstatic.tencentcs.com/edgeone/pages/docs/tech-company-website-template-doc1.png)

Return to the Model page to create the News data structure, the details are as follows:
![](https://cdnstatic.tencentcs.com/edgeone/pages/docs/tech-company-website-template-doc2.png)


## Code Customization
Main color theme: Modify the theme color in `src/styles/globals.css`

Replace images: Replace in `public/images/`

Internationalization: Internationalization uses next-i18next, with translation files stored in `public/locales/en` and `public/locales/zh`

## Local Development
Install dependencies: `npm install`
Local debugging: `npm run dev`

## Deploy
[![Deploy with EdgeOne Pages](https://cdnstatic.tencentcs.com/edgeone/pages/deploy.svg)](https://edgeone.ai/pages/new?template=tech-company-website-template)
