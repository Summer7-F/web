<script setup>
import { computed, onBeforeUnmount, onMounted, watch } from 'vue'

const props = defineProps({
  food: { type: Object, default: null }
})
const emit = defineEmits(['close'])

const flavorEntries = computed(function () {
  if (!props.food) return []
  return Object.keys(props.food.flavors).map(function (key) {
    return { label: key, value: props.food.flavors[key] }
  })
})

function close() {
  emit('close')
}

function onKey(event) {
  if (event.key === 'Escape' && props.food) close()
}

watch(function () { return props.food }, function (food) {
  document.body.classList.toggle('modal-open', Boolean(food))
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
    <Transition name="food-modal">
      <div
        v-if="food"
        class="food-modal"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="'food-title-' + food.id"
        @click.self="close"
      >
        <div class="food-modal__panel">
          <button class="food-modal__close" type="button" aria-label="关闭美食详情" @click="close">
            <span>关闭</span><i aria-hidden="true">×</i>
          </button>

          <div class="food-modal__media">
            <img :src="food.image" :alt="food.name" :style="{ objectPosition: food.imagePosition }" />
            <div class="food-modal__shade"></div>
            <p class="food-modal__index">{{ food.category }}</p>
            <p class="food-modal__word" aria-hidden="true">{{ food.name.slice(0, 1) }}</p>
          </div>

          <div class="food-modal__body">
            <p class="eyebrow">TASTE NOTES · 川味档案</p>
            <h2 :id="'food-title-' + food.id">{{ food.name }}</h2>
            <p class="food-modal__en">{{ food.en }}</p>
            <p class="food-modal__tagline">{{ food.tagline }}</p>

            <div class="food-modal__flavors">
              <div v-for="item in flavorEntries" :key="item.label" class="flavor-line">
                <span>{{ item.label }}</span>
                <i><b :style="{ width: item.value * 20 + '%' }"></b></i>
                <em>{{ item.value }}/5</em>
              </div>
            </div>

            <div class="food-modal__story">
              <p>{{ food.story }}</p>
            </div>

            <div class="food-modal__meta">
              <div>
                <span>人均</span>
                <p>{{ food.price }}</p>
              </div>
              <div>
                <span>去哪里吃</span>
                <p>{{ food.where }}</p>
              </div>
            </div>

            <div class="food-modal__tip">
              <span>吃法提示</span>
              <p>{{ food.tip }}</p>
            </div>

            <div class="food-modal__tags">
              <span v-for="tag in food.tags" :key="tag">{{ tag }}</span>
            </div>

            <button type="button" class="text-link food-modal__back" @click="close">继续逛吃 <span>↗</span></button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.food-modal {
  position: fixed;
  inset: 0;
  z-index: 14000;
  display: grid;
  place-items: center;
  padding: 28px;
  background: rgba(40, 12, 14, 0.76);
  backdrop-filter: blur(10px);
  overflow-y: auto;
}

.food-modal__panel {
  position: relative;
  display: grid;
  grid-template-columns: minmax(300px, 0.94fr) minmax(380px, 1.06fr);
  width: min(1120px, 100%);
  max-height: calc(100vh - 56px);
  overflow: hidden;
  background: var(--paper);
  box-shadow: 0 40px 120px rgba(0, 0, 0, 0.32);
}

.food-modal__close {
  position: absolute;
  top: 18px;
  right: 18px;
  z-index: 4;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  background: rgba(245, 240, 230, 0.94);
  color: var(--ink);
  font-size: 9px;
  letter-spacing: 0.12em;
}

.food-modal__close i {
  font-style: normal;
  font-size: 20px;
  line-height: 0.8;
}

.food-modal__media {
  position: relative;
  min-height: 620px;
  overflow: hidden;
  background: var(--red-deep);
}

.food-modal__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.food-modal__shade {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(40, 10, 12, 0.08), rgba(40, 10, 12, 0.72));
}

.food-modal__index {
  position: absolute;
  left: 26px;
  top: 26px;
  color: var(--gold-2);
  font-size: 10px;
  letter-spacing: 0.2em;
}

.food-modal__word {
  position: absolute;
  left: 24px;
  bottom: -4vw;
  font-family: var(--font-brush);
  font-size: 18vw;
  line-height: 1;
  color: rgba(245, 240, 230, 0.12);
  pointer-events: none;
}

.food-modal__body {
  overflow-y: auto;
  padding: clamp(34px, 4.5vw, 58px);
}

.food-modal__body .eyebrow {
  color: var(--red);
}

.food-modal__body h2 {
  margin-top: 16px;
  font-size: clamp(2.4rem, 4vw, 4.4rem);
  line-height: 1.16;
}

.food-modal__en {
  margin-top: 6px;
  color: var(--muted);
  font-family: var(--font-display);
  font-size: 11px;
  letter-spacing: 0.18em;
}

.food-modal__tagline {
  margin-top: 18px;
  color: var(--red);
  font-family: var(--font-serif);
  font-size: 1rem;
  line-height: 1.8;
}

.food-modal__flavors {
  margin-top: 24px;
  padding: 18px 0;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}

.flavor-line {
  display: grid;
  grid-template-columns: 24px 1fr 34px;
  align-items: center;
  gap: 10px;
  padding: 5px 0;
}

.flavor-line > span {
  color: var(--ink);
  font-family: var(--font-serif);
  font-size: 12px;
}

.flavor-line i {
  height: 4px;
  overflow: hidden;
  background: var(--paper-3);
}

.flavor-line i b {
  display: block;
  height: 100%;
  background: linear-gradient(90deg, var(--red), var(--gold));
}

.flavor-line em {
  color: var(--muted);
  font-family: var(--font-display);
  font-size: 9px;
  font-style: normal;
  text-align: right;
}

.food-modal__story {
  margin-top: 22px;
  color: var(--muted);
  font-size: 13px;
  line-height: 2;
}

.food-modal__meta {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
  margin-top: 24px;
  padding: 18px 0;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}

.food-modal__meta span {
  display: block;
  margin-bottom: 4px;
  color: var(--red);
  font-size: 9px;
  letter-spacing: 0.14em;
}

.food-modal__meta p {
  color: var(--muted);
  font-size: 12px;
  line-height: 1.7;
}

.food-modal__tip {
  margin-top: 22px;
  padding: 16px 18px;
  border-left: 2px solid var(--gold);
  background: var(--paper-2);
}

.food-modal__tip span {
  color: var(--red);
  font-size: 9px;
  letter-spacing: 0.14em;
}

.food-modal__tip p {
  margin-top: 4px;
  color: var(--muted);
  font-size: 12px;
  line-height: 1.8;
}

.food-modal__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: 20px;
}

