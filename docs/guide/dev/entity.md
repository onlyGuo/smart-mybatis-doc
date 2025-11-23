---
title: 实体类定义
date: 2025/11/21
---
::: tip 说明
在Smart Mybatis中, 实体类用于表示数据库中的表结构。每个实体类对应数据库中的一张表, 类的属性对应表中的字段。通过定义实体类, 开发者可以方便地进行数据库操作, 如增删改查等。
:::

我们可以使用标准的JavaBean规范来定义实体类, 包括私有属性、公共的getter和setter方法。此外, Smart Mybatis还支持使用注解来指定实体类与数据库表之间的映射关系, 例如指定表名、字段名、主键生成策略等。

## 基础规范
1. 实体类必须继承自`PO`类, 以便获得基本的持久化功能。
2. 实体类中必须有一个主键字段, 并使用`@ID`注解进行标识。

## 简单示例
下面是一个简单的实体类示例:

```java
public class User extends PO {
    @ID
    private Long id; 
    private String username; 
    private String email;

    // Getter和Setter方法
}
```
在这个示例中, `User`类表示数据库中的`user`表, 包含`id`, `username`和`email`三个字段。`@ID`注解用于标识主键字段。

## 进阶用法

### 表名映射
默认情况下, 实体类名会被转换为下划线命名的大写表名(如`UserProfile`会映射为`USER_PROFILE`表)。
具体的转换规则取决于配置中的`naming-convention`选项[命名转换规则详情](/docs/guide/dev/naming.html)。

如果需要自定义表名, 比如将这个实体类强制映射为`custom_user_table`表, 可以使用`@TableName`注解:

```java
@TableName("custom_user_table")
public class User extends PO {
    @ID
    private Long id; 
    private String username; 
    private String email;

    // Getter和Setter方法
}
```

### 字段名映射
类似地, 实体类的属性名会被转换为下划线命名的大写字段名(如`userName`会映射为`USER_NAME`字段)。

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
因为Smart Mybatis 会根据 `String` 类型, 自动映射为 `VARCHAR` 类型。默认长度是`255`。
此时, 我们制定了长度为`50`, 因此最终生成的字段类型是 `VARCHAR(50)`。

同时, Smart Mybatis 也会根据其他常见的Java类型, 自动映射为合适的数据库字段类型, 包括枚举类型和自定义对象类型.
具体可以查看[自定义字段映射](/docs/guide/dev/custom-field-mapping.html)和[对象字段存储](/docs/guide/dev/json-field.html)章节。
