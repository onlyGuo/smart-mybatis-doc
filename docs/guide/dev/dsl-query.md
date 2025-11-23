---
title: 使用DSL构建查询
date: 2025/11/21
---
::: tip 说明
在使用数据库操作时，通常需要构建复杂的查询条件。使用`DSL（领域特定语言）`可以让我们以更直观和类型安全的方式来构建这些查询条件。
下面是如何使用`DSL`来构建查询的示例。
:::
假设我们使用`DSL`来优化一下[这个示例](./query-builder.html)

## 多条件查询
```java
@Service
public class StudentServiceImpl implements StudentService {

    @Resource
    private StudentMapper studentMapper;

    @Override
    public List<Student> searchStudent(String name, Integer minAge, Integer maxAge, Sex sex) {
        return studentMapper.select(Where
                .where(Student::getName, C.LIKE, name)
                .and(Student::getAge, C.GTE, minAge)
                .and(Student::getAge, C.LTE, maxAge)
                .and(Student::getSex, C.EQ, sex)
        );
    }
}
```

## 动态条件查询
假设我们有一些查询条件是可选的，可以根据传入的参数动态添加条件：

```java
@Service
public class StudentServiceImpl implements StudentService {

    @Resource
    private StudentMapper studentMapper;

    @Override
    public List<Student> searchStudent(String name, Integer minAge, Integer maxAge, Sex sex) {
        Where where = Where.where();
        if(StringUtil.isNotBlank(name)){
            where.and(Student::getName, C.LIKE, name);
        }
        if(minAge != null){
            where.and(Student::getAge, C.GTE, minAge);
        }
        if(maxAge != null){
            where.and(Student::getAge, C.LTE, maxAge);
        }
        if(sex != null){
            where.and(Student::getSex, C.EQ, sex);
        }
        return studentMapper.select(where);
    }
}
```
## 简化动态条件查询
正如上面的代码所示，我们可以根据传入的参数动态地添加查询条件，从而实现灵活的查询功能。 但随之而来的代码冗长和可读性下降的问题. 
因此, 我们对连接符进行了封装, 可以避免这种冗余代码.
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
                .ifAnd(Student::getSex, C.EQ, sex);
        return studentMapper.select(where);
    }
}
```
通过这种方式，我们可以大大简化动态条件查询的代码，提高代码的可读性和维护性。 但仍然有一些问题, 那就是它不利于现代编辑器的自动填充.

> 注意: 当使用`ifAnd`或`ifOr`来添加条件时, 如果传入的值为`null`或空字符串, 该条件将不会被添加到查询中. 如果您需要生成`IS NULL`或`IS NOT NULL`条件, 请使用标准的`and`或`or`方法.

## 利用单参方法提升类型安全和自动补全
在现代IDE中, 我们可以利用单参方法来实现更好的类型安全和自动补全支持. 通过这种方式, 我们可以直接引用实体类的属性方法, 避免了参数拼接带来的错误风险.

```java
@Service
public class StudentServiceImpl implements StudentService {

    @Resource
    private StudentMapper studentMapper;

    @Override
    public List<Student> searchStudent(String name, Integer minAge, Integer maxAge, Sex sex) {
        return studentMapper.select(Where.where()
                .ifAnd(Student::getName).like(name)
                .ifAnd(Student::getAge).gte(minAge)
                .ifAnd(Student::getAge).lte(maxAge)
                .ifAnd(Student::getSex).eq(sex)
        );
    }
}
```
## 更利于阅读的方法名
虽然上面的方式已经很好地解决了类型安全和自动补全的问题, 并且极大地简化了动态条件查询的代码, 但仍然存在一个问题, 那就是方法名不够直观. 

为了解决这个问题, 我们对操作符方法进行了冗余声明, 使其更符合自然语言的表达习惯.

```java
@Service
public class StudentServiceImpl implements StudentService {

    @Resource
    private StudentMapper studentMapper;

    @Override
    public List<Student> searchStudent(String name, Integer minAge, Integer maxAge, Sex sex) {
        return studentMapper.select(Where.where()
                .ifAnd(Student::getName).like(name)
                .ifAnd(Student::getAge).greaterThanOrEquals(minAge)
                .ifAnd(Student::getAge).lessThanOrEquals(maxAge)
                .ifAnd(Student::getSex).equalsFor(sex)
        );
    }
}
```

至于使用哪种方法, 完全取决于个人喜好和团队的编码规范。无论选择哪种方式, 关键是要确保代码的可读性和可维护性。

总之, 最后这两种方式是我们推荐的使用方式, 它们不仅提高了代码的可读性, 还充分利用了现代IDE的功能, 使得开发过程更加高效和愉快。
