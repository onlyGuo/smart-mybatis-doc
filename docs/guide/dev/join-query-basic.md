---
title: 联表查询基础
date: 2026/02/26
---
::: tip 说明
本篇介绍 `Smart Mybatis` 的基础联表查询能力, 面向第一次接触联表的读者。
如果你还不了解 `leftJoin` 的核心参数与结果含义, 建议从本篇开始。
:::

## 你将学到什么
- 如何定义联表字段并填充到主实体中
- `leftJoin` 的核心参数与含义
- 一次最小可用的联表查询
- SQL 对照, 帮你快速建立直觉

## 联表查询示例
假设我们有两个实体类 `User` 和 `Order`, 其中 `User` 和 `Order` 之间存在一对多的关系。
我们要做的事情很简单: 查询订单时, 把对应用户的名字一起查出来, 并填充到 `Order.userName` 字段。

### 1) 实体定义
`User` 实体:
```java
@TableName("user")
public class User {
    @ID
    private Long id;
    private String name;
    // Getter和Setter方法
}
```
`Order` 实体:
```java
@TableName("order")
public class Order {
    @ID
    private Long id;
    private Long userId;
    private String product;

    /**
     * 外键关联字段, 其中:
     * - `exist = false` 表示该字段不对应数据库表中的列, 仅用于关联查询时存储关联数据。
     * - `link = User.class` 指定关联的实体类为 `User`
     * - `linkField = "name"` 指定关联的字段为 `User` 实体类中的 `name` 字段。
     */
    @TableField(exist = false, link = User.class, linkField = "name")
    private String userName;
    // Getter和Setter方法
}
```

### 2) 最小可用查询: 查询订单并填充关联字段
我们希望在查询订单时, 同时获取订单对应的用户名字:
```java
List<Order> orders = orderMapper.select(Where.where().leftJoin(
        User.class,
        "u",
        Where.where(User::getId).eq(Order::getUserId),
        Order::getUserName
));
```

#### SQL 对照示例
上面的写法大致等价于下面的 SQL (仅用于理解):
```sql
SELECT
  o.*, u.name AS user_name
FROM `order` o
LEFT JOIN `user` u ON u.id = o.user_id;
```

#### 参数说明
- `User.class` 指定要联表查询的实体类。
- `"u"` 是联表查询中 `User` 表的别名。
- `Where.where(User::getId).eq(Order::getUserId)` 定义联表条件, 表示 `User.id = Order.userId`。
- `Order::getUserName` 指定要填充的字段, 这里会把 `User.name` 写入 `Order.userName`。

#### 结果说明
查询结果 `orders` 将包含所有订单信息, 同时每个订单的 `userName` 字段将包含对应用户的名字。

## 逐步拆解: 读懂联表条件
将联表条件单独拿出来看, 会更容易理解:
```java
Where joinOn = Where.where(User::getId).eq(Order::getUserId);
```
它表达的是 SQL 里的 `User.id = Order.userId` 条件, 也就是让订单和用户按外键关联。

把这个条件再放回联表查询中:
```java
List<Order> orders = orderMapper.select(Where.where().leftJoin(
        User.class,
        "u",
        joinOn,
        Order::getUserName
));
```

## 变体示例: 只联表, 不填充字段
如果你只关心联表条件, 不需要填充任何字段, 可以省略最后的填充参数:
```java
List<Order> orders = orderMapper.select(Where.where().leftJoin(
        User.class,
        "u",
        Where.where(User::getId).eq(Order::getUserId)
));
```

补充一个对应的 SQL 片段 (仅用于理解):
```sql
SELECT
  o.*
FROM `order` o
LEFT JOIN `user` u ON u.id = o.user_id;
```

## 变体示例: 填充多个字段
`leftJoin` 最后一个参数可以是多个字段, 你可以一次填充多个关联字段:
```java
List<Order> orders = orderMapper.select(Where.where().leftJoin(
        User.class,
        "u",
        Where.where(User::getId).eq(Order::getUserId),
        Order::getUserName,
        Order::getUserEmail
));
```
这里假设 `Order` 里还定义了 `userEmail` 字段, 并在 `@TableField` 中配置了 `linkField = "email"`。

补充一个对应的 SQL 片段 (仅用于理解):
```sql
SELECT
  o.*, u.name AS user_name, u.email AS user_email
FROM `order` o
LEFT JOIN `user` u ON u.id = o.user_id;
```

::: tip 注意事项
- `Smart Mybatis` 的联表查询使用 LEFT JOIN, 这意味着即使某些订单没有对应的用户信息, 这些订单仍会被包含在结果中。
- 请确保关联实体类与字段配置正确, 避免联表结果异常。
:::

## 接下来读什么
- [了解联表后过滤条件如何影响结果](join-query-filter.md)
- [了解多表联查的写法与思路](join-query-multi.md)

