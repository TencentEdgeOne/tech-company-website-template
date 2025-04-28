# 科技公司官网模板
此模板是一个通用的科技公司官网模板，你可以通过修改文案、图片、颜色快速搭建属于自己的公司官网。

UI 基于[Business Tech Company UI Kit
](https://www.figma.com/community/file/1286806143648573757/business-tech-company-ui-kit)实现。

技术栈为：Next.js + Tailwind CSS，并支持国际化。

## 环境变量
此模板的新闻页面使用了PLASMIC CMS API 进行内容管理。
> 如果不需要此功能及页面，可以在环境变量填入 ignore，项目会自动跳过所有 news 相关的页面和链接。

Plasmic CMS API 配置及文档：https://docs.plasmic.app/learn/plasmic-cms-api-reference/

此模板使用了国际化，文章内容也需要对应的多语言版本，需要在 Plasmic 的设置页面配置 `Locales`:
![](https://cdnstatic.tencentcs.com/edgeone/pages/docs/tech-company-website-template-doc1.png)

回到 Model 页面创建 News 数据结构，详情如下：
![](https://cdnstatic.tencentcs.com/edgeone/pages/docs/tech-company-website-template-doc2.png)

## 代码定制
主色调：在`src/styles/globals.css`修改主题色调

替换图片：在`public/images/`下替换

国际化：国际化使用了 next-i18next，翻译文件存储在`public/locales/en`和 `public/locales/zh`


## 本地开发
安装依赖：`npm install`
本地调试：`npm run dev`

## 部署
[![使用 EdgeOne Pages 部署](https://cdnstatic.tencentcs.com/edgeone/pages/deploy.svg)](https://console.cloud.tencent.com/edgeone/pages/new?template=tech-company-website-template)

## 特性
- 使用Next.js TypeScript 开发
- Tailwind CSS 构建灵活简洁的样式
- 纯静态页面，Lighthouse 分数优秀
- 模块化、响应式、可扩展的组件