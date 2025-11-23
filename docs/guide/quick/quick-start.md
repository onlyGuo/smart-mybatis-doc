---
title: 即刻体验
date: 2025/11/21
---

::: tip 说明
我们提供了一系列的示例项目，帮助你快速上手并体验框架的强大功能。在本文中, 我们将以Spring Boot的演示项目为例，展示如何使用Smart Mybatis。
:::

## 克隆示例项目
首先，从我们的GitHub仓库克隆Spring Boot示例项目：

```bash
git clone https://github.com/onlyGuo/spring-boot-starter-smart-mybatis-example.git
cd spring-boot-starter-smart-mybatis-example
```

## 配置数据库
在`application.properties`或`application.yml`文件中，配置你的数据库连接信息：
- yaml
```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/your_database
    username: your_username
    password: your_password
```
- properties
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/your_database
spring.datasource.username=your_username
spring.datasource.password=your_password
```

## 运行项目
- 方案1: 用你喜欢的IDE（如IntelliJ IDEA或Eclipse）中运行主类`com.example.SmartMybatisExampleApplication`。
- 方案2: 使用Maven或Gradle命令行工具运行项目：
```bash
# 使用Maven
mvn spring-boot:run
# 使用Gradle
gradle bootRun
```
## 访问应用
启动后，应用将运行在`http://localhost:8080`。你可以通过浏览器访问该地址，查看应用的功能演示和代码示例。
