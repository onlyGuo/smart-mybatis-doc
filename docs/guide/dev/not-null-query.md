---
title: 非空条件查询
date: 2025/11/21
---
在实际开发中, 我们经常需要根据用户传入的参数来动态构建查询条件. 例如, 我们有一个学生表, 需要根据姓名、年龄范围和性别来查询学生信息. 
如果用户没有提供某个参数, 则不应将该条件添加到查询中.

所以, 我们需要可以根据传入的参数动态地添加查询条件，从而实现灵活的查询功能。 但随之而来的代码冗长和可读性下降的问题.
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

::: tip 注意
注意: 当使用`ifAnd`或`ifOr`来添加条件时, 如果传入的值为`null`或空字符串, 该条件将不会被添加到查询中. 如果您需要生成`IS NULL`或`IS NOT NULL`条件, 请使用标准的`and`或`or`方法.
:::
