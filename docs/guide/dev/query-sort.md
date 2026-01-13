---
title: 排序
date: 2025/12/17
---
::: tip 说明
在查询数据时, 通常需要对结果进行排序, Smart Mybatis 提供了灵活便捷的排序功能, 使得开发者可以轻松实现排序查询。
:::

## 使用排序查询
要使用排序查询功能, 可以在查询条件中添加 `orderBy` 方法, 例如:
```java
@Override
public PageResult<Student> searchStudent(String name, Integer minAge, Integer maxAge, Sex sex, Page page) {
    Where where = Where.where()
            .ifAnd(Student::getName, C.LIKE, name)
            .ifAnd(Student::getAge, C.GTE, minAge)
            .ifAnd(Student::getAge, C.LTE, maxAge)
            .ifAnd(Student::getSex, C.EQ, sex)
            // 添加排序条件
            .orderBy(Student::getAge).desc();
    return studentMapper.selectPage(where, page);
}
```
在上面的示例中, `orderBy(Student::getAge).desc()` 方法指定了按照年龄进行降序排序。 如果需要升序排序, 可以使用 `asc()` 方法:

### 对应的SQL语句
```sql
SELECT
    ...
FROM
    STUDENT
<where>
    <if test="name != null and name != ''">
        AND NAME LIKE CONCAT('%', #{name}, '%')
    </if>
    <if test="minAge != null">
        AND AGE >= #{minAge}
    </if>
    <if test="maxAge != null">
        AND AGE &lt;= #{maxAge}
    </if>
    <if test="sex != null">
        AND SEX = #{sex}
    </if>
</where>
ORDER BY AGE DESC
LIMIT #{(page.page - 1) * page.pageSize}, #{page.pageSize}
```
::: tip 注意
此处的SQL语句仅为静态示例，实际生成的SQL中, `LIKE` 比较符会根据入参进行动态适配。

比如:
- 当传入的`name`参数不含通配符, 比如`"John"`时, 生成的SQL会自动添加通配符: `NAME LIKE CONCAT('%', #{name}, '%')`
- 当传入的`name`参数包含通配符, 比如`"%John"`时, 生成的SQL会严格使用入参: `NAME LIKE #{name}`

其中, `LIMIT` 子句的偏移量和记录数是根据 `Page` 对象中的 `page` 和 `pageSize` 参数计算得出的, 实际计算过程在程序中计算, 而非在SQL语句中计算, 此处这样写是为了方便理解他的取值计算过程。

另外, 实际生成的SQL可能会根据所使用的数据库类型有所不同, 例如在某些数据库中可能使用 `OFFSET` 和 `FETCH NEXT` 语法来实现分页。
:::

```java
Where where = Where.where().orderBy(Student::getName).asc();
```
### 对应的SQL语句
```sql
SELECT
    ...
FROM
    STUDENT
ORDER BY NAME ASC
```
## 多字段排序
如果需要按照多个字段进行排序, 可以多次调用 `orderBy` 方法:
```java
Where where = Where.where()
        .orderBy(Student::getSex).asc()
        .orderBy(Student::getAge).desc();
```
### 对应的SQL语句
```sql
SELECT
    ...
FROM
    STUDENT
ORDER BY 
    SEX ASC, 
    AGE DESC
```
在上面的示例中, 结果将首先按照性别升序排序, 然后在性别相同的记录中按照年龄降序排序。

## 重置排序
从上面的示例中, 可以看到多次调用`orderBy`方法会叠加排序, 如果只想更改以前的排序方法, 那么可以使用`resetOrderBy`方法:
```java
// 最终结果为按年龄升序排序
Where where = Where.where()
        .orderBy(Student::getAge).desc()
        .resetOrderBy(Student::getAge).asc();
```
### 对应的SQL语句
```sql
SELECT
    ...
FROM
    STUDENT
ORDER BY 
    AGE ASC
```
