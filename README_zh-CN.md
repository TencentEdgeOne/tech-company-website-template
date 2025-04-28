# 科技公司官网模板
此模板是一个通用的科技公司官网模板，你可以通过修改文案、图片、颜色快速搭建属于自己的公司官网。

UI 基于[Business Tech Company UI Kit
](https://www.figma.com/community/file/1286806143648573757/business-tech-company-ui-kit)实现。

技术栈为：Next.js + Tailwind CSS，并支持国际化。

## 代码定制
主色调：在`src/styles/globals.css`修改主题色调

替换图片：在`public/images/`下替换

国际化：国际化使用了 next-i18next，翻译文件存储在`public/locales/en`和 `public/locales/zh`

## 本地开发
安装依赖：`npm install`
本地调试：`npm run dev`

## 部署
[![使用 EdgeOne Pages 部署](https://cdnstatic.tencentcs.com/edgeone/pages/deploy.svg)](https://console.cloud.tencent.com/edgeone/pages/new?template=tech-company-website-template)