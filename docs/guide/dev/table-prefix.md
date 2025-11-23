---
title: 自定义表前缀
date: 2025/11/21
---

在使用Smart Mybatis时, 我们可以在全局配置中设置一个默认的表前缀, 以便在所有实体类映射的表名前自动添加该前缀。

Smart Mybatis 的配置项均以 `spring.mybatis.smart` 为前缀, 可以在 `application.properties` 或 `application.yml` 文件中进行配置。

## 配置表前缀
要设置全局的表前缀, 可以在配置文件中添加以下配置:

```yaml
spring:
  mybatis:
    smart:
      table-prefix: "tbl_"
```
或者使用 Properties 格式:

```properties
spring.mybatis.smart.table-prefix=tbl_
```
在上述示例中, 我们将表前缀设置为 `tbl_`。这样, 所有实体类映射的表名都会自动添加该前缀。
