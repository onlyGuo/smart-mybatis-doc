---
title: 分页查询
date: 2025/12/17
---
::: tip 说明
在查询数据时, 通常需要根据前端传入的分页参数来限制返回的数据量, Smart Mybatis 提供了便捷的分页查询功能, 使得开发者可以轻松实现分页查询。
:::

## 使用分页查询
要使用分页查询功能, 可以使用`selectPage`方法, 并传入`Page`对象, 例如:

```java
@Service
public class StudentServiceImpl implements StudentService {

    @Resource
    private StudentMapper studentMapper;

    /**
     * 分页查询学生信息
     * @param name      姓名
     * @param minAge    最大年龄
     * @param maxAge    最小年龄
     * @param sex       性别
     * @param page      分页参数
     * @return          学生分页查询结果
     */
    @Override
    public PageResult<Student> searchStudent(String name, Integer minAge, Integer maxAge, Sex sex, Page page) {
        Where where = Where.where()
                .ifAnd(Student::getName, C.LIKE, name)
                .ifAnd(Student::getAge, C.GTE, minAge)
                .ifAnd(Student::getAge, C.LTE, maxAge)
                .ifAnd(Student::getSex, C.EQ, sex);
        return studentMapper.selectPage(where, page);
    }
}
```

在上面的示例中, `selectPage` 方法会根据传入的 `Page` 对象中的分页参数, 自动计算偏移量和返回的记录数, 并返回一个包含分页信息的 `PageResult` 对象。 这样, 开发者无需手动计算分页参数, 大大简化了分页查询的实现过程。

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

## 分页参数说明
`Page` 对象通常包含以下参数:
- `page`: 当前页码, 从 1 开始计数。
- `pageSize`: 每页显示的记录数, 默认为10。

`PageResult` 对象通常包含以下参数:
- `total`: 总记录数。
- `totalPages`: 总页数。
- `data`: 当前页的数据列表。
- `page`: 当前页码。
- `pageSize`: 每页显示的记录数。

::: tip 补充说明
您可以将分页对象直接从前端传入, 也可以在内存中动态构建 `Page` 对象, 以满足不同的分页需求。

同时, Smart Mybatis 也支持与其他分页插件集成, 所有基于 Mybatis 的分页插件均可与 Smart Mybatis 一起使用。
而没必要必须使用`selectPage`方法。 这取决于您的项目需求和技术栈选择以及团队的编码规范。
:::
