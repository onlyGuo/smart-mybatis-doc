---
title: 分片查询优化
date: 2025/12/27
---
::: tip 说明
在查询数据时, 通常不需要一次性加载所有数据, Smart Mybatis 提供了便捷的分片查询功能, 使得开发者可以轻松实现分页查询。
分片查询条件加入顺序不分先后, 只需在查询条件中的任意位置添加 `limit` 方法即可。
:::

## 使用分片查询
要使用分片查询功能, 可以在查询方法中传入 `limit` 参数, 例如:

```java
@Service
public class StudentServiceImpl implements StudentService {

    @Resource
    private StudentMapper studentMapper;

    @Override
    public List<Student> searchStudent(String name, Integer minAge, Integer maxAge, Sex sex) {
        Where where = Where.where()
                .ifAnd(Student::getName, C.LIKE, name)
                .ifAnd(Student::getAge, C.GTE, minAge)
                .ifAnd(Student::getAge, C.LTE, maxAge)
                .ifAnd(Student::getSex, C.EQ, sex)
                // 添加分片查询条件
                .limit(10);
        return studentMapper.select(where);
    }
}
```
在上面的示例中, `limit(10)` 方法指定了每次查询返回的最大记录数为 10 条。 其中`limit`方法可以接受两个参数, 第一个参数是偏移量, 第二个参数是返回的记录数。例如, `limit(20, 10)` 表示从第 21 条记录开始, 返回 10 条记录。

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
LIMIT 0, 10
```
::: tip 注意
此处的SQL语句仅为静态示例，实际生成的SQL中, `LIKE` 比较符会根据入参进行动态适配。

比如:
- 当传入的`name`参数不含通配符, 比如`"John"`时, 生成的SQL会自动添加通配符: `NAME LIKE CONCAT('%', #{name}, '%')`
- 当传入的`name`参数包含通配符, 比如`"%John"`时, 生成的SQL会严格使用入参: `NAME LIKE #{name}`
:::

```java
@Service
public class StudentServiceImpl implements StudentService {

    @Resource
    private StudentMapper studentMapper;

    @Override
    public List<Student> searchStudent(String name, Integer minAge, Integer maxAge, Sex sex) {
        Where where = Where.where()
                .ifAnd(Student::getName, C.LIKE, name)
                .ifAnd(Student::getAge, C.GTE, minAge)
                .ifAnd(Student::getAge, C.LTE, maxAge)
                .ifAnd(Student::getSex, C.EQ, sex)
                // 添加分片查询条件
                .limit(20, 10);
        return studentMapper.select(where);
    }
}
```

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
LIMIT 20, 10
```
::: tip 注意
此处的SQL语句仅为静态示例，实际生成的SQL中, `LIKE` 比较符会根据入参进行动态适配。

比如:
- 当传入的`name`参数不含通配符, 比如`"John"`时, 生成的SQL会自动添加通配符: `NAME LIKE CONCAT('%', #{name}, '%')`
- 当传入的`name`参数包含通配符, 比如`"%John"`时, 生成的SQL会严格使用入参: `NAME LIKE #{name}`
:::
