<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  spots: { type: Array, required: true },
  visibleIds: { type: Array, default: function () { return [] } },
  activeId: { type: String, default: '' }
})
const emit = defineEmits(['select'])

const hoveredId = ref('')
const mapW = 840
const mapH = 620
const pad = 74
const spreadX = 1.28
const spreadY = 1.22

const labelConfig = {
  kuanzhai: { dx: 14, dy: 4, anchor: 'start' },
  jinli: { dx: 14, dy: 4, anchor: 'start' },
  wuhou: { dx: -14, dy: 5, anchor: 'end' },
  chunxi: { dx: 0, dy: 27, anchor: 'middle' },
  eastmemory: { dx: 0, dy: -22, anchor: 'middle' },
  peoplespark: { dx: 14, dy: 5, anchor: 'start' },
  wenshu: { dx: 0, dy: -24, anchor: 'middle' },
  anshun: { dx: 14, dy: 5, anchor: 'start' },
  jianshe: { dx: 0, dy: 28, anchor: 'middle' },
  opera: { dx: -12, dy: -16, anchor: 'end' }
}

function normalizedX(spot) {
  return 50 + (spot.map.x - 50) * spreadX
}

function normalizedY(spot) {
  return 50 + (spot.map.y - 50) * spreadY
}

function px(spot) {
  return pad + (normalizedX(spot) / 100) * (mapW - pad * 2)
}

function py(spot) {
  return pad + (normalizedY(spot) / 100) * (mapH - pad * 2)
}

function labelFor(spot) {
  return labelConfig[spot.id] || { dx: 14, dy: 4, anchor: 'start' }
}

function isVisible(spot) {
  return props.visibleIds.length === 0 || props.visibleIds.includes(spot.id)
}

const current = computed(function () {
  const id = hoveredId.value || props.activeId
  return props.spots.find(function (spot) { return spot.id === id }) || null
})

function hover(spot) {
  hoveredId.value = spot.id
}

function leave() {
  hoveredId.value = ''
}

function select(spot) {
  if (!isVisible(spot)) return
  emit('select', spot)
}

function onKey(event, spot) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    select(spot)
  }
}
</script>

