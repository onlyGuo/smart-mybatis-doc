---
title: 配置指南 - 项目配置
date: 2025/11/21
---
::: tip 说明
Smart Mybatis 提供了多种依赖, 其中最常用的依赖是 `spring-boot-starter-smart-mybatis`, 
它集成了 Smart Mybatis 的核心功能, 并且与 Spring Boot 无缝集成, 适合大多数项目使用。

本章节将介绍如何在Spring Boot中配置 Smart Mybatis 以满足不同的需求。
:::
## 基本配置
Smart Mybatis 的配置项均以 `spring.mybatis.smart` 为前缀, 可以在 `application.properties` 或 `application.yml` 文件中进行配置。
- 使用 YAML 格式:
```yaml
spring:
  mybatis:
    smart:
      enable: true # 启用或禁用 Smart Mybatis 功能, 默认为 true
      naming-convention: underline_upper # 命名策略, 可选值: underline_to_camel, camel_to_underline
      table-prefix: sm_
      auto-sync-db: true
```
- 使用 Properties 格式:
```properties
spring.mybatis.smart.enable=true
spring.mybatis.smart.naming-convention=underline_upper
spring.mybatis.smart.table-prefix=sm_
spring.mybatis.smart.auto-sync-db=true
```
## 配置项详解
### enable
启用或禁用 Smart Mybatis 功能。默认值为 `true`。 设置为 `false` 可完全禁用 Smart Mybatis, 回退为纯 Mybatis 行为。

### naming-convention
指定实体与数据库之间默认的的命名转换规则。可选值包括:
| 取值         | 描述                                   | 是否默认 |
|--------------|----------------------------------------|----------|
| `underline_upper` | 驼峰转大写下划线 (如 `userName` 转为 `USER_NAME`) | 是       |
| `underline_lower` | 驼峰转小写下划线 (如 `userName` 转为 `user_name`) | 否       |
| `as_is`        | 不进行任何转换, 使用Java实体原名称作为数据库表和列名 | 否       |

### table-prefix
指定数据库表的前缀, 例如设置为 `sm_` 后, 实体 `User` 将映射到数据库表 `SM_USER`。

此选项可与 `naming-convention` 配合使用, 以确保生成的表名符合项目规范。比如, 对于实体 `UserProfile` 且 `table-prefix` 设置为 `sm_`:
- 若 `naming-convention` 设置为 `underline_upper`, 则映射到表 `SM_USER_PROFILE`。
- 若 `naming-convention` 设置为 `underline_lower`, 则映射到表 `sm_user_profile`。
- 若 `naming-convention` 设置为 `as_is`, 则映射到表 `sm_UserProfile`。
- 若不设置 `table-prefix`, 则仅根据 `naming-convention` 生成表名。

### auto-sync-db
启用或禁用自动同步数据库表结构功能。默认值为 `false`。 设置为 `true` 后, 应用启动时将自动检查实体与数据库表结构的差异, 并尝试同步新增字段。

::: tip 警告
启用此功能可能会对生产环境的数据库造成不可预期的更改, 请谨慎使用, 建议仅在开发阶段启用此功能, 以减少手动维护数据库表结构的工作量。
:::

Smart Mybatis 的自动同步功能目前仅支持新增或修改现有字段, 不会删除字段, 以降低风险。
