<script setup>
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { searchSite } from '../data/search'

const props = defineProps({
  open: { type: Boolean, default: false }
})
const emit = defineEmits(['close'])
const router = useRouter()
const query = ref('')
const input = ref(null)

const suggestions = ['火锅', '金沙', '一日', '夜景', '熊猫', '宽窄巷子']
const results = computed(function () {
  return searchSite(query.value).slice(0, 14)
})

function close() {
  emit('close')
}

function choose(item) {
  close()
  router.push(item.path)
}

function goFirst() {
  if (results.value.length) choose(results.value[0])
}

function onKeydown(event) {
  if (event.key === 'Escape' && props.open) close()
}

watch(function () { return props.open }, function (open) {
  document.body.classList.toggle('no-scroll', open)
  if (open) {
    query.value = ''
    nextTick(function () {
      if (input.value) input.value.focus()
    })
  }
})

watch(query, function () {
  // Keep the field responsive while typing.
})

onBeforeUnmount(function () {
  document.body.classList.remove('no-scroll')
  window.removeEventListener('keydown', onKeydown)
})

window.addEventListener('keydown', onKeydown)
</script>

<template>
  <Teleport to="body">
    <Transition name="search">
      <div
        v-if="open"
        class="search-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="全站搜索"
        @click.self="close"
      >
        <div class="search-bg-word" aria-hidden="true">SEARCH</div>
        <div class="search-panel">
          <div class="search-head">
            <p class="eyebrow">SEARCH · 全站搜索</p>
            <button type="button" class="search-close" @click="close">
              关闭 <span>ESC</span>
            </button>
          </div>

          <div class="search-field">
            <span class="search-glyph" aria-hidden="true">寻</span>
            <label class="sr-only" for="site-search">搜索蜀运</label>
            <input
              id="site-search"
              ref="input"
              v-model="query"
              type="search"
              placeholder="搜一座城、一道菜、一段路……"
              autocomplete="off"
              @keydown.enter="goFirst"
            />
            <span class="search-meter">{{ query ? results.length : '—' }}</span>
          </div>

          <div v-if="!query" class="search-default">
            <p class="search-label">不妨从这里开始</p>
            <div class="search-chips">
              <button
                v-for="item in suggestions"
                :key="item"
                type="button"
                @click="query = item"
              >{{ item }}</button>
            </div>
            <div class="search-note">
              <span class="stamp-round">蜀<br />韵</span>
              <p>在七个章节里，找一处你喜欢的成都。<br />也可以直接输入“火锅”“金沙”“三日”。</p>
            </div>
          </div>

          <div v-else class="search-results">
            <p class="search-label">
              {{ results.length ? '找到 ' + results.length + ' 条线索' : '没有找到这条线索' }}
            </p>
            <div v-if="results.length" class="result-list">
              <button
                v-for="item in results"
                :key="item.path + item.title"
                type="button"
                class="result-item"
                @click="choose(item)"
              >
                <span class="result-type">{{ item.type }}</span>
                <span class="result-main">
                  <strong>{{ item.title }}</strong>
                  <em>{{ item.en }}</em>
                </span>
                <span class="result-desc">{{ item.summary }}</span>
                <span class="result-arrow">↗</span>
              </button>
            </div>
            <div v-else class="search-empty">
              <p>换个关键词试试，比如“安顺廊桥”“钟水饺”或“两日”。</p>
              <button type="button" class="text-link" @click="query = ''">清空搜索</button>
            </div>
          </div>

          <div class="search-foot">
            <span>蜀运 SHU YUN · CITY INDEX</span>
            <span>ENTER 打开首条 · ESC 关闭</span>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.search-overlay {
  position: fixed;
  inset: 0;
  z-index: 15000;
  overflow-y: auto;
  background:
    radial-gradient(circle at 78% 15%, rgba(201, 163, 92, 0.11), transparent 34%),
    var(--green-deep);
  color: var(--paper);
}

.search-bg-word {
  position: absolute;
  right: -3vw;
  bottom: -10vw;
  font-family: var(--font-display);
  font-size: clamp(12rem, 38vw, 42rem);
  line-height: 0.72;
  letter-spacing: -0.06em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(245, 240, 230, 0.045);
  pointer-events: none;
  user-select: none;
}

.search-panel {
  position: relative;
  z-index: 1;
  width: min(1180px, calc(100vw - 96px));
  min-height: 100%;
  margin-inline: auto;
  padding: 34px 0 26px;
  display: flex;
  flex-direction: column;
}

.search-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding-bottom: 22px;
  border-bottom: 1px solid var(--line-light);
}

.search-head .eyebrow {
  margin: 0;
  color: var(--gold-2);
}

