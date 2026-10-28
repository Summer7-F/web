<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import PageHero from '../components/PageHero.vue'
import SectionHead from '../components/SectionHead.vue'
import RouteMap from '../components/RouteMap.vue'
import { travelRoutes, travelTips, getSpot, amapUrl } from '../data/site'

const route = useRoute()
const selectedDays = ref(1)
const activePref = ref('全部')
const selectedRouteId = ref('')
const checks = ref([false, false, false, false, false])

const daysOptions = [1, 2, 3]
const preferenceOptions = ['全部', '文化', '美食', '拍照', '休闲']

const routesForDays = computed(function () {
  return travelRoutes.filter(function (item) { return item.days === selectedDays.value })
})

const matchingRoutes = computed(function () {
  if (activePref.value === '全部') return routesForDays.value
  return routesForDays.value.filter(function (item) {
    return item.tags.includes(activePref.value)
  })
})

const mainRoute = computed(function () {
  const chosen = selectedRouteId.value
    ? routesForDays.value.find(function (item) { return item.id === selectedRouteId.value })
    : null
  if (chosen && (activePref.value === '全部' || chosen.tags.includes(activePref.value))) return chosen
  return matchingRoutes.value[0] || routesForDays.value[0] || travelRoutes[0]
})

const alternatives = computed(function () {
  return routesForDays.value.filter(function (item) { return item.id !== mainRoute.value.id })
})

const dayGroups = computed(function () {
  const map = new Map()
  mainRoute.value.stops.forEach(function (stop) {
    if (!map.has(stop.day)) map.set(stop.day, [])
    map.get(stop.day).push(stop)
  })
  return Array.from(map.entries()).map(function (entry) {
    const groupSpots = entry[1].map(function (stop) { return getSpot(stop.spotId) }).filter(Boolean)
    const natureCount = groupSpots.filter(function (spot) { return spot.group === 'nature' }).length
    return {
      day: entry[0],
      stops: entry[1],
      title: natureCount === groupSpots.length ? '山水之间' : natureCount > 0 ? '自然与城市' : '城市漫游'
    }
  })
})

const checklist = [
  '提前预约熊猫基地 / 博物馆',
  '下载天府通或开通乘车码',
  '带一把折叠伞与舒适步行鞋',
  '热门餐厅提前排号 / 订位',
  '留一个下午，什么也不安排'
]

function chooseDays(day) {
  selectedDays.value = day
  selectedRouteId.value = ''
  activePref.value = '全部'
}

function choosePref(pref) {
  activePref.value = pref
  selectedRouteId.value = ''
}

