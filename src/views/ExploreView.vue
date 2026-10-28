<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PageHero from '../components/PageHero.vue'
import SectionHead from '../components/SectionHead.vue'
import CityMap from '../components/CityMap.vue'
import AttractionModal from '../components/AttractionModal.vue'
import { attractions, cityWalks, getSpot } from '../data/site'

const route = useRoute()
const router = useRouter()
const categories = ['全部', '历史街巷', '现代都市', '休闲生活']
const activeCategory = ref('全部')
const selectedSpot = ref(null)
const activeMapId = ref('')

const citySpots = computed(function () {
  return attractions.filter(function (item) { return item.group === 'city' })
})

const filteredSpots = computed(function () {
  if (activeCategory.value === '全部') return citySpots.value
  return citySpots.value.filter(function (item) {
    return item.category === activeCategory.value
  })
})

const visibleIds = computed(function () {
  return filteredSpots.value.map(function (item) { return item.id })
})

function countFor(category) {
  if (category === '全部') return citySpots.value.length
  return citySpots.value.filter(function (item) { return item.category === category }).length
}

function selectCategory(category) {
  activeCategory.value = category
  activeMapId.value = filteredSpots.value[0] ? filteredSpots.value[0].id : ''
}

function openSpot(spot) {
  selectedSpot.value = spot
  activeMapId.value = spot.id
}

function closeSpot() {
  selectedSpot.value = null
  if (route.query.spot) {
    const query = { ...route.query }
    delete query.spot
    router.replace({ path: route.path, query: query })
  }
}

function applyQuery() {
  if (route.query.spot) {
    const spot = getSpot(route.query.spot)
    if (spot) {
      selectedSpot.value = spot
      activeMapId.value = spot.id
    }
  }
}

watch(function () { return route.query.spot }, applyQuery)
watch(activeCategory, function () {
  activeMapId.value = filteredSpots.value[0] ? filteredSpots.value[0].id : ''
  nextTick(function () {
    ScrollTrigger.refresh()
  })
})

onMounted(function () {
  applyQuery()
  activeMapId.value = citySpots.value[0].id
})
</script>

