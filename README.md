---
home: true
modules:
  - BannerBrand
#  - Blog
#  - MdContent
#  - Footer
bannerBrand:
  bgImage: '/bg.svg'
  title: Welcome to Smart Mybatis!
#  description: 轻量的 MyBatis 增强库，通过Lambda DSL实现高效便捷的CRUD操作。
  tagline: Smart Mybatis 通过 Lambda DSL 实现了统一了实体、Mapper 与 SQL 之间的映射。它是一个对 MyBatis 的增强组件，而非二次封装. 也不会代理 MyBatis 的类，保持 MyBatis 原生功能零侵入, 兼容所有MyBatis插件。
  buttons:
    - { text: 快速开始, link: '/docs/guide/quick/quick-start.html' }
    - { text: GitHub, link: 'https://github.com/onlyGuo/smart-mybatis', type: 'plain' }
  socialLinks:
    - { icon: 'LogoGithub', link: 'https://github.com/onlyGuo/smart-mybatis' }
---

## 快速开始

**npx**

```bash
# 初始化，并选择 2.x
npx @vuepress-reco/theme-cli init
```

**npm**

```bash
# 初始化，并选择 2.x
npm install @vuepress-reco/theme-cli@1.0.7 -g
theme-cli init
```

**yarn**

```bash
# 初始化，并选择 2.x
yarn global add @vuepress-reco/theme-cli@1.0.7
theme-cli init
```
