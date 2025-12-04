---
title: 即刻体验
date: 2025/11/21
---

::: tip 说明
我们提供了一系列的示例项目，帮助你快速上手并体验框架的强大功能。在本文中, 我们将以Spring Boot的演示项目为例，展示如何使用`Smart Mybatis`。

`Smart Mybatis` 并不是重复重复造轮子.
它只是充分的利用了现有框架的成熟特性, 以一种更聪明的方式来使用它们, 让开发者能够重新聚焦足够优秀的`Mybatis`本身。

也正因如此, 它拥有**极简**的源码结构和强劲的性能, 您可以在[GitHub](https://github.com/onlyGuo/smart-mybatis)这里查看, 
并在**五分钟内**读完它的全部源码, 并理解它的全部实现原理。
:::



## 克隆示例项目
首先，从我们的GitHub仓库克隆Spring Boot示例项目：

```bash
git clone https://github.com/thisguo/spring-boot-starter-smart-mybatis-example.git
cd spring-boot-starter-smart-mybatis-example
```

## 配置数据库
在`application.yaml`文件中，配置你的数据库连接信息, 只需确保数据库名称存在以及用户密码有权限即可, 项目启动后会自动初始化表结构：
```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/your_database
    username: your_username
    password: your_password
```

## 运行项目
- 方案1: 用你喜欢的IDE（如IntelliJ IDEA或Eclipse）中运行主类`com.guoshengkai.smart.mybatis.example.SpringBootStarterSmartMybatisExampleApplication`。
- 方案2: 使用Maven或Gradle命令行工具运行项目：
```bash
# 使用Maven
mvn spring-boot:run
# 使用Gradle
gradle bootRun
```
## 访问应用
启动后，应用将运行在`http://localhost:8080`。你可以通过浏览器访问该地址，查看应用的功能演示和代码示例。

![example.png](/example.png)

