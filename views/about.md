---
home: true
modules:
  - MdContent
---
## 关于 Smart Mybatis
Smart Mybatis 是一个轻量级的 MyBatis 增强库, 旨在简化 MyBatis 的使用, 提供更高效和便捷的 CRUD 操作。通过 Lambda DSL 实现了实体类、Mapper 和 SQL 之间的统一映射, 保持 MyBatis 原生功能的零侵入性, 并兼容所有 MyBatis 插件。
Smart Mybatis 通过以下几个核心特性提升开发体验:
::: tip 特性
- **Lambda DSL**: 提供类型安全的 Lambda 表达式, 避免硬编码列名, 提高代码可读性和可维护性。
- **自动同步数据库**: 根据实体类定义自动创建或更新数据库表结构, 减少手动维护数据库的工作量。
- **命名规范**: 通过配置表前缀和命名规则, 自动推导表名和列名, 减少注解使用。
- **轻量增强**: 不替换或代理 MyBatis 核心组件, 保持与 MyBatis 原生功能的兼容性。
- **Spring Boot Starter**: 提供自动配置和配置绑定, 方便在 Spring Boot 项目中集成使用。
- **示例工程**: 提供完整的示例项目, 演示从实体类到 REST 应用的闭环开发流程。
- **可扩展性**: 允许自定义 SmartMapperInitializer, 满足不同项目的需求。
:::
- Smart Mybatis 旨在让开发者专注于业务逻辑, 提高开发效率, 同时保留对底层细节的控制权。无论是新项目还是现有项目, Smart Mybatis 都能帮助您更高效地使用 MyBatis。
- 欢迎访问我们的[GitHub 仓库](https://github.com/onlyGuo/smart-mybatis)

## 联系我们
如果您有任何问题、建议或反馈, 欢迎通过以下方式联系我们:
- GitHub Issues: [smart-mybatis Issues](https://github.com/onlyGuo/smart-mybatis/issues)
- 电子邮件: 719348277@qq.com