function chooseRoute(item) {
  selectedDays.value = item.days
  selectedRouteId.value = item.id
  activePref.value = '全部'
  nextTick(function () {
    const el = document.getElementById('route-plan')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
}

function spotFor(id) {
  return getSpot(id)
}

function mapLinkForRoute() {
  const first = mainRoute.value.stops[0]
  const spot = first ? getSpot(first.spotId) : null
  return spot ? amapUrl(spot) : 'https://uri.amap.com/'
}

function buildItinerary() {
  const lines = [
    mainRoute.value.title,
    mainRoute.value.subtitle,
    '蜀运 SHU YUN · 成都旅行计划',
    ''
  ]
  dayGroups.value.forEach(function (group) {
    lines.push('DAY ' + String(group.day).padStart(2, '0') + ' · ' + group.title)
    group.stops.forEach(function (stop) {
      const spot = getSpot(stop.spotId)
      lines.push(stop.time + '  ' + (spot ? spot.name : '') + '  ' + stop.note + '（' + stop.duration + '）')
      lines.push('      交通：' + stop.transport)
    })
    lines.push('')
  })
  lines.push('提示：热门景点请提前预约，行程可根据体力与天气调整。')
  return lines.join('\n')
}

async function copyRoute() {
  const text = buildItinerary()
  try {
    await navigator.clipboard.writeText(text)
    window.dispatchEvent(new CustomEvent('shuyun-toast', { detail: '行程已复制，带着它去成都吧。' }))
  } catch (error) {
    const area = document.createElement('textarea')
    area.value = text
    area.style.position = 'fixed'
    area.style.opacity = '0'
    document.body.appendChild(area)
    area.select()
    try {
      document.execCommand('copy')
      window.dispatchEvent(new CustomEvent('shuyun-toast', { detail: '行程已复制，带着它去成都吧。' }))
    } catch (err) {
      window.dispatchEvent(new CustomEvent('shuyun-toast', { detail: '复制失败，请手动选择行程文字。' }))
    }
    document.body.removeChild(area)
  }
}

function applyQuery() {
  if (!route.query.route) return
  const found = travelRoutes.find(function (item) { return item.id === route.query.route })
  if (found) {
    selectedDays.value = found.days
    selectedRouteId.value = found.id
    activePref.value = '全部'
  }
}

watch(function () { return route.query.route }, applyQuery)
onMounted(applyQuery)
</script>

<template>
  <div class="travel">
    <PageHero
      index="05"
      title="游蜀指南"
      en="TRAVEL PLANNER"
      intro="把想看的成都，排进日程里。一日看老城，两日读古蜀，三日把山水与烟火都收进去。"
      image="/images/skyline-tower.webp"
      image-position="center"
      theme="ink"
      :meta="['1 日', '2 日', '3 日', '偏好筛选']"
    />

    <section class="travel-intro section">
      <div class="container">
        <div class="travel-intro__grid">
          <div v-reveal>
            <p class="eyebrow">YOUR CHENGDU, YOUR PACE · 按你的节奏</p>
            <h2>不赶路，<br /><em>也不错过。</em></h2>
          </div>
          <div class="travel-intro__copy" v-reveal="{ delay: 0.1 }">
            <p class="lead">
              每个人来成都的理由都不一样。有人为了三国与诗歌，有人为了火锅和夜市，
              有人只想在公园里坐一个下午。先告诉我们你有几天、喜欢什么，再把路线交给我们。
            </p>
            <div class="travel-intro__stats">
              <div><span>01</span><p>选择天数</p></div>
              <div><span>02</span><p>挑选偏好</p></div>
              <div><span>03</span><p>出发成都</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="route-plan" class="planner section section--paper-2">
      <div class="container">
        <SectionHead
          v-reveal
          num="01"
          label="ROUTE GENERATOR"
          en="BUILD YOUR OWN ITINERARY"
          title="行程生成器"
          desc="选择旅行天数与偏好，路线会自动匹配。你也可以切换备选路线，或复制完整行程到手机里。"
        />

        <div class="planner-controls" v-reveal>
          <div class="day-switch" role="tablist" aria-label="旅行天数">
            <button
              v-for="day in daysOptions"
              :key="day"
              type="button"
              class="day-option"
              :class="{ active: selectedDays === day }"
              role="tab"
              :aria-selected="selectedDays === day"
              @click="chooseDays(day)"
            >
              <span>0{{ day }}</span>
              <strong>{{ day }} 日</strong>
              <em>{{ day === 1 ? 'ONE DAY' : day === 2 ? 'TWO DAYS' : 'THREE DAYS' }}</em>
            </button>
          </div>

          <div class="pref-switch">
            <span class="pref-switch__label">偏好</span>
            <button
              v-for="pref in preferenceOptions"
              :key="pref"
              type="button"
              class="pref-chip"
              :class="{ active: activePref === pref }"
              @click="choosePref(pref)"
            >{{ pref }}</button>
          </div>
        </div>

        <div class="planner-layout">
          <article class="route-detail" v-reveal>
            <div class="route-detail__hero">
              <img :src="mainRoute.image" :alt="mainRoute.title" :style="{ objectPosition: mainRoute.imagePosition }" />
              <div class="route-detail__hero-shade"></div>
              <div class="route-detail__hero-text">
                <p>{{ mainRoute.en }}</p>
                <h3>{{ mainRoute.title }}</h3>
                <span>{{ mainRoute.subtitle }}</span>
              </div>
              <span class="route-detail__days">{{ mainRoute.days }}D</span>
            </div>

            <div class="route-detail__meta">
              <div><span>行程</span><p>{{ mainRoute.days }} 天</p></div>
              <div><span>停靠</span><p>{{ mainRoute.stops.length }} 站</p></div>
              <div><span>节奏</span><p>{{ mainRoute.pace }}</p></div>
              <div><span>适合</span><p>{{ mainRoute.bestFor }}</p></div>
            </div>

            <div class="route-detail__body">
              <div class="route-detail__intro">
                <div class="route-detail__tags">
                  <span v-for="tag in mainRoute.tags" :key="tag">{{ tag }}</span>
                </div>
                <p>{{ mainRoute.intro }}</p>
              </div>

              <div v-for="group in dayGroups" :key="group.day" class="itinerary-day">
                <header class="itinerary-day__head">
                  <span>DAY 0{{ group.day }}</span>
                  <h4>{{ group.title }}</h4>
                  <em>{{ group.stops.length }} 站</em>
                </header>

                <div class="stops">
                  <div
                    v-for="(stop, index) in group.stops"
                    :key="group.day + '-' + stop.spotId + '-' + index"
                    class="stop"
                  >
                    <div class="stop__time">{{ stop.time }}</div>
                    <div class="stop__rail">
                      <i></i>
                      <span v-if="index < group.stops.length - 1"></span>
                    </div>
                    <div class="stop__body">
                      <div class="stop__top">
                        <h5>{{ spotFor(stop.spotId) ? spotFor(stop.spotId).name : '成都' }}</h5>
                        <RouterLink
                          v-if="spotFor(stop.spotId) && spotFor(stop.spotId).group === 'city'"
                          :to="'/explore?spot=' + stop.spotId"
                          class="stop__link"
                        >详情 ↗</RouterLink>
                      </div>
                      <p>{{ stop.note }}</p>
                      <div class="stop__meta">
                        <span>{{ stop.duration }}</span>
                        <span>{{ stop.transport }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="route-detail__actions">
                <button type="button" class="btn btn--red" @click="copyRoute">复制这份行程 <span>↗</span></button>
                <a :href="mapLinkForRoute()" target="_blank" rel="noopener" class="text-link">打开地图 <span>↗</span></a>
              </div>
            </div>
          </article>

          <aside class="route-side" v-reveal="{ delay: 0.08 }">
            <RouteMap :route="mainRoute" />

            <div class="route-side__card">
              <div class="route-side__head">
                <span>ROUTE SUMMARY</span>
                <span>{{ mainRoute.distance }}</span>
              </div>
              <div class="route-summary-row">
                <span>旅行天数</span><strong>{{ mainRoute.days }} 天</strong>
              </div>
              <div class="route-summary-row">
                <span>停靠站点</span><strong>{{ mainRoute.stops.length }} 站</strong>
              </div>
              <div class="route-summary-row">
                <span>适合人群</span><strong>{{ mainRoute.bestFor }}</strong>
              </div>
              <p class="route-side__note">
                行程为建议版本，可根据体力、天气与预约时间自由调整。带 ★ 的景点建议提前预约。
              </p>
            </div>

            <div class="route-side__card checklist">
              <div class="route-side__head">
                <span>BEFORE YOU GO</span>
                <span>行前清单</span>
              </div>
              <label v-for="(item, index) in checklist" :key="item" class="check-row">
                <input v-model="checks[index]" type="checkbox" />
                <span>{{ item }}</span>
              </label>
            </div>
          </aside>
        </div>

        <div v-if="alternatives.length" class="alternatives">
          <div class="alternatives__head">
            <p class="eyebrow">OTHER WAYS · 也可以这样走</p>
            <span>换一条路线，换一种成都</span>
          </div>
          <div class="alternative-grid" :class="{ 'alternative-grid--single': alternatives.length === 1 }">
            <button
              v-for="item in alternatives"
              :key="item.id"
              type="button"
              class="alternative-card"
              @click="chooseRoute(item)"
            >
              <img :src="item.image" :alt="item.title" loading="lazy" />
              <span class="alternative-card__shade"></span>
              <span class="alternative-card__body">
                <span>{{ item.days }} DAY{{ item.days > 1 ? 'S' : '' }} · {{ item.pace }}</span>
                <strong>{{ item.title }}</strong>
                <em>{{ item.subtitle }}</em>
              </span>
              <span class="alternative-card__arrow">↗</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="travel-tips section">
      <div class="container">
        <SectionHead
          v-reveal
          num="02"
          label="BEFORE YOU GO"
          en="PRACTICAL NOTES"
          title="出发前，<em>知道这些会更好</em>"
          desc="交通、预约、天气与吃辣，四件小事，帮你把成都之行过得更从容。"
        />
        <div class="tips-grid">
          <article v-for="(tip, index) in travelTips" :key="tip.title" class="travel-tip" v-reveal="{ delay: index * 0.06 }">
            <span class="travel-tip__icon">{{ tip.icon }}</span>
            <p class="travel-tip__en">{{ tip.en }}</p>
            <h3>{{ tip.title }}</h3>
            <p class="travel-tip__text">{{ tip.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="travel-outro">
      <div class="travel-outro__bg">
        <img src="/images/anshun-gold.webp" alt="暮色中的安顺廊桥" loading="lazy" />
      </div>
      <div class="travel-outro__veil"></div>
      <div class="container travel-outro__inner" v-reveal>
        <p class="eyebrow">CHENGDU IS WAITING</p>
        <h2>路线已经有了，<br /><em>成都等你出发。</em></h2>
        <div class="travel-outro__actions">
          <RouterLink to="/gallery" class="btn btn--light">先去影像里看看 <span class="btn__arrow"></span></RouterLink>
          <RouterLink to="/explore" class="hero-link hero-link--light">回到城市漫游 <span>↗</span></RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.travel-intro {
  background:
    radial-gradient(circle at 92% 12%, rgba(201, 163, 92, 0.13), transparent 30%),
    var(--paper);
}

.travel-intro__grid {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: clamp(48px, 9vw, 140px);
  align-items: start;
}

.travel-intro h2 {
  margin-top: 22px;
  font-size: clamp(2.8rem, 5.2vw, 5.8rem);
  line-height: 1.13;
}

.travel-intro h2 em {
  font-style: normal;
  color: var(--red);
}

.travel-intro__copy {
  padding-top: 30px;
}

.travel-intro__stats {
  display: flex;
  gap: 0;
  margin-top: 32px;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}

.travel-intro__stats div {
  flex: 1;
  padding: 16px 14px 15px 0;
  border-right: 1px solid var(--line);
}

.travel-intro__stats div:not(:first-child) {
  padding-left: 14px;
}

.travel-intro__stats div:last-child {
  border-right: 0;
}

.travel-intro__stats span {
  color: var(--red);
  font-family: var(--font-display);
  font-size: 9px;
}

.travel-intro__stats p {
  margin-top: 3px;
  font-family: var(--font-serif);
  font-size: 13px;
}

/* planner */
.planner {
  background:
    linear-gradient(180deg, rgba(245, 240, 230, 0.35), transparent 18%),
    var(--paper-2);
}

.planner-controls {
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  gap: 30px;
  margin-bottom: 30px;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}

.day-switch {
  display: flex;
}

.day-option {
  display: flex;
  align-items: baseline;
  gap: 7px;
  min-width: 145px;
  padding: 16px 18px;
  border-right: 1px solid var(--line);
  color: var(--muted);
  text-align: left;
  transition: background 0.35s var(--ease), color 0.35s var(--ease);
}

.day-option:first-child {
  border-left: 1px solid var(--line);
}

.day-option > span {
  color: var(--red);
  font-family: var(--font-display);
  font-size: 9px;
}

.day-option strong {
  font-family: var(--font-serif);
  font-size: 1.1rem;
  font-weight: 400;
}

.day-option em {
  color: var(--muted);
  font-family: var(--font-display);
  font-size: 8px;
  font-style: normal;
  letter-spacing: 0.08em;
}

.day-option.active {
  background: var(--red);
  color: var(--paper);
}

.day-option.active > span,
.day-option.active em {
  color: var(--gold-2);
}

.pref-switch {
  display: flex;
  align-items: center;
  gap: 5px;
}

.pref-switch__label {
  margin-right: 7px;
  color: var(--muted);
  font-size: 9px;
  letter-spacing: 0.16em;
}

.pref-chip {
  padding: 7px 12px;
  border: 1px solid transparent;
  color: var(--muted);
  font-size: 10px;
  letter-spacing: 0.07em;
  transition: color 0.3s var(--ease), border-color 0.3s var(--ease);
}

.pref-chip:hover {
  color: var(--ink);
}

.pref-chip.active {
  border-color: var(--red);
  color: var(--red);
}

.planner-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(300px, 0.75fr);
  gap: 26px;
  align-items: start;
}

.route-detail {
  background: var(--paper);
  border: 1px solid var(--line);
}

.route-detail__hero {
  position: relative;
  height: 330px;
  overflow: hidden;
  background: var(--ink);
}

.route-detail__hero > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.route-detail__hero-shade {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(10, 14, 14, 0.12), rgba(10, 14, 14, 0.82));
}

.route-detail__hero-text {
  position: absolute;
  left: clamp(22px, 3vw, 38px);
  right: clamp(22px, 3vw, 38px);
  bottom: 26px;
  color: var(--paper);
}

.route-detail__hero-text > p {
  color: var(--gold-2);
  font-family: var(--font-display);
  font-size: 9px;
  letter-spacing: 0.18em;
}

.route-detail__hero-text h3 {
  margin-top: 8px;
  font-size: clamp(2rem, 3.7vw, 3.4rem);
  font-weight: 500;
}

.route-detail__hero-text > span {
  display: block;
  margin-top: 5px;
  color: rgba(245, 240, 230, 0.62);
  font-size: 12px;
}

.route-detail__days {
  position: absolute;
  right: 24px;
  top: 24px;
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  border: 1px solid rgba(229, 205, 148, 0.6);
  color: var(--gold-2);
  font-family: var(--font-display);
  font-size: 13px;
  letter-spacing: 0.08em;
}

.route-detail__meta {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-bottom: 1px solid var(--line);
}

.route-detail__meta > div {
  padding: 15px 18px;
  border-right: 1px solid var(--line);
}

.route-detail__meta > div:last-child {
  border-right: 0;
}

.route-detail__meta span {
  display: block;
  color: var(--muted);
  font-size: 8px;
  letter-spacing: 0.12em;
}

.route-detail__meta p {
  margin-top: 3px;
  font-family: var(--font-serif);
  font-size: 12px;
}

.route-detail__body {
  padding: clamp(24px, 3.4vw, 40px);
}

.route-detail__intro {
  padding-bottom: 26px;
  border-bottom: 1px solid var(--line);
}

.route-detail__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 14px;
}

.route-detail__tags span {
  padding: 3px 8px;
  border: 1px solid var(--line);
  color: var(--red);
  font-size: 8px;
  letter-spacing: 0.05em;
}

.route-detail__intro > p {
  color: var(--muted);
  font-size: 13px;
  line-height: 2;
}

.itinerary-day {
  margin-top: 30px;
}

.itinerary-day__head {
  display: flex;
  align-items: baseline;
  gap: 14px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--line);
}

.itinerary-day__head > span {
  color: var(--red);
  font-family: var(--font-display);
  font-size: 9px;
  letter-spacing: 0.12em;
}

.itinerary-day__head h4 {
  font-family: var(--font-serif);
  font-size: 1.1rem;
  font-weight: 400;
}

.itinerary-day__head em {
  margin-left: auto;
  color: var(--muted);
  font-size: 9px;
  font-style: normal;
}

.stops {
  margin-top: 3px;
}

.stop {
  display: grid;
  grid-template-columns: 56px 18px 1fr;
  gap: 10px;
  padding-top: 15px;
}

.stop__time {
  padding-top: 2px;
  color: var(--red);
  font-family: var(--font-display);
  font-size: 11px;
  letter-spacing: 0.05em;
}

.stop__rail {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5px;
}

.stop__rail i {
  width: 7px;
  height: 7px;
  border: 1px solid var(--red);
  border-radius: 50%;
  background: var(--paper);
}

.stop__rail span {
  flex: 1;
  width: 1px;
  margin-top: 4px;
  background: var(--line);
}

.stop__body {
  padding-bottom: 16px;
}

.stop__top {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
}

.stop__top h5 {
  font-family: var(--font-serif);
  font-size: 1rem;
  font-weight: 500;
}

.stop__link {
  flex: 0 0 auto;
  color: var(--red);
  font-size: 8px;
  letter-spacing: 0.08em;
}

.stop__body > p {
  margin-top: 3px;
  color: var(--muted);
  font-size: 11px;
  line-height: 1.7;
}

.stop__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 13px;
  margin-top: 6px;
  color: var(--muted);
  font-size: 8px;
  letter-spacing: 0.04em;
}