<template>
  <div class="explore">
    <PageHero
      index="02"
      title="锦城漫游"
      en="EXPLORE CHENGDU"
      intro="成都适合用脚步打开。拐进一条巷子，穿过一座公园，在河桥边等灯亮起来。城市会把它的性格，慢慢给你看。"
      image="images/jinli-lanterns.webp"
      image-position="center"
      theme="ink"
      :meta="['历史街巷', '现代都市', '休闲生活']"
    />

    <section class="explore-intro section">
      <div class="container">
        <div class="explore-intro__grid">
          <div v-reveal>
            <p class="eyebrow">WALK THE CITY · 城市之间</p>
            <h2>把成都，<br /><em>走成一张地图。</em></h2>
          </div>
          <div class="explore-intro__copy" v-reveal="{ delay: 0.1 }">
            <p class="lead">
              宽窄巷子的青砖、锦里的灯笼、春熙路的霓虹、人民公园的竹椅，
              还有东郊记忆的红砖厂房——成都的每一面，都值得慢慢经过。
            </p>
            <div class="explore-intro__note">
              <span>10</span>
              <p>处城市地标<br />3 条散步路线<br />1 张手绘地图</p>
            </div>
          </div>
        </div>
      </div>

      <div class="explore-filter">
        <div class="container explore-filter__inner">
          <div class="filter-tabs" role="tablist" aria-label="景点分类">
            <button
              v-for="category in categories"
              :key="category"
              type="button"
              class="filter-tab"
              :class="{ active: activeCategory === category }"
              role="tab"
              :aria-selected="activeCategory === category"
              @click="selectCategory(category)"
            >
              {{ category }}
              <span>{{ countFor(category) }}</span>
            </button>
          </div>
          <p class="filter-count">SHOWING {{ filteredSpots.length }} PLACES</p>
        </div>
      </div>

      <div class="container">
        <div
          class="spot-grid"
          :class="activeCategory === '全部' ? 'spot-grid--all' : (filteredSpots.length === 2 || filteredSpots.length === 4) ? 'spot-grid--two' : 'spot-grid--filtered'"
        >
          <article
            v-for="(spot, index) in filteredSpots"
            :key="spot.id"
            class="spot-card"
            :class="{ 'spot-card--wide': activeCategory === '全部' && index < 2 }"
            role="button"
            tabindex="0"
            :aria-label="'查看' + spot.name + '详情'"
            v-reveal="{ delay: (index % 4) * 0.05, distance: 26 }"
            @click="openSpot(spot)"
            @keydown.enter="openSpot(spot)"
          >
            <div class="spot-card__media">
              <img :src="spot.image" :alt="spot.name" :style="{ objectPosition: spot.imagePosition }" loading="lazy" />
            </div>
            <div class="spot-card__shade" aria-hidden="true"></div>
            <div class="spot-card__top">
              <span>{{ spot.category }}</span>
              <span>0{{ index + 1 }}</span>
            </div>
            <div class="spot-card__body">
              <p class="spot-card__en">{{ spot.en }}</p>
              <h3>{{ spot.name }}</h3>
              <p class="spot-card__summary">{{ spot.summary }}</p>
              <div class="spot-card__foot">
                <span>{{ spot.best }}</span>
                <span class="spot-card__open">展开故事 <i>↗</i></span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="explore-map section section--green">
      <div class="explore-map__bg" aria-hidden="true"></div>
      <div class="container">
        <SectionHead
          v-reveal
          num="02"
          label="THE CITY MAP"
          en="PLACES, RIVERS & STREETS"
          title="把成都摊开来看"
          desc="金色节点是值得停留的地方。点击地图，展开一段城市故事；也可以打开高德地图，直接出发。"
        />

        <div class="map-layout">
          <div class="map-side" v-reveal>
            <div class="map-side__head">
              <span>SELECTED PLACES</span>
              <span>{{ filteredSpots.length }} / {{ citySpots.length }}</span>
            </div>
            <div class="map-side__list">
              <button
                v-for="(spot, index) in filteredSpots"
                :key="spot.id"
                type="button"
                class="map-spot"
                :class="{ active: activeMapId === spot.id }"
                @mouseenter="activeMapId = spot.id"
                @focus="activeMapId = spot.id"
                @click="openSpot(spot)"
              >
                <span class="map-spot__index">0{{ index + 1 }}</span>
                <span class="map-spot__body">
                  <strong>{{ spot.name }}</strong>
                  <small>{{ spot.category }} · {{ spot.en }}</small>
                </span>
                <span class="map-spot__arrow">↗</span>
              </button>
            </div>
            <p class="map-side__note">
              地图为城市漫游示意图，点位为大致方位。点击“查看详情”可获取交通与地图链接。
            </p>
          </div>

          <CityMap
            :spots="citySpots"
            :visible-ids="visibleIds"
            :active-id="activeMapId"
            @select="openSpot"
          />
        </div>

        <div class="walks">
          <div class="walks__head" v-reveal>
            <div>
              <p class="eyebrow">THREE SHORT WALKS · 散步路线</p>
              <h3>如果只有半天，就这样走。</h3>
            </div>
            <RouterLink to="/travel" class="text-link">查看完整路线 <span>↗</span></RouterLink>
          </div>

          <div class="walk-grid">
            <article
              v-for="(walk, index) in cityWalks"
              :key="walk.id"
              class="walk-card"
              v-reveal="{ delay: index * 0.07, distance: 24 }"
            >
              <div class="walk-card__media">
                <img :src="walk.image" :alt="walk.title" loading="lazy" />
                <span>{{ walk.duration }}</span>
              </div>
              <div class="walk-card__body">
                <p>{{ walk.en }}</p>
                <h3>{{ walk.title }}</h3>
                <p class="walk-card__text">{{ walk.text }}</p>
                <div class="walk-card__spots">
                  <span v-for="spot in walk.spots" :key="spot">{{ spot }}</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section class="explore-cta">
      <div class="explore-cta__bg">
        <img :src="'images/night-market.webp'" alt="成都夜市" loading="lazy" />
      </div>
      <div class="explore-cta__veil"></div>
      <div class="container explore-cta__inner" v-reveal>
        <p class="eyebrow">KEEP WALKING · 继续漫游</p>
        <h2>城市不止一条街，<br /><em>成都也不止一种味道。</em></h2>
        <div class="explore-cta__actions">
          <RouterLink to="/food" class="btn btn--light">去吃点成都味 <span class="btn__arrow"></span></RouterLink>
          <RouterLink to="/travel" class="hero-link hero-link--light">安排一条路线 <span>↗</span></RouterLink>
        </div>
      </div>
    </section>

    <AttractionModal :spot="selectedSpot" @close="closeSpot" />
  </div>
</template>

<style scoped>
.explore-intro {
  background:
    radial-gradient(circle at 92% 8%, rgba(201, 163, 92, 0.13), transparent 30%),
    var(--paper);
}

