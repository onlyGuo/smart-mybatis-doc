---
title: 多表联表查询
date: 2026/02/26
---
::: tip 说明
本篇默认你已经掌握基础联表查询, 并能使用 `leftJoin` 完成字段填充。
如果你尚未熟悉基础用法, 请先阅读: [基础联表查询](join-query-basic.md)。
:::

## 你将学到什么
- 多表联查的思路与写法
- 如何拆分多个联表条件并串联 `leftJoin`
- 多表联查的 SQL 对照

## 关系设定
假设有以下关系:
- `Order` 通过 `userId` 关联 `User`
- `OrderItem` 通过 `orderId` 关联 `Order`
- `OrderItem` 通过 `productId` 关联 `Product`

为了展示联查后的结果, 假设 `Order` 里还有一个 `productName` 字段用于填充商品名。

## 1) 拆解每个联表条件
```java
Where joinUser = Where.where(User::getId).eq(Order::getUserId);
Where joinItem = Where.where(OrderItem::getOrderId).eq(Order::getId);
Where joinProduct = Where.where(Product::getId).eq(OrderItem::getProductId);
```

## 2) 串联多个 `leftJoin`
```java
List<Order> orders = orderMapper.select(Where.where()
        .leftJoin(User.class, "u", joinUser, Order::getUserName)
        .leftJoin(OrderItem.class, "oi", joinItem)
        .leftJoin(Product.class, "p", joinProduct, Order::getProductName)
);
```

## SQL 对照示例
```sql
SELECT
  o.*, u.name AS user_name, p.name AS product_name
FROM `order` o
LEFT JOIN `user` u ON u.id = o.user_id
LEFT JOIN `order_item` oi ON oi.order_id = o.id
LEFT JOIN `product` p ON p.id = oi.product_id;
```

::: tip 常见注意点
- 多表联查就是“多个 `leftJoin` 串起来”, 每个联表都有自己独立的 `ON` 条件。
- 仍然是 LEFT JOIN, 关联不存在时对应的填充字段为 `null`。
- 如果多表之间存在一对多, 结果行数可能会被放大, 注意业务层去重或聚合。
:::

## 接下来读什么
- 回到基础联表查询: [基础联表查询](join-query-basic.md)
- 了解联表过滤语义: [联表查询中的条件过滤](join-query-filter.md)

