---
title: 开发规范
date: 2025/12/17
---
## 代码规范
虽然 Smart Mybatis 致力于简化数据库操作, 可以在任意Spring容器类中注入 Mapper 并使用其内置方法进行增删改查操作, 但为了保持代码的一致性和可维护性, 我们建议遵循以下开发规范.

::: tip 说明
在文档中的所有演示代码中均未遵循以下规范, 别学作者, 作者太懒.
:::

### 不建议在 Service 层构建复杂的查询条件
Service 层的职责是处理业务逻辑, 不建议在 Service 层构建复杂的查询条件。相反, 应该将查询条件的构建逻辑封装在 Mapper 层的默认实现方法中. 或专门的查询类中, 以保持 Service 层的简洁和清晰。

#### 反例
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
        // ... 省略其他业务逻辑代码
        Where where = Where.where()
                .ifAnd(Student::getName, C.LIKE, name)
                .ifAnd(Student::getAge, C.GTE, minAge)
                .ifAnd(Student::getAge, C.LTE, maxAge)
                .ifAnd(Student::getSex, C.EQ, sex);
        return studentMapper.selectPage(where, page);
    }
}

@Mapper
public interface StudentMapper extends SmartMapper<Student> {

}
```
#### 推荐做法
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
        // ... 省略其他业务逻辑代码
        return studentMapper.findStudents(name, minAge, maxAge, sex, page);
    }
}

@Mapper
public interface StudentMapper extends SmartMapper<Student> {

    /**
     * 分页查询学生信息
     * @param name      姓名
     * @param minAge    最大年龄
     * @param maxAge    最小年龄
     * @param sex       性别
     * @param page      分页参数
     * @return          学生分页查询结果
     */
    default PageResult<Student> findStudents(String name, Integer minAge, Integer maxAge, Sex sex, Page page) {
        return this.selectPage(Where.where()
                .ifAnd(Student::getName, C.LIKE, name)
                .ifAnd(Student::getAge, C.GTE, minAge)
                .ifAnd(Student::getAge, C.LTE, maxAge)
                .ifAnd(Student::getSex, C.EQ, sex), 
        page);
    }
}
```

通过将查询条件的构建逻辑封装在 Mapper 层, 可以提高代码的可读性和可维护性, 并使 Service 层专注于业务逻辑的处理。

### 不建议直接使用PO类直接作为入参或出参
虽然 Smart Mybatis 支持直接使用 PO 类作为 Mapper 方法的入参或出参, 但为了保持代码的清晰和可维护性, 我们建议使用专门的 DTO 或 VO 类来传递数据。
#### 反例
所有业务都通过唯一的 Student PO 类进行
```java

/**
 * Student 实体类, 对应数据库中的 student 表
 * @author gsk
 */
public class Student extends PO {

    @ID
    private int id;

    private String name;

    private int age;

    private Sex sex;

    @TableField(json = true, description = "爱好列表")
    private List<String> hobbies;

    // 省略 getter 和 setter 方法
}
```
#### 推荐做法
```java
/**
 * Student 实体类, 对应数据库中的 student 表
 * @author gsk
 */
public class Student extends PO {

    @ID
    private int id;

    private String name;

    private int age;

    private Sex sex;

    @TableField(json = true, description = "爱好列表")
    private List<String> hobbies;

    // 省略 getter 和 setter 方法
}
/**
 * StudentDTO 数据传输对象, 用于在服务层和控制器层之间传递学生数据
 * @author gsk
 */
public class StudentDTO extends Student {
    // 可以根据需要添加额外的字段或方法
}
```