.explore-intro__grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: clamp(50px, 9vw, 140px);
  align-items: start;
}

.explore-intro h2 {
  margin-top: 22px;
  font-size: clamp(2.6rem, 4.8vw, 5rem);
  line-height: 1.25;
}

.explore-intro h2 em {
  font-style: normal;
  color: var(--red);
}

.explore-intro__copy {
  padding-top: 30px;
}

.explore-intro__note {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  margin-top: 30px;
  padding-top: 24px;
  border-top: 1px solid var(--line);
}

.explore-intro__note > span {
  font-family: var(--font-display);
  font-size: clamp(3.2rem, 5vw, 5.4rem);
  font-weight: 300;
  line-height: 0.85;
  color: var(--red);
}

.explore-intro__note p {
  color: var(--muted);
  font-size: 11px;
  line-height: 2;
  letter-spacing: 0.06em;
}

.explore-filter {
  position: sticky;
  top: var(--header-h);
  z-index: 30;
  margin-top: clamp(54px, 7vw, 88px);
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  background: rgba(245, 240, 230, 0.93);
  backdrop-filter: blur(14px);
}

.explore-filter__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 11px 0;
}

.filter-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.filter-tab {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 9px 14px;
  border: 1px solid transparent;
  color: var(--muted);
  font-size: 11px;
  letter-spacing: 0.08em;
  transition: color 0.3s var(--ease), border-color 0.3s var(--ease), background 0.3s var(--ease);
}

.filter-tab span {
  font-family: var(--font-display);
  font-size: 9px;
  opacity: 0.5;
}

.filter-tab:hover {
  color: var(--ink);
}

.filter-tab.active {
  border-color: var(--red);
  background: var(--red);
  color: var(--paper);
}

.filter-count {
  flex: 0 0 auto;
  color: var(--muted);
  font-family: var(--font-display);
  font-size: 9px;
  letter-spacing: 0.16em;
}

.spot-grid {
  display: grid;
  gap: 20px;
  margin-top: 36px;
}

.spot-grid--all {
  grid-template-columns: repeat(12, 1fr);
}

.spot-grid--all .spot-card {
  grid-column: span 3;
}

.spot-grid--all .spot-card--wide {
  grid-column: span 6;
}

.spot-grid--filtered {
  grid-template-columns: repeat(3, 1fr);
}

.spot-grid--two {
  grid-template-columns: repeat(2, 1fr);
}

.spot-card {
  position: relative;
  height: 405px;
  overflow: hidden;
  color: var(--paper);
  cursor: pointer;
  isolation: isolate;
}

.spot-card--wide {
  height: 470px;
}

.spot-card__media {
  position: absolute;
  inset: 0;
  z-index: -2;
  overflow: hidden;
  background: var(--ink);
}

.spot-card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 1.25s var(--ease), filter 1.25s var(--ease);
}

.spot-card:hover .spot-card__media img,
.spot-card:focus-visible .spot-card__media img {
  transform: scale(1.05);
  filter: saturate(1.07);
}

.spot-card__shade {
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    linear-gradient(180deg, rgba(10, 14, 14, 0.42), transparent 36%, rgba(10, 14, 14, 0.84) 100%),
    linear-gradient(90deg, rgba(10, 14, 14, 0.14), transparent);
}

.spot-card::after {
  content: "";
  position: absolute;
  inset: 10px;
  border: 1px solid rgba(245, 240, 230, 0.2);
  opacity: 0;
  transition: opacity 0.35s var(--ease), inset 0.35s var(--ease);
  pointer-events: none;
}

.spot-card:hover::after,
.spot-card:focus-visible::after {
  opacity: 1;
  inset: 7px;
}

.spot-card__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 18px 18px 0;
  color: rgba(245, 240, 230, 0.6);
  font-family: var(--font-display);
  font-size: 9px;
  letter-spacing: 0.15em;
}

.spot-card__top span:first-child {
  padding: 4px 8px;
  border: 1px solid rgba(245, 240, 230, 0.28);
  font-family: var(--font-sans);
  font-size: 8px;
  letter-spacing: 0.12em;
}

.spot-card__body {
  position: absolute;
  left: 18px;
  right: 18px;
  bottom: 17px;
}

.spot-card__en {
  color: var(--gold-2);
  font-family: var(--font-display);
  font-size: 9px;
  letter-spacing: 0.17em;
}

.spot-card h3 {
  margin-top: 5px;
  font-size: clamp(1.5rem, 2.2vw, 2rem);
  font-weight: 500;
}

