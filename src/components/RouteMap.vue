<script setup>
import { computed } from 'vue'
import { getSpot } from '../data/site'

const props = defineProps({
  route: { type: Object, required: true }
})

const W = 600
const H = 380

const allPoints = computed(function () {
  const total = props.route.stops.length
  const list = []
  let index = 0
  props.route.stops.forEach(function (stop) {
    const spot = getSpot(stop.spotId)
    if (!spot) return
    const t = total <= 1 ? 0.5 : index / (total - 1)
    const wave = Math.sin(t * Math.PI * 2.15 - 0.45)
    list.push({
      key: stop.day + '-' + stop.spotId + '-' + index,
      x: 64 + t * (W - 128),
      y: H / 2 + wave * 70 + (index % 2 === 0 ? -8 : 14),
      spot: spot,
      stop: stop,
      index: index,
      day: stop.day
    })
    index += 1
  })
  return list
})

const groups = computed(function () {
  const byDay = new Map()
  allPoints.value.forEach(function (point) {
    if (!byDay.has(point.day)) byDay.set(point.day, [])
    byDay.get(point.day).push(point)
  })
  return Array.from(byDay.entries()).map(function (entry) {
    return { day: entry[0], points: entry[1] }
  })
})

function smoothPath(points) {
  if (!points.length) return ''
  if (points.length === 1) return 'M ' + points[0].x + ' ' + points[0].y
  let d = 'M ' + points[0].x + ' ' + points[0].y
  for (let i = 0; i < points.length - 1; i += 1) {
    const p0 = points[Math.max(0, i - 1)]
    const p1 = points[i]
    const p2 = points[i + 1]
    const p3 = points[Math.min(points.length - 1, i + 2)]
    const cp1x = p1.x + (p2.x - p0.x) / 6
    const cp1y = p1.y + (p2.y - p0.y) / 6
    const cp2x = p2.x - (p3.x - p1.x) / 6
    const cp2y = p2.y - (p3.y - p1.y) / 6
    d += ' C ' + cp1x + ' ' + cp1y + ', ' + cp2x + ' ' + cp2y + ', ' + p2.x + ' ' + p2.y
  }
  return d
}

function labelAnchor(point) {
  if (point.index === 0) return 'start'
  if (point.index === allPoints.value.length - 1) return 'end'
  return 'middle'
}

function labelY(point) {
  return point.index % 2 === 0 ? -20 : 28
}

function shortName(spot) {
  if (spot.id === 'panda') return '熊猫基地'
  return spot.name
}
</script>

