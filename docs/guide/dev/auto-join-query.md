---
title: 自动联表查询
date: 2026/03/24
---

::: tip 说明
本文介绍一种**更不侵入业务代码**的联表方式：把关联关系声明在实体字段上，然后通过 `selectWithRelations` 自动补齐关联字段。

它适合：
- 列表/详情页要展示“外键关联出来的描述字段”（如班级名、部门名、创建人昵称）
- 想让主干业务代码只写“业务字段”。不在业务里写 `JOIN` / 别名 / ON 条件
:::

## 你将学到什么
- 如何在实体上声明“外键关联字段”（非数据库字段）
- 如何一行代码查询并自动填充关联字段
- 如何对“关联出来的字段”做条件过滤
- 与手写 `leftJoin(...)` 的对比与适用场景

## 场景示例：Student 自动关联班级名称
假设：
- `student` 表里只有 `classify_id`（班级ID）
- 班级表 `classify` 里有 `id` 与 `name`
- 业务希望 `Student` 对象上直接拿到 `classifyName`

### 1) 实体定义
下面的 `classifyName` 是**实体字段**，不是数据库字段：

```java
@SmartMeta
public class Student extends PO {

    @ID
    private int id;

    private int classifyId;

    /**
     * 外键关联字段, 非数据库表字段。
     * 
     * 含义：
     * - 用本表的 classifyId 与 Classify 表的 id 关联
     * - 把 Classify.name 填充到本字段 classifyName
     * 
     * 说明：三个 String 参数都是“实体类字段”的名字，不是数据库字段名。
     * SmartMybatis 的底层约束就是：不在业务中写数据库的东西。
     */
    @TableField(
        exist = false,
        link = Classify.class,
        linkField = "name",
        self = "classifyId",
        target = "id"
    )
    private String classifyName;

    private String name;

    private int age;

    private Sex sex;

    @TableField(json = true, description = "爱好列表")
    private List<String> hobbies;
}
```

`Classify` 示例（仅用于理解关联字段）：

```java
@SmartMeta
public class Classify extends PO {

    @ID
    private int id;

    private String name;
}
```

### 2) 查询：自动补齐关联字段
查询并把 `classifyName` 自动填充出来：

```java
// 查询所有学生，并自动关联填充 Student.classifyName
List<Student> students = studentMapper.selectWithRelations(Where.where());
```

你可以把它理解为：框架根据 `@TableField(... link/self/target ...)` 自动生成联表/关联查询，并把结果回填到 `classifyName`。

### 3) 用“关联字段”做条件过滤
关联字段也可以直接参加条件：

```java
// 关联出来做条件过滤：查班级名以“三年级”开头的学生
List<Student> students = studentMapper.selectWithRelations(
        Where.where(Student::getClassifyName).like("三年级%班")
);
```

## 为什么说它更“非侵入”
和之前的联表查询（`leftJoin(...)`）相比，自动联表查询把“关联关系”固定在实体字段声明里：
- 业务代码不用再写 `leftJoin(User.class, "u", ...)`
- 业务代码不用再关心联表别名、ON 条件表达、字段回填参数
- 条件表达更接近“我想按什么字段查”，而不是“我该怎么拼 SQL”

最终效果就是：主干业务代码更短、更聚焦、更好读。

## 什么时候仍然用手写联表（leftJoin）
自动联表适合“一对一/多对一 + 回填展示字段”的场景。
下面这些场景通常更适合手写 `leftJoin(...)`：
- 复杂多表联查（多层级、多字段回填、多种 JOIN 类型）
- 需要精确控制 `JOIN ON` 过滤语义（见《联表查询中的条件过滤》）
- 强依赖 SQL 结构的报表查询、聚合、分组

你可以把两者理解为：
- **自动联表**：固定关系、自动回填、业务更干净
- **手写联表**：能力上限更高、控制更精确

## 相关文档
- [联表查询（总览）](join-query.md)
- [联表查询基础](join-query-basic.md)
- [联表查询中的条件过滤](join-query-filter.md)
- [多表联表查询](join-query-multi.md)

