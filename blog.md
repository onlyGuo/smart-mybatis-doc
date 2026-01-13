# Smart Mybatis：让 MyBatis 重回轻盈

> Smart Mybatis 通过 Lambda DSL 将实体、Mapper 与 SQL 串起来，不做二次封装、不代理 MyBatis，本质是把已有特性用得更聪明。

## 从痛点到框架
- 作者在长期 MyBatis 实战中发现，重复 CRUD 与脚手架生成会让项目迭代和维护成本居高不下，于是先有了实验性的 EasyMybatis（参见 docs/guide/dev/preface.md）。
- 随着 Spring Boot 普及与 Provider 能力增强，回归轻量、聚焦底层控制的需求越发明显，Smart Mybatis 因此诞生：只增强、不重写。
- 框架源码极简，声称五分钟即可通读（docs/guide/quick/quick-start.md），强调学习曲线低。

## 即刻体验
1. 获取示例项目
   ```bash
   git clone https://github.com/thisguo/spring-boot-starter-smart-mybatis-example.git
   cd spring-boot-starter-smart-mybatis-example
   ```
2. 准备数据库与连接信息（docs/guide/quick/quick-start.md）：
   ```yaml
   spring:
     datasource:
       url: jdbc:mysql://localhost:3306/your_database
       username: your_username
       password: your_password
   ```
   项目启动后即可自动初始化表结构。
3. 运行
   ```bash
   mvn spring-boot:run
   # 或
   gradle bootRun
   ```

## 核心能力概览
### 极简实体映射
- 所有实体继承 `PO`，用 `@ID` 标识主键，`@TableName`、`@TableField` 用于自定义表/列（docs/guide/dev/entity.md）。
- 全局命名策略可通过 `spring.mybatis.smart.naming-convention` 切换驼峰转大小写或保持原样（docs/guide/dev/naming.md、docs/guide/quick/project-configuration.md）。
- `table-prefix` 允许一次性为所有表名加统一前缀（docs/guide/dev/table-prefix.md）。

### 自动同步与配置统一入口
- 以 `spring.mybatis.smart.*` 为前缀的配置集中管理增强功能。
- `auto-sync-db`：在开发环境自动根据实体更新表结构（docs/guide/dev/auto-sync-db.md），省掉手写 DDL 的重复劳动。
- `enable`、`naming-convention`、`table-prefix` 等开关让你逐步引入 Smart Mybatis，必要时还能随时降级为原生行为（docs/guide/quick/project-configuration.md）。

### 主键与字段的自由度
- `@ID(generateType = PrimaryGenerateType.AUTO|UUID|SNOWFLAKE|SNOWFLAKE_HEX|INPUT)`（docs/guide/dev/primary-generator.md）覆盖常见分布式 ID 方案。
- `@TableField` 除了自定义名字、长度、类型、注释外，还能声明 `json = true` 把复杂对象序列化到单列中（docs/guide/dev/custom-field-mapping.md、docs/guide/dev/json-field.md）。

### 内置 CRUD 与 DSL 查询
- Mapper 只需继承 `SmartMapper<T>` 即包含 `insert/insertBatch/updateById/deleteById/delete/ select` 等常用方法（docs/guide/dev/comm-adm.md、docs/guide/quick/project-dev.md）。
- 条件构造器 `Where` 提供 TDD 式链式 DSL：`Where.where().ifAnd(User::getUsername).like(keyword)`，既可动态拼条件也可写出 IDE 友好的单参语法（docs/guide/dev/query-builder.md、docs/guide/dev/dsl-query.md、docs/guide/dev/not-null-query.md）。
- DSL API 同时支持短名（`eq`,`gte`）与长名（`equalsFor`,`greaterThanOrEquals`），可按团队代码风格混用。

## 建议的落地路径
1. **引入依赖**：确保项目先包含官方 MyBatis，再按 docs/guide/quick/project-setup.md 添加 `ink.icoding:spring-boot-starter-smart-mybatis`。
2. **配置基线**：在 `application.yml` 中统一好 `naming-convention`、`table-prefix`、`auto-sync-db`（开发环境打开同步，生产关闭）。
3. **建模实体与 Mapper**：实体继承 `PO`，Mapper 继承 `SmartMapper<T>`，优先使用注解描述字段特性而不是手写 XML（docs/guide/quick/project-dev.md、docs/guide/dev/entity.md）。
4. **拥抱 DSL**：查询逻辑用 `Where` DSL 表达条件，同时结合 `ifAnd/ifOr` 处理可选参数，避免 if-else 拼 SQL（docs/guide/dev/dsl-query.md）。
5. **善用增强但保留控制权**：需要 JSON 字段、主键策略、批量 CRUD 时交给 Smart Mybatis；当要写极端 SQL 时仍可回到原生 Mapper，自由度不受限。

## 结语
Smart Mybatis 没有试图替你重写 MyBatis，而是提供了一套把实体、配置、查询语义联通的轻量增强。它适合那些既想拥有快速 CRUD、自动建模、可读 DSL，又想随时拿回底层控制权的团队。现在就把它接入你下一个 Spring Boot/MyBatis 项目，体验五分钟读完源码、十分钟落地的轻盈感吧。