<template>
  <div class="city-map">
    <div class="city-map__top">
      <span class="eyebrow">CHENGDU · CITY MAP</span>
      <span>示意图 · 非精确比例</span>
    </div>

    <div class="city-map__canvas">
      <svg :viewBox="'0 0 ' + mapW + ' ' + mapH" role="group" aria-label="成都城市景点示意图">
        <defs>
          <linearGradient id="map-bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#1c3732" />
            <stop offset="100%" stop-color="#122723" />
          </linearGradient>
          <pattern id="map-grid" width="42" height="42" patternUnits="userSpaceOnUse">
            <path d="M 42 0 L 0 0 0 42" fill="none" stroke="rgba(245,240,230,.055)" stroke-width="1" />
          </pattern>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#c9a35c" stop-opacity=".25" />
            <stop offset="100%" stop-color="#c9a35c" stop-opacity="0" />
          </radialGradient>
        </defs>

        <rect width="840" height="620" fill="url(#map-bg)" />
        <rect width="840" height="620" fill="url(#map-grid)" />

        <path d="M-20 178 C 130 210, 205 120, 330 170 S 490 270, 600 218 S 740 140, 880 190" fill="none" stroke="rgba(139,176,160,.3)" stroke-width="18" />
        <path d="M-20 178 C 130 210, 205 120, 330 170 S 490 270, 600 218 S 740 140, 880 190" fill="none" stroke="rgba(207,230,218,.18)" stroke-width="1.2" stroke-dasharray="5 9" />
        <path d="M330 640 C 360 520, 300 420, 420 360 S 570 280, 560 0" fill="none" stroke="rgba(139,176,160,.2)" stroke-width="13" />

        <path d="M108 338 C 190 270, 300 252, 402 286 S 610 386, 730 314" fill="none" stroke="rgba(201,163,92,.23)" stroke-width="1.2" stroke-dasharray="8 8" />
        <ellipse cx="420" cy="320" rx="276" ry="186" fill="none" stroke="rgba(201,163,92,.14)" stroke-width="1" />
        <ellipse cx="420" cy="320" rx="198" ry="128" fill="none" stroke="rgba(201,163,92,.1)" stroke-width="1" />
        <path d="M150 520 C 260 440, 310 410, 420 400 S 585 380, 700 454" fill="none" stroke="rgba(201,163,92,.12)" stroke-width="1" />

        <g class="map-districts" fill="rgba(245,240,230,.18)" font-family="Noto Serif SC, serif" font-size="11" letter-spacing="3">
          <text x="120" y="116">西北 · 金沙</text>
          <text x="618" y="94">东北 · 熊猫</text>
          <text x="690" y="492">东南 · 龙泉</text>
          <text x="132" y="528">西南 · 绿道</text>
        </g>

        <g class="map-compass" transform="translate(760, 72)">
          <circle r="28" fill="none" stroke="rgba(229,205,148,.27)" stroke-width="1" />
          <path d="M0 -18 L5 0 L0 18 L-5 0 Z" fill="rgba(229,205,148,.55)" />
          <text x="0" y="-36" text-anchor="middle" fill="rgba(245,240,230,.45)" font-family="Cormorant Garamond, serif" font-size="10">N</text>
        </g>

        <g
          v-for="spot in spots"
          :key="spot.id"
          class="map-pin"
          :class="{
            'is-dim': !isVisible(spot),
            'is-active': activeId === spot.id,
            'is-hover': hoveredId === spot.id
          }"
          :transform="'translate(' + px(spot) + ',' + py(spot) + ')'"
          role="button"
          :tabindex="isVisible(spot) ? 0 : -1"
          :aria-label="spot.name"
          @mouseenter="hover(spot)"
          @mouseleave="leave"
          @focus="hover(spot)"
          @blur="leave"
          @click="select(spot)"
          @keydown="onKey($event, spot)"
        >
          <circle r="34" fill="rgba(0,0,0,0.001)" class="pin-hit" />
          <circle v-if="activeId === spot.id || hoveredId === spot.id" r="34" fill="url(#glow)" class="pin-glow" />
          <circle r="15" fill="rgba(18,39,35,.92)" stroke="rgba(229,205,148,.4)" stroke-width="1" />
          <circle r="10" fill="rgba(201,163,92,.12)" stroke="rgba(229,205,148,.75)" stroke-width="1" class="pin-ring" />
          <circle r="3.2" fill="#e5cd94" class="pin-dot" />
          <text
            :x="labelFor(spot).dx"
            :y="labelFor(spot).dy"
            :text-anchor="labelFor(spot).anchor"
            class="pin-label"
            fill="rgba(245,240,230,.78)"
          >{{ spot.name }}</text>
        </g>
      </svg>

      <div class="city-map__readout">
        <template v-if="current">
          <div>
            <p class="city-map__readout-tag">{{ current.category }} · {{ current.en }}</p>
            <h4>{{ current.name }}</h4>
            <p>{{ current.summary }}</p>
          </div>
          <button type="button" @click="select(current)">查看详情 <span>↗</span></button>
        </template>
        <template v-else>
          <p class="city-map__hint">移动鼠标或轻触地图上的金色节点，查看景点。</p>
        </template>
      </div>
    </div>

    <div class="city-map__legend">
      <span><i class="dot"></i> 当前筛选景点</span>
      <span><i class="line"></i> 锦江 / 城市环线</span>
      <a href="https://uri.amap.com/" target="_blank" rel="noopener">打开高德地图 <span>↗</span></a>
    </div>
  </div>
</template>

<style scoped>
.city-map {
  border: 1px solid rgba(245, 240, 230, 0.16);
  background: rgba(11, 26, 23, 0.48);
}