.search-close {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: rgba(245, 240, 230, 0.62);
  font-size: 10px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.search-close span {
  padding: 4px 7px;
  border: 1px solid rgba(245, 240, 230, 0.22);
  font-family: var(--font-display);
  font-size: 9px;
}

.search-close:hover {
  color: var(--gold-2);
}

.search-field {
  display: flex;
  align-items: center;
  gap: clamp(16px, 2vw, 30px);
  margin-top: clamp(28px, 5vh, 58px);
  padding-bottom: 18px;
  border-bottom: 1px solid rgba(245, 240, 230, 0.35);
}

.search-glyph {
  flex: 0 0 auto;
  font-family: var(--font-brush);
  font-size: clamp(2rem, 4vw, 3.8rem);
  line-height: 1;
  color: var(--gold);
}

.search-field input {
  flex: 1;
  min-width: 0;
  border: 0;
  outline: 0;
  background: transparent;
  color: var(--paper);
  font-family: var(--font-serif);
  font-size: clamp(1.5rem, 3.6vw, 3.6rem);
  font-weight: 400;
  line-height: 1.3;
  letter-spacing: -0.03em;
}

.search-field input::placeholder {
  color: rgba(245, 240, 230, 0.28);
}

.search-field input::-webkit-search-cancel-button {
  filter: invert(1);
  opacity: 0.4;
}

.search-meter {
  flex: 0 0 auto;
  font-family: var(--font-display);
  font-size: 18px;
  color: var(--gold-2);
  letter-spacing: 0.08em;
}

.search-default,
.search-results {
  padding-top: clamp(30px, 4vh, 48px);
}

.search-label {
  color: rgba(245, 240, 230, 0.4);
  font-size: 10px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}

.search-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 18px;
}

.search-chips button {
  padding: 10px 18px;
  border: 1px solid rgba(245, 240, 230, 0.2);
  border-radius: 999px;
  color: rgba(245, 240, 230, 0.72);
  font-size: 12px;
  letter-spacing: 0.08em;
  transition: background 0.3s var(--ease), color 0.3s var(--ease), border-color 0.3s var(--ease);
}

.search-chips button:hover {
  background: var(--gold);
  border-color: var(--gold);
  color: var(--ink);
}

.search-note {
  display: flex;
  align-items: center;
  gap: 22px;
  margin-top: clamp(34px, 7vh, 78px);
  color: rgba(245, 240, 230, 0.38);
  font-size: 12px;
  line-height: 2;
}

.search-note .stamp-round {
  flex: 0 0 auto;
  border-color: rgba(229, 205, 148, 0.35);
  color: var(--gold-2);
}

.result-list {
  margin-top: 16px;
  border-top: 1px solid rgba(245, 240, 230, 0.14);
}

.result-item {
  display: grid;
  grid-template-columns: 62px minmax(180px, 0.9fr) minmax(220px, 1.4fr) 22px;
  align-items: center;
  gap: 18px;
  width: 100%;
  padding: 16px 0;
  border-bottom: 1px solid rgba(245, 240, 230, 0.12);
  text-align: left;
  transition: padding 0.35s var(--ease), color 0.35s var(--ease);
}

.result-item:hover {
  padding-left: 8px;
  color: var(--gold-2);
}

.result-type {
  color: var(--gold);
  font-size: 9px;
  letter-spacing: 0.18em;
}

.result-main {
  display: flex;
  align-items: baseline;
  gap: 12px;
  min-width: 0;
}

.result-main strong {
  font-family: var(--font-serif);
  font-size: clamp(1rem, 1.6vw, 1.3rem);
  font-weight: 500;
  white-space: nowrap;
}

.result-main em {
  overflow: hidden;
  color: rgba(245, 240, 230, 0.34);
  font-family: var(--font-display);
  font-size: 10px;
  font-style: normal;
  letter-spacing: 0.12em;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.result-desc {
  overflow: hidden;
  color: rgba(245, 240, 230, 0.44);
  font-size: 11px;
  line-height: 1.7;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.result-arrow {
  color: var(--gold);
  font-size: 13px;
}

.search-empty {
  padding: 42px 0;
}

.search-empty p {
  margin-bottom: 18px;
  color: rgba(245, 240, 230, 0.5);
  font-size: 13px;
}

.search-empty .text-link {
  color: var(--gold-2);
}

.search-foot {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-top: auto;
  padding-top: 32px;
  color: rgba(245, 240, 230, 0.28);
  font-size: 9px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.search-enter-active,
.search-leave-active {
  transition: opacity 0.4s var(--ease);
}

.search-enter-from,
.search-leave-to {
  opacity: 0;
}

@media (max-width: 860px) {
  .search-panel {
    width: calc(100vw - 40px);
    padding-top: 22px;
  }

  .search-bg-word {
    bottom: 8vw;
    font-size: 38vw;
  }

  .search-field {
    gap: 12px;
  }

  .search-glyph {
    display: none;
  }

  .result-item {
    grid-template-columns: 46px 1fr 20px;
    gap: 12px;
  }

  .result-desc {
    display: none;
  }

  .result-main {
    flex-direction: column;
    gap: 2px;
  }

  .result-main em {
    font-size: 9px;
  }

  .search-foot {
    flex-direction: column;
    gap: 4px;
  }
}

@media (max-width: 520px) {
  .search-head {
    align-items: flex-start;
  }

  .search-close {
    font-size: 9px;
  }

  .search-field input {
    font-size: 1.3rem;
  }

  .search-note {
    align-items: flex-start;
    margin-top: 34px;
  }
}
</style>