.stop__meta span:last-child {
  color: rgba(30, 36, 40, 0.42);
}

.route-detail__actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 22px;
  margin-top: 12px;
  padding-top: 22px;
  border-top: 1px solid var(--line);
}

.route-detail__actions .text-link {
  color: var(--muted);
}

/* side */
.route-side {
  position: sticky;
  top: calc(var(--header-h) + 30px);
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.route-side__card {
  border: 1px solid var(--line);
  background: var(--paper);
  padding: 17px;
}

.route-side__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-bottom: 11px;
  border-bottom: 1px solid var(--line);
  color: var(--muted);
  font-family: var(--font-display);
  font-size: 8px;
  letter-spacing: 0.14em;
}

.route-summary-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  padding: 9px 0;
  border-bottom: 1px solid var(--line);
}

.route-summary-row span {
  color: var(--muted);
  font-size: 9px;
}

.route-summary-row strong {
  font-family: var(--font-serif);
  font-size: 11px;
  font-weight: 400;
  text-align: right;
}

.route-side__note {
  margin-top: 12px;
  color: var(--muted);
  font-size: 9px;
  line-height: 1.8;
}

.check-row {
  display: flex;
  align-items: flex-start;
  gap: 9px;
  padding: 8px 0;
  border-bottom: 1px solid var(--line);
  color: var(--muted);
  font-size: 10px;
  line-height: 1.6;
  cursor: pointer;
}

