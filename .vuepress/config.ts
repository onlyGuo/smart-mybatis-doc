import { defineUserConfig } from "vuepress";
import recoTheme from "vuepress-theme-reco";
import { viteBundler } from '@vuepress/bundler-vite'
import { webpackBundler } from '@vuepress/bundler-webpack'

export default defineUserConfig({
  title: "Smart Mybatis",
  description: "轻量的 MyBatis 增强库，通过Lambda DSL实现高效便捷的CRUD操作",
  bundler: viteBundler(),
  dest: "./dist",
  theme: recoTheme({
    logo: "/logo.png",
    author: "郭胜凯",
    authorAvatar: "/head.png",
    docsRepo: "https://github.com/onlyGuo/smart-mybatis-doc",
    docsBranch: "main",
    lastUpdatedText: "",
    // series 为原 sidebar
    series: {
      "/docs/guide/": [
        {
          text: "从这里开始",
          children: [
            // 快速开始
            "quick/quick-start",
            // 安装
            "quick/project-setup",
            // 配置
            "quick/project-configuration",
            // 开发
            "quick/project-dev",
          ],
        },
        {
          text: "开发指南",
          children: [
            // 前言
            "dev/preface",
            // 实体类定义
            "dev/entity",
            // 命名策略
            "dev/naming",
            // 常用的增删改
            "dev/comm-adm",
            // 查询条件构造器
            "dev/query-builder",
            // 自定义表前缀
            "dev/table-prefix",
            // 自动同步数据库
            "dev/auto-sync-db",
            // 使用初始化脚本
            "dev/init-sql",
            // 主键生成策略
            "dev/primary-generator",
            // 自定义字段映射
            "dev/custom-field-mapping",
            // 对象字段存储
            "dev/json-field",
            // 开发规范
            "dev/guidelines",
          ],
        },
        {
          text: "查询指南",
          children: [
            // 使用DSL构建查询
            "dev/dsl-query",
            // 非空条件查询
            "dev/not-null-query",
            // 分片查询
            "dev/query-limit",
            // 分页查询
            "dev/query-page",
            // 排序
            "dev/query-sort",
            // 联表查询
            "dev/join-query",
            // 联表查询基础
            "dev/join-query-basic",
            // 联表查询中的条件过滤
            "dev/join-query-filter",
            // 多表联表查询
            "dev/join-query-multi",
          ]
        }
      ],
    },
    navbar: [
      { text: "主页", link: "/" },
      { text: "关于", link: "/views/about.html" },
      {
        text: "文档",
        children: [
          { text: "快速开始", link: "/docs/guide/quick/quick-start.html" },
          { text: "开发指南", link: "/docs/guide/dev/preface.html" },
          { text: "查询指南", link: "/docs/guide/dev/dsl-query.html" },
        ],
      },
      { text: "博客", link: "/blogs/" },

    ],
    // bulletin: {
    //   body: [
    //     {
    //       type: "text",
    //       content: `🎉🎉🎉 reco 主题 2.x 已经接近 Beta 版本，在发布 Latest 版本之前不会再有大的更新，大家可以尽情尝鲜了，并且希望大家在 QQ 群和 GitHub 踊跃反馈使用体验，我会在第一时间响应。`,
    //       style: "font-size: 12px;",
    //     },
    //     {
    //       type: "hr",
    //     },
    //     {
    //       type: "title",
    //       content: "QQ 群",
    //     },
    //     {
    //       type: "text",
    //       content: `
    //       <ul>
    //         <li>QQ群1：1037296104</li>
    //         <li>QQ群2：1061561395</li>
    //         <li>QQ群3：962687802</li>
    //       </ul>`,
    //       style: "font-size: 12px;",
    //     },
    //     {
    //       type: "hr",
    //     },
    //     {
    //       type: "title",
    //       content: "GitHub",
    //     },
    //     {
    //       type: "text",
    //       content: `
    //       <ul>
    //         <li><a href="https://github.com/vuepress-reco/vuepress-theme-reco-next/issues">Issues<a/></li>
    //         <li><a href="https://github.com/vuepress-reco/vuepress-theme-reco-next/discussions/1">Discussions<a/></li>
    //       </ul>`,
    //       style: "font-size: 12px;",
    //     },
    //     {
    //       type: "hr",
    //     },
    //     {
    //       type: "buttongroup",
    //       children: [
    //         {
    //           text: "打赏",
    //           link: "/docs/others/donate.html",
    //         },
    //       ],
    //     },
    //   ],
    // },
    // commentConfig: {
    //   type: 'valine',
    //   // options 与 1.x 的 valineConfig 配置一致
    //   options: {
    //     // appId: 'xxx',
    //     // appKey: 'xxx',
    //     // placeholder: '填写邮箱可以收到回复提醒哦！',
    //     // verify: true, // 验证码服务
    //     // notify: true,
    //     // recordIP: true,
    //     // hideComments: true // 隐藏评论
    //   },
    // },
  }),
  // debug: true,
});