<template>
  <div class="route-map">
    <div class="route-map__head">
      <span class="eyebrow">ROUTE SKETCH</span>
      <span>{{ route.days }} DAY{{ route.days > 1 ? 'S' : '' }} · {{ route.stops.length }} STOPS</span>
    </div>

    <svg :viewBox="'0 0 ' + W + ' ' + H" role="img" :aria-label="route.title + ' 路线示意图'">
      <defs>
        <pattern id="route-grid" width="34" height="34" patternUnits="userSpaceOnUse">
          <path d="M 34 0 L 0 0 0 34" fill="none" stroke="rgba(30,36,40,.055)" stroke-width="1" />
        </pattern>
      </defs>

      <rect width="600" height="380" fill="#efe7d9" />
      <rect width="600" height="380" fill="url(#route-grid)" />

      <path d="M-20 268 C 90 240, 160 282, 242 246 S 400 184, 640 218" fill="none" stroke="rgba(32,60,55,.13)" stroke-width="18" />
      <path d="M-20 268 C 90 240, 160 282, 242 246 S 400 184, 640 218" fill="none" stroke="rgba(32,60,55,.32)" stroke-width="1" stroke-dasharray="4 8" />
      <path d="M292 -20 C 280 80, 330 144, 312 220 S 280 340, 310 400" fill="none" stroke="rgba(32,60,55,.1)" stroke-width="12" />
      <path d="M72 96 C 156 132, 200 112, 256 82 S 390 60, 540 104" fill="none" stroke="rgba(130,31,38,.11)" stroke-width="1" stroke-dasharray="5 7" />
      <ellipse cx="182" cy="104" rx="64" ry="38" fill="rgba(32,60,55,.055)" />
      <ellipse cx="468" cy="296" rx="74" ry="42" fill="rgba(32,60,55,.05)" />

      <g v-for="(group, gIndex) in groups" :key="group.day">
        <path
          :d="smoothPath(group.points)"
          fill="none"
          :stroke="gIndex === 0 ? '#821f26' : '#c9a35c'"
          stroke-width="2"
          stroke-linecap="round"
          stroke-dasharray="1 7"
          opacity=".9"
        />

        <g
          v-for="point in group.points"
          :key="point.key"
          :transform="'translate(' + point.x + ',' + point.y + ')'"
        >
          <circle r="15" :fill="gIndex === 0 ? '#821f26' : '#c9a35c'" />
          <circle r="19" fill="none" :stroke="gIndex === 0 ? 'rgba(130,31,38,.3)' : 'rgba(201,163,92,.42)'" stroke-width="1" />
          <text
            y="4"
            text-anchor="middle"
            fill="#f5f0e6"
            font-family="Cormorant Garamond, serif"
            font-size="10"
          >{{ point.index + 1 }}</text>
          <text
            y="0"
            :dy="labelY(point)"
            :text-anchor="labelAnchor(point)"
            fill="#1e2428"
            font-family="Noto Serif SC, serif"
            font-size="11"
            class="route-label"
          >{{ shortName(point.spot) }}</text>
        </g>
      </g>

      <g transform="translate(550, 48)">
        <circle r="20" fill="none" stroke="rgba(30,36,40,.22)" stroke-width="1" />
        <path d="M0 -12 L4 0 L0 12 L-4 0 Z" fill="rgba(30,36,40,.42)" />
        <text y="-27" text-anchor="middle" fill="rgba(30,36,40,.4)" font-family="Cormorant Garamond, serif" font-size="9">N</text>
      </g>

      <text x="32" y="344" fill="rgba(30,36,40,.28)" font-family="Cormorant Garamond, serif" font-size="9" letter-spacing="2">CHENGDU · ROUTE PLAN</text>
    </svg>

    <div class="route-map__foot">
      <div class="route-map__legend">
        <span v-for="(group, index) in groups" :key="group.day">
          <i :class="index === 0 ? 'red' : 'gold'"></i> DAY 0{{ group.day }}
        </span>
      </div>
      <span>示意图 · 非精确比例</span>
    </div>
  </div>
</template>

<style scoped>
.route-map {
  border: 1px solid var(--line);
  background: var(--paper-2);
}

.route-map__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 12px 15px;
  border-bottom: 1px solid var(--line);
}

.route-map__head .eyebrow {
  margin: 0;
  color: var(--red);
  font-size: 8px;
}

.route-map__head > span:last-child {
  color: var(--muted);
  font-family: var(--font-display);
  font-size: 8px;
  letter-spacing: 0.1em;
}

.route-map svg {
  display: block;
  width: 100%;
  height: auto;
}

.route-map .route-label {
  paint-order: stroke;
  stroke: #efe7d9;
  stroke-width: 3px;
  stroke-linejoin: round;
}

.route-map__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 10px 15px;
  border-top: 1px solid var(--line);
  color: var(--muted);
  font-size: 8px;
  letter-spacing: 0.08em;
}

.route-map__legend {
  display: flex;
  gap: 14px;
}

.route-map__legend span {
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.route-map__legend i {
  width: 5px;
  height: 5px;
  border-radius: 50%;
}

.route-map__legend i.red {
  background: var(--red);
}

.route-map__legend i.gold {
  background: var(--gold);
}
</style>
