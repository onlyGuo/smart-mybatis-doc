---
title: 对象字段存储
date: 2025/11/21
---
::: tip 说明
在使用 Smart Mybatis 进行开发时, 我们可以将实体类中的对象字段存储为 JSON 格式的字符串。这对于存储复杂的数据结构非常有用, 可以简化数据库设计并提高数据的可读性。
:::
您必须知道, `@TableField` 注解并非只可以对字段和属性进行映射, 它还可以对字段的存储方式进行配置. 例如, 我们可以将一个对象字段存储为 JSON 字符串.
## 配置对象字段存储为 JSON
要将对象字段存储为 JSON 格式, 可以在实体类的字段上使用 `@TableField` 注解, 并设置 `fieldType` 属性为 `FieldType.JSON`。例如:

```java
public class Example extends PO {
    @TableField(json = true)
    private Address address;
    // ...
}
```
在上述示例中, `address` 字段是一个对象类型, 通过设置 `json = true`, Smart Mybatis 会将该字段序列化为 JSON 字符串存储在数据库中, 并在读取时反序列化回对象。
## 示例
下面是一个完整的示例, 展示如何使用对象字段存储为 JSON:

```java
public class UserProfile extends PO {
    @ID
    private Long id;

    private String userName;

    @TableField(json = true)
    private Address address;

    // Getter和Setter方法
}
public class Address {
    private String street;
    private String city;
    private String zipCode;

    // Getter和Setter方法
}
```
在这个示例中, `UserProfile` 类包含一个 `Address` 对象字段。通过使用 `@TableField(json = true)`, `address` 字段将被存储为 JSON 格式的字符串, 例如:

```json
{
    "street": "123 Main St",
    "city": "Springfield",
    "zipCode": "12345"
}
```
这样, 我们可以方便地存储和检索复杂的对象数据, 而无需创建额外的数据库表。

## 注意事项
- 使用 JSON 存储对象字段时, 请确保对象类是可序列化的, 并且包含默认的无参构造函数。
- Smart Mybatis 会强制将Json字段的数据库列类型设置为`TEXT`, 以确保可以存储较大的JSON字符串和顺序有效性。
- 在查询时, Smart Mybatis 会自动处理 JSON 的序列化和反序列化, 开发者无需手动进行转换。
- Smart Mybatis 使用 Jackson 作为默认的 JSON 处理库, 确保项目中包含相应的依赖。
