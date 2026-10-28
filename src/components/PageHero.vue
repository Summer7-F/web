<script setup>
import { computed } from 'vue'

const props = defineProps({
  index: { type: String, default: '01' },
  title: { type: String, required: true },
  en: { type: String, required: true },
  intro: { type: String, default: '' },
  image: { type: String, required: true },
  imagePosition: { type: String, default: 'center' },
  theme: { type: String, default: 'ink' },
  meta: { type: Array, default: function () { return [] } },
  note: { type: String, default: 'CHENGDU · SICHUAN · CHINA' },
  short: { type: Boolean, default: false }
})

const chars = computed(function () {
  return Array.from(props.title)
})

const shadeClass = computed(function () {
  return props.theme === 'green' ? 'page-hero__shade--green' : props.theme === 'red' ? 'page-hero__shade--red' : ''
})
</script>

<template>
  <section class="page-hero" :class="{ 'page-hero--short': short }" data-parallax>
    <div class="page-hero__media">
      <img
        :src="image"
        :alt="title"
        :style="{ objectPosition: imagePosition }"
        v-parallax="14"
        fetchpriority="high"
      />
    </div>
    <div class="page-hero__shade" :class="shadeClass" aria-hidden="true"></div>
    <span class="page-hero__side-note">一城烟火 · 千年蜀韵 · SHU YUN</span>

    <div class="page-hero__content">
      <div class="page-hero__crumb">
        <span>蜀运 SHU YUN</span>
        <i>/</i>
        <span>{{ en }}</span>
      </div>

      <div class="page-hero__grid">
        <div>
          <p class="page-hero__index">{{ index }} — {{ note }}</p>
          <h1 class="page-hero__title" :aria-label="title">
            <span
              v-for="(char, i) in chars"
              :key="i"
              class="char"
              aria-hidden="true"
            >{{ char }}</span>
          </h1>
          <p class="page-hero__en">{{ en }}</p>
        </div>

        <div class="page-hero__side">
          <p v-if="intro">{{ intro }}</p>
          <div v-if="meta.length" class="page-hero__meta">
            <span v-for="item in meta" :key="item" class="pill">{{ item }}</span>
          </div>
          <slot />
        </div>
      </div>
    </div>

    <div class="page-hero__bottom">
      <span class="page-hero__scroll">SCROLL TO DISCOVER</span>
      <span>{{ index }} / 06 · CHENGDU, CHINA</span>
    </div>
  </section>
</template>
