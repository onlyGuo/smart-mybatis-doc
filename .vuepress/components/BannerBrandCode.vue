<template>
  <section class="banner-brand__wrapper" :style="{ ...bgImageStyle }">
    <div class="banner-brand__content">
      <h1 v-if="banner.title" class="title">{{ banner.title }}</h1>

      <div v-if="banner.description" class="description" v-html="banner.description"></div>

      <p v-if="banner.tagline" class="tagline">{{ banner.tagline }}</p>

      <div v-if="buttons.length > 0" class="btn-group">
        <Xicons
          v-for="(btn, index) in buttons"
          :key="index"
          :class="btn.type"
          :icon="btn.icon"
          :text="btn.text"
          :link="btn.link"
          icon-size="18"
          text-size="14"
        />
      </div>

      <div v-if="parsedCode.code" class="banner-code-block">
        <pre :class="`language-${parsedCode.language}`"><code :class="`language-${parsedCode.language}`" v-html="highlightedCodeHtml"></code></pre>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePageFrontmatter, withBase } from 'vuepress/client'
import Prism from 'prismjs'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-sql'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-yaml'

type BannerButton = {
  text?: string
  link?: string
  type?: string
  icon?: string
}

type BannerBrandConfig = {
  title?: string
  description?: string
  tagline?: string
  code?: string
  buttons?: BannerButton[]
  bgImage?: string
  bgImageStyle?: Record<string, string>
}

type HomeFrontmatter = {
  bannerBrand?: BannerBrandConfig
}

const frontmatter = usePageFrontmatter<HomeFrontmatter>()

const banner = computed(() => frontmatter.value?.bannerBrand || {})

const buttons = computed(() => banner.value.buttons || [])

const bgImageStyle = computed(() => {
  const { bgImageStyle: style, bgImage } = banner.value

  const initBgImageStyle = bgImage
    ? {
        overflow: 'hidden',
        background: `url(${withBase(bgImage)}) center/cover no-repeat`
      }
    : {}

  return style ? { ...initBgImageStyle, ...style } : initBgImageStyle
})

const parsedCode = computed(() => {
  const raw = (banner.value.code || '').trim()
  if (!raw) {
    return { language: 'java', code: '' }
  }

  const lines = raw.split('\n')
  const first = lines[0] || ''
  const last = lines[lines.length - 1] || ''

  if (first.startsWith('```') && last === '```') {
    const language = first.replace('```', '').trim() || 'java'
    return {
      language,
      code: lines.slice(1, -1).join('\n')
    }
  }

  return { language: 'java', code: raw }
})

const highlightedCodeHtml = computed(() => {
  const { language, code } = parsedCode.value
  if (!code) return ''

  const grammar = Prism.languages[language] || Prism.languages.java
  return Prism.highlight(code, grammar, language)
})
</script>

<style scoped>
.banner-code-block {
  margin-top: 20px;
  text-align: left;
}

.banner-code-block pre {
  margin: 0;
  padding: 16px;
  border-radius: 10px;
  overflow-x: auto;
  background: rgba(15, 23, 42, 0.82);
  backdrop-filter: blur(8px);
}

.banner-code-block code {
  display: block;
  font-size: 13px;
  line-height: 1.6;
  color: #e2e8f0;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
}

/* scoped 样式下使用 :deep 透传 Prism token 样式 */
.banner-code-block :deep(.token.comment),
.banner-code-block :deep(.token.prolog),
.banner-code-block :deep(.token.doctype),
.banner-code-block :deep(.token.cdata) {
  color: #94a3b8;
}

.banner-code-block :deep(.token.class-name),
.banner-code-block :deep(.token.keyword) {
  color: #c084fc;
}


.banner-code-block :deep(.token.string) {
  color: #86efac;
}

.banner-code-block :deep(.token.function) {
  color: #60a5fa;
}

.banner-code-block :deep(.token.number),
.banner-code-block :deep(.token.boolean) {
  color: #fda4af;
}
</style>