.food-modal__tags span {
  padding: 4px 9px;
  border: 1px solid var(--line);
  color: var(--muted);
  font-size: 9px;
  letter-spacing: 0.08em;
}

.food-modal__back {
  margin-top: 26px;
  color: var(--red);
}

.food-modal-enter-active,
.food-modal-leave-active {
  transition: opacity 0.4s var(--ease);
}

.food-modal-enter-active .food-modal__panel,
.food-modal-leave-active .food-modal__panel {
  transition: transform 0.5s var(--ease);
}

.food-modal-enter-from,
.food-modal-leave-to {
  opacity: 0;
}

.food-modal-enter-from .food-modal__panel,
.food-modal-leave-to .food-modal__panel {
  transform: translateY(22px) scale(0.99);
}

@media (max-width: 900px) {
  .food-modal {
    padding: 0;
    place-items: end center;
  }

  .food-modal__panel {
    grid-template-columns: 1fr;
    width: 100%;
    max-height: 94vh;
    overflow-y: auto;
  }

  .food-modal__media {
    min-height: 320px;
    max-height: 40vh;
  }

  .food-modal__body {
    overflow: visible;
  }
}

@media (max-width: 600px) {
  .food-modal__body {
    padding: 28px 20px 36px;
  }

  .food-modal__meta {
    grid-template-columns: 1fr;
  }

  .food-modal__close {
    top: 12px;
    right: 12px;
  }
}
</style>
