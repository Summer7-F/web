<script setup>
import { computed, onBeforeUnmount, onMounted, watch } from 'vue'

const props = defineProps({
  items: { type: Array, default: function () { return [] } },
  index: { type: Number, default: 0 },
  open: { type: Boolean, default: false }
})
const emit = defineEmits(['close', 'update:index'])

const current = computed(function () {
  return props.items[props.index] || null
})

function close() {
  emit('close')
}

function go(delta) {
  if (!props.items.length) return
  const next = (props.index + delta + props.items.length) % props.items.length
  emit('update:index', next)
}

function onKey(event) {
  if (!props.open) return
  if (event.key === 'Escape') close()
  if (event.key === 'ArrowLeft') go(-1)
  if (event.key === 'ArrowRight') go(1)
}

watch(function () { return props.open }, function (open) {
  document.body.classList.toggle('modal-open', open)
})

onMounted(function () {
  window.addEventListener('keydown', onKey)
})

onBeforeUnmount(function () {
  window.removeEventListener('keydown', onKey)
  document.body.classList.remove('modal-open')
})
</script>

<template>
  <Teleport to="body">
    <Transition name="lightbox">
      <div v-if="open && current" class="lightbox" role="dialog" aria-modal="true" aria-label="影像全屏浏览">
        <div class="lightbox__top">
          <span>SHU YUN · CITY IMAGES</span>
          <span>{{ String(index + 1).padStart(2, '0') }} / {{ String(items.length).padStart(2, '0') }}</span>
          <button type="button" class="lightbox__close" @click="close">关闭 <i>×</i></button>
        </div>

        <button type="button" class="lightbox__nav lightbox__nav--prev" aria-label="上一张" @click="go(-1)">
          <span>←</span>
        </button>

        <div class="lightbox__stage" @click.self="close">
          <Transition name="slide" mode="out-in">
            <img :key="current.id" :src="current.image" :alt="current.title" />
          </Transition>
        </div>

        <button type="button" class="lightbox__nav lightbox__nav--next" aria-label="下一张" @click="go(1)">
          <span>→</span>
        </button>

        <aside class="lightbox__info">
          <p class="lightbox__category">{{ current.category }} · {{ current.location }}</p>
          <h2>{{ current.title }}</h2>
          <p class="lightbox__en">{{ current.en }}</p>
          <p class="lightbox__story">{{ current.story }}</p>
          <div class="lightbox__counter">
            <span>FRAME {{ String(index + 1).padStart(2, '0') }}</span>
            <span>CHENGDU · 30.67°N</span>
          </div>
        </aside>

        <div class="lightbox__thumbs">
          <button
            v-for="(item, thumbIndex) in items"
            :key="item.id"
            type="button"
            class="lightbox__thumb"
            :class="{ active: thumbIndex === index }"
            :aria-label="'查看' + item.title"
            @click="emit('update:index', thumbIndex)"
          >
            <img :src="item.image" :alt="item.title" />
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 14500;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 330px;
  grid-template-rows: auto 1fr auto;
  gap: 0;
  background: #0d1414;
  color: var(--paper);
}

.lightbox__top {
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  gap: 34px;
  padding: 18px 30px;
  border-bottom: 1px solid rgba(245, 240, 230, 0.12);
  color: rgba(245, 240, 230, 0.4);
  font-family: var(--font-display);
  font-size: 9px;
  letter-spacing: 0.18em;
}

.lightbox__top > span:nth-child(2) {
  margin-left: auto;
  color: var(--gold-2);
}

.lightbox__close {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  color: rgba(245, 240, 230, 0.6);
  font-size: 9px;
  letter-spacing: 0.14em;
}

.lightbox__close i {
  font-style: normal;
  font-size: 20px;
  line-height: 0.7;
}

.lightbox__close:hover {
  color: var(--gold-2);
}

.lightbox__stage {
  position: relative;
  display: grid;
  place-items: center;
  min-height: 0;
  padding: 26px 12px;
  overflow: hidden;
}

.lightbox__stage img {
  max-width: 100%;
  max-height: calc(100vh - 190px);
  object-fit: contain;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.25);
}

