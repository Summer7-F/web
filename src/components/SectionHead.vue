<script setup>
defineProps({
  num: { type: String, default: '' },
  label: { type: String, default: '' },
  en: { type: String, default: '' },
  title: { type: String, default: '' },
  desc: { type: String, default: '' },
  center: { type: Boolean, default: false }
})
</script>

<template>
  <div class="section-head" :class="{ 'section-head--center': center }">
    <div class="section-head__left">
      <p class="eyebrow" :class="{ 'eyebrow--center': center }">
        <span v-if="num">{{ num }}</span>
        <span v-if="label">{{ label }}</span>
        <span v-if="en">{{ en }}</span>
      </p>
      <h2 v-if="title || $slots.title" class="section-title">
        <slot name="title"><span v-html="title"></span></slot>
      </h2>
    </div>
    <div v-if="desc || $slots.aside" class="section-head__right">
      <p v-if="desc">{{ desc }}</p>
      <slot name="aside" />
    </div>
  </div>
</template>

<style scoped>
.section-head--center {
  display: block;
  text-align: center;
}

.section-head--center .section-head__left {
  max-width: 920px;
  margin-inline: auto;
}

.section-head--center .section-title {
  margin-top: 22px;
}

.section-head--center .section-head__right {
  max-width: 620px;
  margin: 22px auto 0;
}

@media (max-width: 720px) {
  .section-head {
    gap: 18px;
  }
}
</style>
