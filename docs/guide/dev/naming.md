---
title: 命名策略
date: 2025/11/21
---
::: tip 说明
在使用Smart Mybatis时, 命名策略决定了Java实体类和数据库表及字段之间的默认映射关系。合理的命名策略可以提高代码的可读性和维护性。
:::
我们可以通过修改全局配置来设置命名策略, 以`application.yml`为例:

```yaml
spring:
  mybatis:
    smart:
      naming-convention: underline_upper
```
以上配置将全局命名策略设置为驼峰转大写下划线。这也是Smart Mybatis的默认命名策略。
## 可选命名策略
Smart Mybatis支持以下几种命名策略:
| 取值              | 描述                                   |
|-------------------|----------------------------------------|
| `underline_upper` | 驼峰转大写下划线 (如 `userName` 转为 `USER_NAME`) |
| `underline_lower` | 驼峰转小写下划线 (如 `userName` 转为 `user_name`) |
| `as_is`           | 不进行任何转换, 使用Java实体原名称作为数据库表和列名 |
## 示例
假设我们有一个实体类`UserProfile`:
```java
public class UserProfile extends PO {
    @ID
    private Long id;
    private String userName;
    private String emailAddress;
    // Getter和Setter方法
}
```
根据不同的命名策略, 该实体类将映射到不同的数据库表和字段:
| 命名策略          | 映射的表名        | 映射的字段名               |
|-------------------|-------------------|----------------------------|
| `underline_upper` | `USER_PROFILE`    | `ID`, `USER_NAME`, `EMAIL_ADDRESS` |
| `underline_lower` | `user_profile`    | `id`, `user_name`, `email_address` |
| `as_is`           | `UserProfile`     | `id`, `userName`, `emailAddress`   |
## 自定义命名
如果默认的命名策略不符合项目需求, 可以通过注解`@TableName`和`@TableField`来自定义表名和字段名:
```java
@TableName("custom_user_table")
public class UserProfile extends PO {
    @ID
    @TableField("UID")
    private Long id;
    @TableField("USERNAME")
    private String userName;
    @TableField("EMAIL")
    private String emailAddress;
    // Getter和Setter方法
}
```
通过以上配置和注解, 我们可以灵活地控制实体类与数据库表及字段之间的映射关系, 以满足不同项目的命名规范要求。