.spot-card--wide h3 {
  font-size: clamp(2rem, 3.2vw, 3rem);
}

.spot-card__summary {
  display: -webkit-box;
  overflow: hidden;
  max-width: 500px;
  margin-top: 7px;
  color: rgba(245, 240, 230, 0.62);
  font-size: 11px;
  line-height: 1.7;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.spot-card__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 14px;
  padding-top: 10px;
  border-top: 1px solid rgba(245, 240, 230, 0.16);
  color: rgba(245, 240, 230, 0.42);
  font-size: 9px;
  letter-spacing: 0.06em;
}

.spot-card__open {
  color: var(--gold-2);
  opacity: 0;
  transform: translateX(-6px);
  transition: opacity 0.35s var(--ease), transform 0.35s var(--ease);
}

.spot-card:hover .spot-card__open,
.spot-card:focus-visible .spot-card__open {
  opacity: 1;
  transform: translateX(0);
}

.spot-card__open i {
  font-style: normal;
}

/* map section */
.explore-map {
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(circle at 88% 6%, rgba(201, 163, 92, 0.14), transparent 30%),
    var(--green);
}

.explore-map__bg {
  position: absolute;
  right: -12vw;
  top: 8%;
  width: 55vw;
  height: 55vw;
  border: 1px solid rgba(245, 240, 230, 0.07);
  border-radius: 50%;
  box-shadow:
    0 0 0 80px rgba(245, 240, 230, 0.025),
    0 0 0 160px rgba(245, 240, 230, 0.018);
  pointer-events: none;
}

.map-layout {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(250px, 0.62fr) minmax(0, 1.38fr);
  gap: clamp(24px, 3.4vw, 46px);
  align-items: start;
}

.map-side {
  border-top: 1px solid rgba(245, 240, 230, 0.2);
}

.map-side__head {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 0;
  border-bottom: 1px solid rgba(245, 240, 230, 0.12);
  color: rgba(245, 240, 230, 0.4);
  font-family: var(--font-display);
  font-size: 9px;
  letter-spacing: 0.16em;
}

.map-side__list {
  max-height: 480px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(201, 163, 92, 0.4) transparent;
}

.map-spot {
  display: grid;
  grid-template-columns: 30px 1fr 16px;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 13px 0;
  border-bottom: 1px solid rgba(245, 240, 230, 0.1);
  color: rgba(245, 240, 230, 0.56);
  text-align: left;
  transition: color 0.3s var(--ease), padding 0.3s var(--ease);
}

.map-spot:hover,
.map-spot.active {
  padding-left: 7px;
  color: var(--gold-2);
}

.map-spot__index {
  font-family: var(--font-display);
  font-size: 9px;
  opacity: 0.5;
}

.map-spot__body {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
}

.map-spot__body strong {
  font-family: var(--font-serif);
  font-size: 0.95rem;
  font-weight: 400;
}

.map-spot__body small {
  overflow: hidden;
  color: rgba(245, 240, 230, 0.32);
  font-family: var(--font-display);
  font-size: 7px;
  letter-spacing: 0.08em;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.map-spot__arrow {
  color: var(--gold);
  font-size: 10px;
  opacity: 0;
  transition: opacity 0.3s var(--ease);
}

.map-spot.active .map-spot__arrow {
  opacity: 1;
}

.map-side__note {
  margin-top: 16px;
  color: rgba(245, 240, 230, 0.32);
  font-size: 9px;
  line-height: 1.9;
}

.walks {
  margin-top: clamp(58px, 8vw, 100px);
}

.walks__head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 30px;
  padding-bottom: 24px;
  border-bottom: 1px solid rgba(245, 240, 230, 0.18);
}

.walks__head .eyebrow {
  color: var(--gold-2);
}

.walks__head h3 {
  margin-top: 12px;
  font-size: clamp(1.8rem, 3vw, 2.8rem);
  font-weight: 400;
}

.walks__head .text-link {
  color: var(--gold-2);
}

.walk-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
  margin-top: 22px;
}

.walk-card {
  background: rgba(245, 240, 230, 0.035);
  border: 1px solid rgba(245, 240, 230, 0.12);
}

.walk-card__media {
  position: relative;
  height: 180px;
  overflow: hidden;
}

.walk-card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 1.1s var(--ease);
}

.walk-card:hover .walk-card__media img {
  transform: scale(1.04);
}

