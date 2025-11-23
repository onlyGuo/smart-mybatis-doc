---
title: 主键生成策略
date: 2025/11/21
---

在使用 Smart Mybatis 进行开发时, 我们可以通过配置主键生成策略来控制实体类主键的生成方式。Smart Mybatis 支持多种主键生成策略, 包括自动增长、UUID 以及自定义生成器。
## 配置主键生成策略
要配置主键生成策略, 可以在实体类的主键字段上使用 `@ID` 注解, 并指定所需的生成策略。例如:

```java
public class Example extends PO {
    @ID(generateType = PrimaryGenerateType.AUTO)
    private Long id;

    // ...
}
```

在上述示例中, `generateType` 属性用于指定主键的生成策略。Smart Mybatis 支持以下几种主键生成策略:

| 生成策略            | 描述                                   |
|-----------------|----------------------------------------|
| `AUTO`(默认)      | 数据库自动增长 (如 MySQL 的 AUTO_INCREMENT) |
| `UUID`          | 使用 UUID 作为主键                      |
| `SNOWFLAKE`     | 使用雪花算法生成分布式唯一 ID         |
| `SNOWFLAKE_HEX` | 使用雪花算法生成的十六进制字符串作为主键 |
| `INPUT`         | 手动输入主键, 不进行自动生成             |