.lightbox__nav {
  align-self: center;
  justify-self: center;
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border: 1px solid rgba(245, 240, 230, 0.24);
  border-radius: 50%;
  color: rgba(245, 240, 230, 0.65);
  transition: background 0.3s var(--ease), color 0.3s var(--ease);
}

.lightbox__nav:hover {
  background: var(--gold);
  border-color: var(--gold);
  color: var(--ink);
}

.lightbox__nav--prev {
  grid-column: 1;
  grid-row: 2;
  margin-left: 22px;
  justify-self: start;
}

.lightbox__nav--next {
  grid-column: 1;
  grid-row: 2;
  margin-right: 22px;
  justify-self: end;
}

.lightbox__info {
  grid-column: 2;
  grid-row: 2;
  align-self: stretch;
  padding: 38px 30px;
  border-left: 1px solid rgba(245, 240, 230, 0.12);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.lightbox__category {
  color: var(--gold-2);
  font-size: 9px;
  letter-spacing: 0.16em;
}

.lightbox__info h2 {
  margin-top: 12px;
  font-size: clamp(2rem, 3vw, 3.2rem);
  line-height: 1.2;
  font-weight: 400;
}

.lightbox__en {
  margin-top: 7px;
  color: rgba(245, 240, 230, 0.3);
  font-family: var(--font-display);
  font-size: 9px;
  letter-spacing: 0.16em;
}

.lightbox__story {
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid rgba(245, 240, 230, 0.14);
  color: rgba(245, 240, 230, 0.56);
  font-size: 12px;
  line-height: 2;
}

.lightbox__counter {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-top: 46px;
  color: rgba(245, 240, 230, 0.24);
  font-family: var(--font-display);
  font-size: 8px;
  letter-spacing: 0.16em;
}

.lightbox__thumbs {
  grid-column: 1 / -1;
  display: flex;
  gap: 8px;
  padding: 13px 30px;
  border-top: 1px solid rgba(245, 240, 230, 0.12);
  overflow-x: auto;
  scrollbar-width: none;
}

.lightbox__thumbs::-webkit-scrollbar {
  display: none;
}

.lightbox__thumb {
  flex: 0 0 58px;
  height: 44px;
  overflow: hidden;
  opacity: 0.34;
  transition: opacity 0.3s var(--ease), outline 0.3s var(--ease);
}

.lightbox__thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.lightbox__thumb:hover,
.lightbox__thumb.active {
  opacity: 1;
  outline: 1px solid var(--gold);
}

.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.4s var(--ease);
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.3s var(--ease), transform 0.3s var(--ease);
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(12px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-12px);
}

@media (max-width: 900px) {
  .lightbox {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto auto;
  }

  .lightbox__top {
    padding: 14px 18px;
    gap: 16px;
  }

  .lightbox__top > span:first-child {
    display: none;
  }

  .lightbox__stage {
    grid-column: 1;
    grid-row: 2;
    padding: 12px;
  }

  .lightbox__stage img {
    max-height: calc(100vh - 260px);
  }

  .lightbox__nav {
    position: absolute;
    z-index: 2;
    top: 50%;
  }

  .lightbox__nav--prev {
    left: 14px;
    margin-left: 0;
  }

  .lightbox__nav--next {
    right: 14px;
    margin-right: 0;
  }

  .lightbox__info {
    grid-column: 1;
    grid-row: 3;
    padding: 18px 20px;
    border-left: 0;
    border-top: 1px solid rgba(245, 240, 230, 0.12);
  }

  .lightbox__info h2 {
    margin-top: 7px;
    font-size: 1.5rem;
  }

  .lightbox__story {
    margin-top: 10px;
    padding-top: 10px;
    font-size: 11px;
  }

  .lightbox__counter {
    display: none;
  }

  .lightbox__thumbs {
    grid-row: 4;
    padding: 10px 20px;
  }
}

@media (max-width: 520px) {
  .lightbox__stage img {
    max-height: 44vh;
  }

  .lightbox__nav {
    width: 38px;
    height: 38px;
  }

  .lightbox__info {
    padding: 14px 18px 18px;
  }

  .lightbox__en,
  .lightbox__story {
    display: none;
  }
}
</style>
