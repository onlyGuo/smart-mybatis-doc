---
title: 联表查询中的条件过滤
date: 2026/02/26
---
::: tip 说明
本篇默认你已经掌握基础联表查询, 并能使用 `leftJoin` 完成字段填充。
如果你尚未熟悉基础用法, 请先阅读: [联表查询基础](join-query-basic.md)。
:::

## 你将学到什么
- 联表后的过滤条件如何影响结果集
- 在 `JOIN ON` 中过滤与在 `WHERE` 中过滤的区别
- 如何选择更符合业务语义的写法

## 需求场景
我们希望“只查用户名字包含张”的订单, 并理解两种写法的差异。

### 1) 联表完成后再过滤
先把用户名字联出来, 再在主 `Where` 里做过滤:
```java
Where joinOn = Where.where(User::getId).eq(Order::getUserId);

List<Order> orders = orderMapper.select(Where.where()
        .leftJoin(User.class, "u", joinOn, Order::getUserName)
        .like(Order::getUserName, "%张%")
);
```

SQL 对照 (仅用于理解):
```sql
SELECT
  o.*, u.name AS user_name
FROM `order` o
LEFT JOIN `user` u ON u.id = o.user_id
WHERE u.name LIKE '%张%';
```

**含义**: 过滤条件在 `WHERE` 中, 会把不满足条件的订单整体过滤掉。

### 2) 在联表过程中就过滤
把过滤条件放进联表条件里, 让 JOIN 时就只关联“包含张”的用户:
```java
Where joinOn = Where.where(User::getId)
        .eq(Order::getUserId)
        .and(User::getName).like("%张%");

List<Order> orders = orderMapper.select(Where.where()
        .leftJoin(User.class, "u", joinOn, Order::getUserName)
);
```

SQL 对照 (仅用于理解):
```sql
SELECT
  o.*, u.name AS user_name
FROM `order` o
LEFT JOIN `user` u
  ON u.id = o.user_id AND u.name LIKE '%张%';
```

**含义**: 过滤条件在 `JOIN ON` 中, 不满足条件的订单仍保留, 但联表字段会是 `null`。

## 如何选择
- **需要过滤订单本身**: 选择“联表完成后再过滤”。
- **只想影响联表字段是否填充**: 选择“在联表过程中就过滤”。

## 常见组合
实际业务中, 常常会同时存在“订单自身条件 + 用户条件”, 可以按语义拆开:
```java
Where joinOn = Where.where(User::getId)
        .eq(Order::getUserId)
        .and(User::getName).like("%张%");

List<Order> orders = orderMapper.select(Where.where()
        .eq(Order::getStatus, "PAID")
        .leftJoin(User.class, "u", joinOn, Order::getUserName)
);
```

::: tip 注意事项
- 使用 `LEFT JOIN` 时, `JOIN ON` 的过滤不会影响主表的行数。
- `WHERE` 过滤会影响最终结果集, 请确认这符合你的业务需求。
:::

## 接下来读什么
- 了解多表联查的写法与思路: [多表联表查询](join-query-multi.md)