.walk-card__media > span {
  position: absolute;
  right: 10px;
  bottom: 10px;
  padding: 4px 8px;
  background: rgba(18, 39, 35, 0.8);
  color: var(--gold-2);
  font-size: 8px;
  letter-spacing: 0.1em;
}

.walk-card__body {
  padding: 18px;
}

.walk-card__body > p:first-child {
  color: rgba(245, 240, 230, 0.34);
  font-family: var(--font-display);
  font-size: 8px;
  letter-spacing: 0.16em;
}

.walk-card h3 {
  margin-top: 6px;
  font-size: 1.35rem;
  font-weight: 400;
}

.walk-card__text {
  margin-top: 8px;
  color: rgba(245, 240, 230, 0.54);
  font-size: 11px;
  line-height: 1.8;
}

.walk-card__spots {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 15px;
}

.walk-card__spots span {
  padding: 3px 7px;
  border: 1px solid rgba(245, 240, 230, 0.16);
  color: rgba(245, 240, 230, 0.45);
  font-size: 8px;
  letter-spacing: 0.06em;
}

/* cta */
.explore-cta {
  position: relative;
  overflow: hidden;
  padding: clamp(90px, 12vw, 160px) 0;
  color: var(--paper);
  background: var(--red-deep);
}

.explore-cta__bg {
  position: absolute;
  inset: 0;
}

.explore-cta__bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  filter: saturate(0.7);
}

.explore-cta__veil {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(65, 10, 15, 0.94), rgba(65, 10, 15, 0.44) 65%, rgba(65, 10, 15, 0.64)),
    linear-gradient(0deg, rgba(65, 10, 15, 0.8), transparent 60%);
}

.explore-cta__inner {
  position: relative;
  z-index: 1;
}

.explore-cta h2 {
  margin-top: 22px;
  font-size: clamp(2.6rem, 5.4vw, 5.8rem);
  line-height: 1.18;
}

.explore-cta h2 em {
  font-style: normal;
  color: var(--gold-2);
}

.explore-cta__actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 26px;
  margin-top: 34px;
}

@media (max-width: 1100px) {
  .spot-grid--all {
    grid-template-columns: repeat(3, 1fr);
  }

  .spot-grid--all .spot-card,
  .spot-grid--all .spot-card--wide {
    grid-column: auto;
    height: 400px;
  }

  .spot-grid--all .spot-card--wide {
    height: 440px;
  }

  .map-layout {
    grid-template-columns: 1fr;
  }

  .map-side__list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0 24px;
    max-height: none;
  }
}

@media (max-width: 900px) {
  .explore-intro__grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .explore-intro__copy {
    padding-top: 0;
  }

  .spot-grid--all,
  .spot-grid--filtered,
  .spot-grid--two {
    grid-template-columns: 1fr 1fr;
  }

  .spot-card,
  .spot-grid--all .spot-card,
  .spot-grid--all .spot-card--wide {
    height: 400px;
  }

  .walk-grid {
    grid-template-columns: 1fr;
  }

  .walk-card {
    display: grid;
    grid-template-columns: 0.65fr 1fr;
  }

  .walk-card__media {
    height: 100%;
    min-height: 180px;
  }
}

@media (max-width: 720px) {
  .explore-intro h2 {
    font-size: 2.3rem;
  }

  .explore-filter {
    top: var(--header-h);
    overflow-x: auto;
  }

  .explore-filter__inner {
    align-items: flex-start;
    flex-direction: column;
    gap: 4px;
    padding: 9px 0;
  }

  .filter-tabs {
    flex-wrap: nowrap;
    overflow-x: auto;
    width: 100%;
    padding-bottom: 2px;
    scrollbar-width: none;
  }

  .filter-tabs::-webkit-scrollbar {
    display: none;
  }

  .filter-tab {
    flex: 0 0 auto;
    padding: 8px 10px;
  }

  .filter-count {
    display: none;
  }

  .spot-grid--all,
  .spot-grid--filtered,
  .spot-grid--two {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .spot-card,
  .spot-grid--all .spot-card,
  .spot-grid--all .spot-card--wide {
    height: 390px;
  }

  .spot-card--wide h3,
  .spot-card h3 {
    font-size: 1.75rem;
  }

  .map-side__list {
    grid-template-columns: 1fr;
  }

  .map-spot__body small {
    display: none;
  }

  .walks__head {
    align-items: flex-start;
    flex-direction: column;
    gap: 16px;
  }

  .walk-card {
    display: block;
  }

  .walk-card__media {
    height: 200px;
  }

  .explore-cta h2 {
    font-size: 2.4rem;
  }
}
</style>
