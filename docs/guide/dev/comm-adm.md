---
title: 常用的增删改
date: 2025/12/03
---
在使用 `Smart Mybatis` 进行项目开发时, 我们通常需要进行各种增删改操作。`Smart Mybatis` 提供了丰富的内置方法来简化这些操作, 使得我们可以更高效地与数据库进行交互。

::: tip 说明
本章节介绍的方法均为 `Smart Mybatis` 在`SmartMapper`基类中提供的内置方法, 继承该类后, 无需额外编写 SQL 语句即可使用。
:::

## 插入数据
使用 `insert` 方法可以将一个实体对象插入到数据库中。该方法会根据实体类的字段映射关系生成相应的 SQL 语句。

```java
/**
 * 插入记录
 * @param record
 *      记录
 * @return 受影响的行数
 */
int insert(T record);
```

### 示例
```java
User user = new User();
user.setUsername("john_doe");
user.setEmail("example@example.com");
mapper.insert(user);
```

## 批量插入数据
使用 `insertBatch` 方法可以将多个实体对象批量插入到数据库中, 提高插入效率。

```java
/**
 * 批量插入记录
 * @param records
 *      记录列表
 * @return 受影响的行数
 */
int insertBatch(List<T> records);
```
### 示例
```java
List<User> users = Arrays.asList(
    new User("alice", "1@example.com"),
    new User("bob", "2@example.com")
);
mapper.insertBatch(users);
```

## 更新数据
使用 `updateById` 方法可以根据主键更新实体对象的字段值。

```java
/**
 * 根据主键更新记录
 * @param record
 *      记录
 * @return 受影响的行数
 */
int updateById(T record);
```
### 示例
```java
User user = mapper.selectById(1);
user.setEmail("new@example.com");
mapper.updateById(user);
```

## 删除数据
使用 `deleteById` 方法可以根据主键删除对应的记录。

```java
/**
 * 根据主键删除记录
 * @param id
 *      主键
 * @return 受影响的行数
 */
int deleteById(Serializable id);
```

### 示例
```java
mapper.deleteById(1);
```
## 批量删除数据
使用 `deleteByIds` 方法可以根据多个主键批量删除对应的记录。

```java
/**
 * 根据主键列表批量删除记录
 * @param ids
 *      主键列表
 * @return 受影响的行数
 */
int deleteByIds(List<? extends Serializable> ids);
```
### 示例
```java
List<Integer> ids = Arrays.asList(1, 2, 3);
mapper.deleteByIds(ids);
```

## 根据条件删除数据
使用 `delete` 方法可以根据指定的条件删除记录。

```java
/**
 * 根据条件删除记录
 * @param where
 *      条件构造器
 * @return 受影响的行数
 */
int delete(Where where);
```
### 示例
```java
Where where = Where.where(User::getEmail).like("%example.com");
mapper.delete(where);
```
## 总结
通过以上方法, 你可以方便地使用 `Smart Mybatis` 进行各种增删改操作。利用这些内置方法, 可以大大简化数据库交互的代码量, 提高开发效率。接下来, 你可以结合查询操作, 实现更复杂的业务逻辑。

::: tip 说明
更多高级功能和配置选项, 请参考后续章节的详细介绍。 有关查询操作的内容, 请参阅[条件构造器](./query-builder.md)。但实际上, 我更推荐你使用[DSL 条件查询](./dsl-query.md)来进行查询操作, 它能让你写出更简洁优雅的代码。
:::
