---
title: 安装
date: 2025/11/21
---
::: tip 说明
在这里, 我们将以一个新的 Spring Boot Mybatis 项目为例, 介绍如何将 Smart Mybatis 集成到您现有的的项目中。
:::
## 引入依赖
> 注意: 本库仅做增强不做封装, 因此在引入本依赖前, 应先确保您的项目已经引入了 Mybatis 官方的依赖。
- Maven方式

在您的 `pom.xml` 文件中添加以下依赖
```xml
<dependency>
    <groupId>ink.icoding</groupId>
    <artifactId>spring-boot-starter-smart-mybatis</artifactId>
    <version>1.0.0</version>
</dependency>
```
- Gradle方式

在您的 `build.gradle` 文件中添加以下依赖
```groovy
implementation 'ink.icoding:spring-boot-starter-smart-mybatis:1.0.0'
```

安装完成后, 默认情况下无需任何额外配置, Smart Mybatis 即可在 Spring Boot 环境中自动启用。
您可以根据需要[参考这里](project-configuration.md)调整 `spring.mybatis.smart.*` 配置项以定制化行为。
