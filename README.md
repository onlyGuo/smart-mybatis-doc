---
home: true
modules:
  - BannerBrandCode
#  - Blog
#  - Footer
bannerBrand:
  bgImage: '/bg.svg'
  title: Welcome to Smart Mybatis!
#  description: 
  code: |
    ```java
    List<User> users = userMapper.select(
        Where.where(User::getAge).gt(18)
             .and(User::getSex).eq(Sex.MALE)
             .and(Where.or(
                    Where.where(User::getRole).eq(Role.TEACHER)
                         .and(User::getStatus).eq(Status.ACTIVE)),
                    Where.where(User::getRole).eq(Role.STUDENT)
                         .and(User::getStatus).eq(Status.DISABLED))
             ))
    );
    ```
  tagline: Smart Mybatis 通过 Lambda DSL 实现了统一了实体、Mapper 与 SQL 之间的映射。它是一个对 MyBatis 的增强组件，而非二次封装. 也不会代理 MyBatis 的类，保持 MyBatis 原生功能零侵入, 兼容所有MyBatis插件。
  buttons:
    - { text: 快速开始, link: '/docs/guide/quick/quick-start.html' }
    - { text: GitHub, link: 'https://github.com/onlyGuo/smart-mybatis', type: 'plain' }
  socialLinks:
    - { icon: 'LogoGithub', link: 'https://github.com/onlyGuo/smart-mybatis' }
---