.check-row:last-child {
  border-bottom: 0;
}

.check-row input {
  appearance: none;
  flex: 0 0 auto;
  width: 12px;
  height: 12px;
  margin-top: 3px;
  border: 1px solid var(--line-strong);
  background: transparent;
}

.check-row input:checked {
  border-color: var(--red);
  background: var(--red);
  box-shadow: inset 0 0 0 2px var(--paper);
}

/* alternatives */
.alternatives {
  margin-top: clamp(48px, 6vw, 72px);
}

.alternatives__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--line);
}

.alternatives__head .eyebrow {
  margin: 0;
}

.alternatives__head > span {
  color: var(--muted);
  font-size: 10px;
}

.alternative-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 16px;
}

.alternative-grid--single {
  grid-template-columns: 1fr;
}

.alternative-grid--single .alternative-card {
  height: 210px;
}

.alternative-card {
  position: relative;
  height: 180px;
  overflow: hidden;
  color: var(--paper);
  text-align: left;
}

.alternative-card > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 1.1s var(--ease);
}

.alternative-card:hover > img {
  transform: scale(1.04);
}

.alternative-card__shade {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(10, 14, 14, 0.78), rgba(10, 14, 14, 0.2));
}

.alternative-card__body {
  position: absolute;
  left: 20px;
  right: 40px;
  bottom: 18px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.alternative-card__body > span {
  color: var(--gold-2);
  font-family: var(--font-display);
  font-size: 8px;
  letter-spacing: 0.14em;
}

.alternative-card__body strong {
  margin-top: 5px;
  font-family: var(--font-serif);
  font-size: 1.3rem;
  font-weight: 400;
}

.alternative-card__body em {
  margin-top: 2px;
  color: rgba(245, 240, 230, 0.5);
  font-size: 10px;
  font-style: normal;
}

.alternative-card__arrow {
  position: absolute;
  right: 16px;
  top: 16px;
  color: var(--gold-2);
  font-size: 15px;
}

/* tips */
.travel-tips {
  background: var(--paper);
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.travel-tip {
  padding: 25px;
  border: 1px solid var(--line);
}

.travel-tip__icon {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border: 1px solid var(--line-strong);
  border-radius: 50%;
  color: var(--red);
  font-family: var(--font-brush);
  font-size: 18px;
}

.travel-tip__en {
  margin-top: 22px;
  color: var(--muted);
  font-family: var(--font-display);
  font-size: 8px;
  letter-spacing: 0.15em;
}

.travel-tip h3 {
  margin-top: 5px;
  font-size: 1.45rem;
  font-weight: 400;
}

.travel-tip__text {
  margin-top: 12px;
  color: var(--muted);
  font-size: 11px;
  line-height: 1.95;
}

/* outro */
.travel-outro {
  position: relative;
  overflow: hidden;
  padding: clamp(100px, 14vw, 180px) 0;
  color: var(--paper);
  background: var(--red-deep);
}

.travel-outro__bg {
  position: absolute;
  inset: 0;
}

.travel-outro__bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 58%;
  filter: saturate(0.65);
}

.travel-outro__veil {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(67, 10, 15, 0.92), rgba(67, 10, 15, 0.35) 70%, rgba(67, 10, 15, 0.55)),
    linear-gradient(0deg, rgba(67, 10, 15, 0.8), transparent 62%);
}

