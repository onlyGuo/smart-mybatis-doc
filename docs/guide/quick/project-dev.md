---
title: 使用指南 - 项目开发
date: 2025/12/02
---
::: tip 说明
在本章节中, 我们将介绍如何在项目中进行开发, 包括如何定义实体类, 创建`Mapper`接口, 以及使用Smart Mybatis提供的各种功能来简化数据库操作。
:::

## 定义实体类
在使用Smart Mybatis之前, 首先需要定义与数据库表对应的实体类。实体类通常使用Java的POJO（Plain Old Java Object）来表示, 并通过注解来映射数据库表和字段。

```java

@TableName("users")
public class User extends PO {
    
    @ID
    private Integer id;
    
    private String username;

    private String email;

    private Date createdAt;

    // Getters and Setters
}
```
## 创建Mapper接口
接下来, 需要创建`Mapper`接口来定义数据库操作。`Mapper`接口继承自Smart Mybatis提供的`SmartMapper`，并可以使用注解或XML来定义SQL语句。

```java
@Mapper
public interface UserMapper extends SmartMapper<User> {
}
```

## 使用Mapper
可以在任意`Spring`管理的Bean中注入`Mapper`接口, 并使用其提供的方法进行数据库操作。我们可以利用Smart Mybatis的内置方法来简化CRUD操作。

通常在`Service`层中使用`Mapper`。这样可以充分利用`Spring`的依赖注入和事务管理功能。

```java
@Service
public class UserService {

    @Autowired
    private UserMapper userMapper;

    public List<User> getAllUsers() {
        return userMapper.selectAll();
    }

    public User getUserById(Integer id) {
        return userMapper.selectById(id);
    }

    public void createUser(User user) {
        userMapper.insert(user);
    }

    public void updateUser(User user) {
        userMapper.updateById(user);
    }

    public void deleteUser(Integer id) {
        userMapper.deleteById(id);
    }
}
```

## 高级查询示例
Smart Mybatis支持使用`DSL（Domain-Specific Language）`来构建复杂的查询条件。以下是一个使用DSL进行条件查询的示例：

```java
public List<User> searchUsers(String username, String email) {
    return userMapper.select(
        Where.where()
            .ifAnd(User::getUsername).like(username)
            .ifAnd(User::getEmail).eq(email)
    );
}
```

## 总结
通过以上步骤, 你已经了解了如何在项目中使用Smart Mybatis进行开发。接下来, 你可以根据具体的业务需求, 利用Smart Mybatis提供的各种功能来实现更复杂的数据库操作。更多高级功能和配置选项, 请参考后续章节的详细介绍。
