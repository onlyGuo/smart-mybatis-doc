---
title: 条件构造器
date: 2025/11/21
---
Smart Mybatis的条件构造器允许你以编程方式构建复杂的SQL查询条件，而无需手动编写SQL语句。通过条件构造器，你可以动态地添加各种查询条件，
如`等于`、`不等于`、`大于`、`小于`、`模糊匹配`等，从而实现灵活的数据查询。
::: tip 建议
但在实际开发过程中, 我们不建议用这种方式, 这种方式会让代码变得冗长且难以维护. 但作为学习和理解Smart Mybatis的查询机制, 了解条件构造器是有帮助的.

实际开发过程中, 我们建议使用[DSL 查询](./dsl-query.html)来构建查询条件, 这种方式更简洁且易于维护.
:::
您可以通过`Where`对象来构建一个查询器, 同时, 你可以append多个条件表达式来实现更复杂的查询条件.

## 创建Where对象
要创建一个`Where`对象，可以使用以下代码：

```java
Where where = new Where();
```

## 添加条件
你可以使用`appendExpression`方法添多个查询条件

```java
@Service
public class StudentServiceImpl implements StudentService {

    @Resource
    private StudentMapper studentMapper;

    @Override
    public List<Student> searchStudent(String name, Integer minAge, Integer maxAge, Sex sex) {
        Where where = new Where();
        where.appendExpression(new ComparisonExpression<Student>(Student::getName, C.LIKE, name, null));
        where.appendExpression(new ComparisonExpression<Student>(Student::getAge, C.GTE, minAge, Link.AND));
        where.appendExpression(new ComparisonExpression<Student>(Student::getAge, C.LTE, maxAge, Link.AND));
        where.appendExpression(new ComparisonExpression<Student>(Student::getSex, C.EQ, sex, Link.AND));
        return studentMapper.select(where);
    }
}
```
从上面的代码可以看到, 我们通过`appendExpression`方法添加了多个查询条件, 每个条件都是一个`ComparisonExpression`对象, 其中包含了字段、操作符、值和连接符.
## 可用的操作符
Smart Mybatis支持以下操作符:

| 操作符 | 描述           | 注意事项                                     |
|--------|----------------|------------------------------------------|
| EQ     | 等于           | 当值为`null`时, 会生成`IS NULL`条件               |
| NE     | 不等于         | 当值为`null`时, 会生成`IS NOT NULL`条件           |
| GT     | 大于           | 无                                        |
| LT     | 小于           | 无                                        |
| GTE    | 大于等于       | 无                                        |
| LTE    | 小于等于       | 无                                        |
| LIKE   | 模糊匹配       | 无                                        |
| IN     | 包含于         | 取值必须是`Array`或者`Collection`的子类, 例如`List`, `Set` | 
| NOT_IN | 不包含于       | 取值必须是`Array`或者`Collection`的子类, 例如`List`, `Set` |
| equals | 等于 | 当值为`null`时, 会生成`IS NULL`条件 |
| notEquals | 不等于 | 当值为`null`时, 会生成`IS NOT NULL`条件 |
| greaterThan | 大于 | 无 |
| lessThan | 小于 | 无 |
| greaterThanOrEqual | 大于等于 | 无 |
| lessThanOrEqual | 小于等于 | 无 |
| like | 模糊匹配 | 无 |
| in | 包含于 | 取值必须是`Array`或者`Collection`的子类, 例如`List`, `Set` |
| notIn | 不包含于 | 取值必须是`Array`或者`Collection`的子类, 例如`List`, `Set` |

Smart Mybatis 将比较符枚举封装了两种命名风格, 你可以任选其一使用, 甚至可以直接混用, 这取决于你的个人喜好或者你的团队编码规范.

Smart Mybatis 不会强制约束你的代码风格, 你可以根据自己的喜好选择使用哪种命名风格.

## 连接符
在添加多个条件时, 你可以指定连接符来决定条件之间的关系:

| 连接符 | 描述   |
|--------|--------|
| AND    | 与     |
| OR     | 或     |

## 示例
下面是一个完整的示例, 展示了如何使用条件构造器来查询学生信息:

```java
@Service
public class StudentServiceImpl implements StudentService {

    @Resource
    private StudentMapper studentMapper;

    @Override
    public List<Student> searchStudent(String name, Integer minAge, Integer maxAge, Sex sex) {
        Where where = new Where();
        if(StringUtil.isNotBlank(name)){
            where.appendExpression(new ComparisonExpression<Student>(Student::getName, C.LIKE, name, Link.AND));
        }
        if(minAge != null){
            where.appendExpression(new ComparisonExpression<Student>(Student::getAge, C.GTE, minAge, Link.AND));
        }
        if(maxAge != null){
            where.appendExpression(new ComparisonExpression<Student>(Student::getAge, C.LTE, maxAge, Link.AND));
        }
        if(sex != null){
            where.appendExpression(new ComparisonExpression<Student>(Student::getSex, C.EQ, sex, Link.AND));
        }
        return studentMapper.select(where);
    }
}
```
在上面的示例中, 我们根据传入的参数动态地构建了查询条件, 并使用`studentMapper.select(where)`方法执行查询, 最终返回符合条件的学生列表。

::: tip 建议
但是, 正如前面提到的, 这段代码显得非常臃肿, 且用到了大量的枚举和泛型, 所以会变得非常不利于阅读, 我们更推荐使用[DSL 查询](./dsl-query.html)来实现相同的功能, 这样代码会更加简洁和易于维护。
:::