.travel-outro__inner {
  position: relative;
  z-index: 1;
}

.travel-outro .eyebrow {
  color: var(--gold-2);
}

.travel-outro h2 {
  margin-top: 22px;
  font-size: clamp(2.9rem, 6vw, 6.2rem);
  line-height: 1.16;
}

.travel-outro h2 em {
  font-style: normal;
  color: var(--gold-2);
}

.travel-outro__actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 28px;
  margin-top: 34px;
}

.hero-link {
  display: inline-flex;
  gap: 9px;
  color: rgba(245, 240, 230, 0.62);
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

@media (max-width: 1100px) {
  .planner-layout {
    grid-template-columns: 1fr;
  }

  .route-side {
    position: static;
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    align-items: start;
  }

  .route-side .checklist {
    grid-column: span 2;
  }

  .route-map {
    grid-row: span 2;
  }
}

@media (max-width: 900px) {
  .travel-intro__grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .travel-intro__copy {
    padding-top: 0;
  }

  .planner-controls {
    align-items: flex-start;
    flex-direction: column;
    gap: 14px;
    padding: 14px 0;
  }

  .day-switch {
    width: 100%;
  }

  .day-option {
    flex: 1;
    min-width: 0;
    padding: 12px 10px;
  }

  .day-option em {
    display: none;
  }

  .pref-switch {
    flex-wrap: wrap;
  }

  .route-side {
    grid-template-columns: 1fr;
  }

  .route-side .checklist {
    grid-column: auto;
  }

  .route-map {
    grid-row: auto;
  }

  .tips-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 720px) {
  .travel-intro h2 {
    font-size: 2.5rem;
  }

  .route-detail__hero {
    height: 270px;
  }

  .route-detail__meta {
    grid-template-columns: 1fr 1fr;
  }

  .route-detail__meta > div:nth-child(2) {
    border-right: 0;
  }

  .route-detail__meta > div:nth-child(3),
  .route-detail__meta > div:nth-child(4) {
    border-top: 1px solid var(--line);
  }

  .route-detail__body {
    padding: 22px 18px;
  }

  .route-detail__hero-text h3 {
    font-size: 2rem;
  }

  .stop {
    grid-template-columns: 44px 14px 1fr;
    gap: 7px;
  }

  .stop__meta {
    flex-direction: column;
    gap: 3px;
  }

  .alternative-grid {
    grid-template-columns: 1fr;
  }

  .tips-grid {
    grid-template-columns: 1fr;
  }

  .alternatives__head {
    align-items: flex-start;
    flex-direction: column;
    gap: 5px;
  }

  .travel-outro h2 {
    font-size: 2.7rem;
  }
}

@media (max-width: 460px) {
  .route-side__card {
    padding: 14px;
  }

  .route-summary-row {
    align-items: flex-start;
    flex-direction: column;
    gap: 2px;
  }

  .route-summary-row strong {
    text-align: left;
  }
}
</style>
