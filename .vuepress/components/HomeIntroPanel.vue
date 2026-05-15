<template>
  <section class="home-intro-panel">
    <h2>为什么选择 Smart Mybatis</h2>
    <p class="intro">
      保留 MyBatis 原生能力，使用 Lambda DSL 提升开发效率，让实体、Mapper 与 SQL 映射更直观。
    </p>

    <div class="feature-grid">
      <article class="feature-card">
        <h3>零侵入增强</h3>
        <p>不代理 MyBatis 核心类，兼容常见 MyBatis 插件与既有工程结构。</p>
      </article>
      <article class="feature-card">
        <h3>Lambda DSL 查询</h3>
        <p>通过类型安全的方式拼装条件，减少字符串字段带来的维护风险。</p>
      </article>
      <article class="feature-card">
        <h3>联表与分页能力</h3>
        <p>支持联表查询、分页、排序、分片等常见查询场景，逐步扩展复杂业务。</p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.home-intro-panel {
  margin: 24px 0 32px;
  padding: 24px;
  border-radius: 12px;
  background: linear-gradient(135deg, #f8fbff 0%, #f4f8ff 100%);
  border: 1px solid #e5edf8;
}

.home-intro-panel h2 {
  margin: 0 0 12px;
}

.intro {
  margin: 0 0 20px;
  color: #4b5563;
  line-height: 1.75;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.feature-card {
  padding: 14px;
  border-radius: 10px;
  background: #ffffff;
  border: 1px solid #e5edf8;
}

.feature-card h3 {
  margin: 0 0 8px;
  font-size: 16px;
}

.feature-card p {
  margin: 0;
  color: #4b5563;
  line-height: 1.7;
}

@media (max-width: 960px) {
  .feature-grid {
    grid-template-columns: 1fr;
  }
}
</style>