.city-map__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 17px 20px;
  border-bottom: 1px solid rgba(245, 240, 230, 0.12);
}

.city-map__top .eyebrow {
  margin: 0;
  color: var(--gold-2);
  font-size: 9px;
}

.city-map__top > span:last-child {
  color: rgba(245, 240, 230, 0.32);
  font-size: 9px;
  letter-spacing: 0.08em;
}

.city-map__canvas {
  position: relative;
  overflow: hidden;
}

.city-map__canvas svg {
  display: block;
  width: 100%;
  height: auto;
  min-height: 420px;
}

.map-pin {
  cursor: pointer;
  outline: none;
  transition: opacity 0.35s var(--ease), filter 0.35s var(--ease);
}

.pin-hit {
  pointer-events: all;
}

.map-pin.is-dim {
  opacity: 0.18;
  pointer-events: none;
}

.map-pin.is-hover .pin-label,
.map-pin.is-active .pin-label {
  fill: #f1e2bd;
}

.map-pin.is-hover .pin-ring,
.map-pin.is-active .pin-ring {
  stroke: #f1e2bd;
}

.pin-glow {
  transform-origin: center;
  animation: map-pulse 2.2s ease-in-out infinite;
}

.pin-label {
  font-family: var(--font-sans);
  font-size: 11px;
  letter-spacing: 0.08em;
  transition: fill 0.3s var(--ease);
}

.pin-ring {
  transition: stroke 0.3s var(--ease), transform 0.3s var(--ease);
  transform-origin: center;
}

.map-pin:hover .pin-ring,
.map-pin:focus .pin-ring {
  transform: scale(1.25);
}

@keyframes map-pulse {
  0%,
  100% {
    opacity: 0.35;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1.08);
  }
}

.city-map__readout {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  min-height: 106px;
  padding: 17px 20px;
  border-top: 1px solid rgba(245, 240, 230, 0.12);
  background: rgba(9, 20, 18, 0.42);
}

.city-map__readout-tag {
  color: var(--gold-2);
  font-size: 9px;
  letter-spacing: 0.13em;
}

.city-map__readout h4 {
  margin-top: 5px;
  font-size: 1.2rem;
  font-weight: 400;
}

.city-map__readout p:last-child {
  max-width: 540px;
  margin-top: 5px;
  color: rgba(245, 240, 230, 0.48);
  font-size: 11px;
  line-height: 1.7;
}

.city-map__readout button {
  flex: 0 0 auto;
  display: inline-flex;
  gap: 8px;
  padding-bottom: 3px;
  border-bottom: 1px solid rgba(229, 205, 148, 0.5);
  color: var(--gold-2);
  font-size: 9px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.city-map__hint {
  color: rgba(245, 240, 230, 0.42);
  font-size: 11px;
}

.city-map__legend {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  padding: 13px 20px;
  border-top: 1px solid rgba(245, 240, 230, 0.1);
  color: rgba(245, 240, 230, 0.4);
  font-size: 9px;
  letter-spacing: 0.08em;
}

.city-map__legend span {
  display: inline-flex;
  align-items: center;
  gap: 7px;
}

.city-map__legend .dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--gold);
}

.city-map__legend .line {
  width: 18px;
  height: 1px;
  background: rgba(207, 230, 218, 0.45);
}

.city-map__legend a {
  margin-left: auto;
  color: var(--gold-2);
}

@media (max-width: 720px) {
  .city-map__top {
    align-items: flex-start;
    flex-direction: column;
    gap: 4px;
  }

  .city-map__canvas svg {
    min-height: 340px;
  }

  .map-districts {
    display: none;
  }

  .pin-label {
    display: none;
    font-size: 20px;
  }

  .map-pin.is-active .pin-label,
  .map-pin.is-hover .pin-label {
    display: block;
  }

  .city-map__readout {
    align-items: flex-start;
    flex-direction: column;
    gap: 12px;
  }

  .city-map__legend a {
    margin-left: 0;
  }
}
</style>
