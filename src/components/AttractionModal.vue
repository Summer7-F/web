<script setup>
import { onBeforeUnmount, onMounted, watch } from 'vue'
import { amapUrl } from '../data/site'

const props = defineProps({
  spot: { type: Object, default: null }
})
const emit = defineEmits(['close'])

function close() {
  emit('close')
}

function onKey(event) {
  if (event.key === 'Escape' && props.spot) close()
}

watch(function () { return props.spot }, function (spot) {
  document.body.classList.toggle('modal-open', Boolean(spot))
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
    <Transition name="modal">
      <div
        v-if="spot"
        class="modal"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="'spot-title-' + spot.id"
        @click.self="close"
      >
        <div class="modal__panel">
          <button class="modal__close" type="button" aria-label="关闭景点详情" @click="close">
            <span>关闭</span>
            <i aria-hidden="true">×</i>
          </button>

          <div class="modal__media">
            <img :src="spot.image" :alt="spot.name" :style="{ objectPosition: spot.imagePosition }" />
            <div class="modal__media-shade"></div>
            <div class="modal__media-caption">
              <span>{{ spot.category }} · {{ spot.en }}</span>
              <p>{{ spot.name }}</p>
            </div>
          </div>

          <div class="modal__body">
            <div class="modal__top">
              <p class="eyebrow">CITY NOTES · {{ spot.category }}</p>
              <h2 :id="'spot-title-' + spot.id">{{ spot.name }}</h2>
              <p class="modal__en">{{ spot.en }}</p>
              <p class="modal__summary">{{ spot.summary }}</p>
            </div>

            <div class="modal__meta">
              <div>
                <span>最佳时间</span>
                <p>{{ spot.best }}</p>
              </div>
              <div>
                <span>建议停留</span>
                <p>{{ spot.duration }}</p>
              </div>
              <div>
                <span>到达方式</span>
                <p>{{ spot.transport }}</p>
              </div>
            </div>

            <div class="modal__section">
              <p class="modal__label">为什么去</p>
              <p class="modal__story">{{ spot.story }}</p>
            </div>

            <div class="modal__tip">
              <span>蜀运提示</span>
              <p>{{ spot.tip }}</p>
            </div>

            <div class="modal__tags">
              <span v-for="tag in spot.tags" :key="tag">{{ tag }}</span>
            </div>

            <div class="modal__actions">
              <a :href="amapUrl(spot)" target="_blank" rel="noopener" class="btn btn--red">
                在高德地图中打开 <span class="btn__arrow"></span>
              </a>
              <button type="button" class="text-link" @click="close">返回城市漫游</button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal {
  position: fixed;
  inset: 0;
  z-index: 14000;
  display: grid;
  place-items: center;
  padding: 28px;
  background: rgba(15, 21, 20, 0.78);
  backdrop-filter: blur(10px);
  overflow-y: auto;
}

.modal__panel {
  position: relative;
  display: grid;
  grid-template-columns: minmax(300px, 0.95fr) minmax(380px, 1.05fr);
  width: min(1180px, 100%);
  max-height: calc(100vh - 56px);
  overflow: hidden;
  background: var(--paper);
  box-shadow: 0 40px 120px rgba(0, 0, 0, 0.35);
}

.modal__close {
  position: absolute;
  top: 18px;
  right: 18px;
  z-index: 3;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  background: rgba(245, 240, 230, 0.92);
  color: var(--ink);
  font-size: 9px;
  letter-spacing: 0.12em;
}

.modal__close i {
  font-style: normal;
  font-size: 20px;
  line-height: 0.8;
}

.modal__media {
  position: relative;
  min-height: 620px;
  overflow: hidden;
  background: var(--ink);
}

.modal__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.modal__media-shade {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(10, 14, 14, 0.06), rgba(10, 14, 14, 0.7));
}

.modal__media-caption {
  position: absolute;
  left: 26px;
  right: 26px;
  bottom: 26px;
  color: var(--paper);
}

.modal__media-caption span {
  color: var(--gold-2);
  font-size: 9px;
  letter-spacing: 0.16em;
}

.modal__media-caption p {
  margin-top: 6px;
  font-family: var(--font-brush);
  font-size: clamp(2.8rem, 4vw, 4.4rem);
  line-height: 1.1;
}

.modal__body {
  overflow-y: auto;
  padding: clamp(34px, 4.5vw, 60px);
}

.modal__top .eyebrow {
  color: var(--red);
}

.modal__top h2 {
  margin-top: 17px;
  font-size: clamp(2.2rem, 3.8vw, 4.1rem);
  line-height: 1.18;
}

.modal__en {
  margin-top: 7px;
  color: var(--muted);
  font-family: var(--font-display);
  font-size: 11px;
  letter-spacing: 0.18em;
}

.modal__summary {
  margin-top: 20px;
  color: var(--ink);
  font-family: var(--font-serif);
  font-size: 1rem;
  line-height: 1.9;
}

.modal__meta {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
  margin-top: 26px;
  padding: 20px 0;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}

.modal__meta div:last-child {
  grid-column: span 2;
}

.modal__meta span {
  display: block;
  margin-bottom: 4px;
  color: var(--red);
  font-size: 9px;
  letter-spacing: 0.14em;
}

.modal__meta p {
  color: var(--muted);
  font-size: 12px;
  line-height: 1.7;
}

.modal__section {
  margin-top: 26px;
}

.modal__label {
  margin-bottom: 8px;
  color: var(--red);
  font-size: 9px;
  letter-spacing: 0.16em;
}

.modal__story {
  color: var(--muted);
  font-size: 13px;
  line-height: 2;
}

.modal__tip {
  margin-top: 22px;
  padding: 17px 19px;
  border-left: 2px solid var(--gold);
  background: var(--paper-2);
}

.modal__tip span {
  color: var(--red);
  font-size: 9px;
  letter-spacing: 0.14em;
}

.modal__tip p {
  margin-top: 5px;
  color: var(--muted);
  font-size: 12px;
  line-height: 1.8;
}

.modal__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: 22px;
}

.modal__tags span {
  padding: 4px 9px;
  border: 1px solid var(--line);
  color: var(--muted);
  font-size: 9px;
  letter-spacing: 0.08em;
}

.modal__actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 22px;
  margin-top: 30px;
}

.modal__actions .text-link {
  color: var(--muted);
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.4s var(--ease);
}

.modal-enter-active .modal__panel,
.modal-leave-active .modal__panel {
  transition: transform 0.5s var(--ease);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal__panel,
.modal-leave-to .modal__panel {
  transform: translateY(22px) scale(0.99);
}

@media (max-width: 900px) {
  .modal {
    padding: 0;
    place-items: end center;
  }

  .modal__panel {
    grid-template-columns: 1fr;
    max-height: 94vh;
    width: 100%;
    overflow-y: auto;
  }

  .modal__media {
    min-height: 320px;
    max-height: 40vh;
  }

  .modal__body {
    overflow: visible;
  }
}

@media (max-width: 600px) {
  .modal__body {
    padding: 28px 20px 36px;
  }

  .modal__meta {
    grid-template-columns: 1fr;
  }

  .modal__meta div:last-child {
    grid-column: auto;
  }

  .modal__close {
    top: 12px;
    right: 12px;
  }
}
</style>
