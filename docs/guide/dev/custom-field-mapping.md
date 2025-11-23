---
title: 自定义字段映射
date: 2025/11/21
---
默认情况下, 实体类的属性名会被转换为下划线命名的大写字段名(如`userName`会映射为`USER_NAME`字段)。

如果需要自定义字段名比如将`id`强制映射为`UID`, 可以使用`@TableField`注解:

```java
@TableName("custom_user_table")
public class User extends PO {
    @ID
    @TableField("UID")
    private Long id;
    private String username;
    private String email;

    // Getter和Setter方法
}
```
除此之外, 您还可以使用`@TableField`注解的其他属性来自定义约束映射表中的字段类型, 长度, 注释值等。

```java
@TableName("custom_user_table")
public class User extends PO {
    @ID
    @TableField("UID")
    private Long id;

    @TableField(length = 50, columnType = "VARCHAR(50)", description = "用户名字段")
    private String username;
    private String email;

    // Getter和Setter方法
}
```

事实上, 我们会根据实体类的属性类型, 自动推断数据库字段的类型,
以以下代码为例:

```java
@TableField(length = 50, columnType = "VARCHAR(50)", description = "用户名字段")
```
它等效于:
```java
@TableField(length = 50, description = "用户名字段")
```

## 配置全局字段映射规则
除了在实体类中使用注解自定义字段映射外, 我们还可以通过全局配置来定义字段映射规则, 以便在整个项目中保持一致性。
在`application.yml`或`application.properties`中, 我们可以添加如下配置:
- 使用 YAML 格式:
```yaml
spring:
  mybatis:
    smart:
      naming-convention: underline_upper
```
- 使用 Properties 格式:
```properties
spring.mybatis.smart.naming-convention=underline_upper
```
在上述配置中, 我们将命名策略设置为驼峰转大写下划线(`underline_upper`), 这也是Smart Mybatis的默认命名策略。
通过这种方式, 我们可以确保所有实体类的属性名都遵循相同的映射规则, 提高代码的可读性和维护性。
## 可选命名策略
Smart Mybatis支持以下几种命名策略:

| 取值              | 描述                                   |
|-------------------|----------------------------------------|
| `underline_upper` | 驼峰转大写下划线 (如 `userName` 转为 `USER_NAME`) |
| `underline_lower` | 驼峰转小写下划线 (如 `userName` 转为 `user_name`) |
| `as_is`           | 不进行任何转换, 使用Java实体原名称作为数据库表和列名 |

注意: 如果在实体类中使用了`@TableField`注解自定义字段名, 则该注解的配置优先于全局命名策略。
