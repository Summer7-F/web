<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PageHero from '../components/PageHero.vue'
import SectionHead from '../components/SectionHead.vue'
import AttractionModal from '../components/AttractionModal.vue'
import { natureFacts, natureSpots, seasons, getSpot } from '../data/site'

const route = useRoute()
const router = useRouter()
const flipped = ref([])
const activeSeason = ref(seasons[0].id)
const selectedSpot = ref(null)

const currentSeason = computed(function () {
  return seasons.find(function (item) { return item.id === activeSeason.value }) || seasons[0]
})

const natureMetrics = [
  { value: '1.69', unit: '万 km', label: '天府绿道规划总长', en: 'GREENWAY NETWORK' },
  { value: '5364', unit: 'm', label: '西岭雪山最高峰', en: 'XILING PEAK' },
  { value: '12–38', unit: 'kg', label: '大熊猫每日食竹量', en: 'BAMBOO A DAY' },
  { value: '4', unit: '季', label: '各有风物的成都', en: 'FOUR SEASONS' }
]

function toggleFact(index) {
  const next = flipped.value.slice()
  next[index] = !next[index]
  flipped.value = next
}

function openSpot(item) {
  const spot = getSpot(item.id)
  if (spot) selectedSpot.value = spot
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
  if (!route.query.spot) return
  const spot = getSpot(route.query.spot)
  if (spot) selectedSpot.value = spot
}

watch(function () { return route.query.spot }, applyQuery)
onMounted(applyQuery)
</script>

<template>
  <div class="nature">
    <PageHero
      index="04"
      title="熊猫与自然"
      en="PANDAS & NATURE"
      intro="在成都，自然不是远方。它是一只熊猫手里的竹子，是城市尽头的一条绿道，也是西边窗框里的一抹雪山。"
      image="images/panda-group.webp"
      image-position="center"
      theme="green"
      :meta="['大熊猫', '青城山', '天府绿道']"
    />

    <section class="nature-intro section">
      <div class="container">
        <div class="nature-intro__grid">
          <div class="nature-intro__media" v-reveal>
            <img :src="'images/panda-close.webp'" alt="竹林里的大熊猫" loading="lazy" />
            <div class="nature-intro__caption">
              <span>01 · 大熊猫</span>
              <p>Ailuropoda melanoleuca</p>
            </div>
          </div>
          <div class="nature-intro__copy" v-reveal="{ delay: 0.1 }">
            <p class="eyebrow">NATURE IN THE CITY · 公园城市</p>
            <h2>城市很大，<br /><em>自然离你很近。</em></h2>
            <p class="lead">
              成都是一座把“公园”写进城市名字的城市。早晨在熊猫基地看幼崽吃竹子，下午骑车穿过环城绿道，
              傍晚在龙泉山等一场日落。山、水、竹林与城市，在这里没有明确的边界。
            </p>
            <div class="nature-intro__line">
              <span>窗含西岭千秋雪</span>
              <span>门泊东吴万里船</span>
            </div>
            <p class="nature-intro__source">杜甫《绝句》</p>
          </div>
        </div>

        <div class="nature-metrics" v-reveal>
          <div v-for="item in natureMetrics" :key="item.label" class="nature-metric">
            <p class="nature-metric__value">{{ item.value }}<small>{{ item.unit }}</small></p>
            <p class="nature-metric__label">{{ item.label }}</p>
            <span>{{ item.en }}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="panda-facts section section--deep-green">
      <div class="container">
        <SectionHead
          v-reveal
          num="01"
          label="PANDA NOTES"
          en="FOUR THINGS ABOUT PANDAS"
          title="熊猫冷知识"
          desc="关于大熊猫，除了“可爱”，还有很多值得知道的事。轻触卡片，翻开背面。"
        />

        <div class="facts-grid">
          <button
            v-for="(fact, index) in natureFacts"
            :key="fact.title"
            type="button"
            class="fact-card"
            :class="{ 'is-flipped': flipped[index] }"
            :aria-pressed="Boolean(flipped[index])"
            v-reveal="{ delay: index * 0.07 }"
            @click="toggleFact(index)"
          >
            <span class="fact-card__inner">
              <span class="fact-card__face fact-card__front">
                <span class="fact-card__num">0{{ index + 1 }}</span>
                <span class="fact-card__icon">{{ fact.icon }}</span>
                <span class="fact-card__title">{{ fact.title }}</span>
                <span class="fact-card__value">{{ fact.value }}</span>
                <span class="fact-card__hint">点击翻开 <i>↗</i></span>
              </span>
              <span class="fact-card__face fact-card__back">
                <span class="fact-card__num">0{{ index + 1 }}</span>
                <span class="fact-card__back-title">{{ fact.title }}</span>
                <span class="fact-card__text">{{ fact.text }}</span>
                <span class="fact-card__hint">收回 <i>↙</i></span>
              </span>
            </span>
          </button>
        </div>
      </div>
    </section>

    <section class="nature-spots section">
      <div class="container">
        <SectionHead
          v-reveal
          num="02"
          label="NATURE NEARBY"
          en="SIX PLACES TO BREATHE"
          title="在成都，<em>遇见自然</em>"
          desc="从城市里的熊猫基地，到一小时车程外的青城山与都江堰。成都的自然，有近的，也有远的。"
        />

        <div class="nature-grid">
          <article
            v-for="(item, index) in natureSpots"
            :key="item.id"
            class="nature-card"
            :class="'nature-card--' + (index + 1)"
            role="button"
            tabindex="0"
            :aria-label="'查看' + item.name + '详情'"
            v-reveal="{ delay: (index % 3) * 0.07, distance: 28 }"
            @click="openSpot(item)"
            @keydown.enter="openSpot(item)"
          >
            <div class="nature-card__media">
              <img :src="item.image" :alt="item.name" loading="lazy" />
            </div>
            <div class="nature-card__shade"></div>
            <div class="nature-card__body">
              <span class="nature-card__type">{{ item.type }}</span>
              <div class="nature-card__title">
                <h3>{{ item.name }}</h3>
                <span aria-hidden="true">↗</span>
              </div>
              <p class="nature-card__en">{{ item.en }}</p>
              <p class="nature-card__text">{{ item.text }}</p>
              <div class="nature-card__meta">
                <span>{{ item.distance }}</span>
                <span>{{ item.time }}</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="greenway-feature section section--paper-2">
      <div class="container">
        <div class="greenway-feature__grid">
          <div class="greenway-feature__images" v-reveal>
            <div class="greenway-feature__main">
              <img :src="'images/greenway-aerial.webp'" alt="天府绿道环城生态公园" loading="lazy" />
            </div>
            <div class="greenway-feature__small">
              <img :src="'images/greenway-bridge.webp'" alt="绿道上的桥" loading="lazy" />
            </div>
            <span class="greenway-feature__seal">绿</span>
          </div>
          <div class="greenway-feature__copy" v-reveal="{ delay: 0.1 }">
            <p class="eyebrow">THE GREEN RING · 天府绿道</p>
            <h2>把城市，<br /><em>种进公园里。</em></h2>
            <p>
              天府绿道规划总长 1.69 万公里，环城生态公园像一条绿色项链，把湖泊、田野、桥与骑行道串在一起。
              成都人周末的日常，是租一辆自行车，骑到一片没有天花板的风景里。
            </p>
            <div class="greenway-feature__stats">
              <div><span>01</span><p>骑行</p><small>从城市到田野</small></div>
              <div><span>02</span><p>野餐</p><small>在草地上躺平</small></div>
              <div><span>03</span><p>观鸟</p><small>把时间交给自然</small></div>
            </div>
            <button type="button" class="text-link" @click="openSpot({ id: 'greenway' })">查看天府绿道 <span>↗</span></button>
          </div>
        </div>
      </div>
    </section>

    <section class="seasons-section section">
      <div class="container">
        <SectionHead
          v-reveal
          num="03"
          label="SEASONS"
          en="CHENGDU IN FOUR SEASONS"
          title="成都的四季，<em>各有各的去处</em>"
          desc="春看花，夏进山，秋追银杏，冬等雪。成都的四季不算分明，却各有各的仪式感。"
        />

        <div class="season-tabs" role="tablist" aria-label="季节">
          <button
            v-for="season in seasons"
            :key="season.id"
            type="button"
            class="season-tab"
            :class="{ active: activeSeason === season.id }"
            role="tab"
            :aria-selected="activeSeason === season.id"
            @click="activeSeason = season.id"
          >
            <span>{{ season.label }}</span>
            <em>{{ season.en }}</em>
            <small>{{ season.months }}</small>
          </button>
        </div>

        <Transition name="season" mode="out-in">
          <div :key="currentSeason.id" class="season-panel">
            <div class="season-panel__media">
              <img :src="currentSeason.image" :alt="currentSeason.title" loading="lazy" />
              <span class="season-panel__stamp">{{ currentSeason.label }}</span>
            </div>
            <div class="season-panel__copy">
              <p class="season-panel__months">{{ currentSeason.months }} · {{ currentSeason.en }}</p>
              <h3>{{ currentSeason.title }}</h3>
              <p>{{ currentSeason.text }}</p>
              <div class="season-panel__spots">
                <span v-for="spot in currentSeason.spots" :key="spot">{{ spot }}</span>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </section>

    <section class="nature-outro">
      <div class="nature-outro__bg">
        <img :src="'images/qingcheng-trail.webp'" alt="青城山山路" loading="lazy" />
      </div>
      <div class="nature-outro__veil"></div>
      <div class="container nature-outro__inner" v-reveal>
        <p class="eyebrow">TAKE A DEEP BREATH</p>
        <h2>把脚步放慢，<br /><em>把自然还给自己。</em></h2>
        <div class="nature-outro__actions">
          <RouterLink to="/travel" class="btn btn--light">安排一段自然之旅 <span class="btn__arrow"></span></RouterLink>
          <RouterLink to="/gallery" class="hero-link hero-link--light">看更多自然影像 <span>↗</span></RouterLink>
        </div>
      </div>
    </section>

    <AttractionModal :spot="selectedSpot" @close="closeSpot" />
  </div>
</template>

<style scoped>
.nature-intro {
  background:
    radial-gradient(circle at 92% 8%, rgba(32, 60, 55, 0.11), transparent 30%),
    var(--paper);
}

.nature-intro__grid {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: clamp(46px, 8vw, 120px);
  align-items: center;
}

.nature-intro__media {
  position: relative;
  height: clamp(460px, 52vw, 720px);
  overflow: hidden;
}

.nature-intro__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 1.4s var(--ease);
}

.nature-intro__media:hover img {
  transform: scale(1.035);
}

.nature-intro__caption {
  position: absolute;
  left: 20px;
  right: 20px;
  bottom: 20px;
  display: flex;
  justify-content: space-between;
  gap: 14px;
  padding-top: 12px;
  border-top: 1px solid rgba(245, 240, 230, 0.5);
  color: var(--paper);
  font-size: 9px;
  letter-spacing: 0.12em;
}

.nature-intro__caption p {
  font-family: var(--font-display);
  font-size: 8px;
  letter-spacing: 0.08em;
  opacity: 0.65;
}

.nature-intro__copy h2 {
  margin-top: 22px;
  font-size: clamp(2.6rem, 4.9vw, 5.2rem);
  line-height: 1.24;
}

.nature-intro__copy h2 em {
  font-style: normal;
  color: var(--green);
}

.nature-intro__copy .lead {
  margin-top: 24px;
}

.nature-intro__line {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-top: 30px;
  padding-left: 18px;
  border-left: 1px solid var(--red);
  color: var(--red);
  font-family: var(--font-serif);
  font-size: clamp(1.05rem, 1.5vw, 1.3rem);
  letter-spacing: 0.1em;
  line-height: 1.9;
}

.nature-intro__source {
  margin-top: 10px;
  padding-left: 18px;
  color: var(--muted);
  font-size: 9px;
  letter-spacing: 0.12em;
}

.nature-metrics {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-top: clamp(60px, 8vw, 100px);
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}

.nature-metric {
  padding: 27px 24px 25px 0;
  border-right: 1px solid var(--line);
}

.nature-metric:not(:first-child) {
  padding-left: 24px;
}

.nature-metric:last-child {
  border-right: 0;
}

.nature-metric__value {
  display: flex;
  align-items: baseline;
  gap: 4px;
  font-family: var(--font-display);
  font-size: clamp(2.3rem, 3.8vw, 3.6rem);
  font-weight: 300;
  line-height: 1;
  color: var(--green);
}

.nature-metric__value small {
  font-family: var(--font-serif);
  font-size: 11px;
  color: var(--ink);
}

.nature-metric__label {
  margin-top: 11px;
  font-family: var(--font-serif);
  font-size: 12px;
  color: var(--ink);
}

.nature-metric > span {
  display: block;
  margin-top: 4px;
  color: var(--muted);
  font-family: var(--font-display);
  font-size: 8px;
  letter-spacing: 0.14em;
}

/* panda facts */
.panda-facts {
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(circle at 10% 10%, rgba(201, 163, 92, 0.12), transparent 28%),
    var(--green-deep);
}

.facts-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
}

.fact-card {
  height: 330px;
  perspective: 1100px;
  text-align: left;
}

.fact-card__inner {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.75s var(--ease);
}

.fact-card.is-flipped .fact-card__inner {
  transform: rotateY(180deg);
}

.fact-card__face {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 22px;
  border: 1px solid rgba(245, 240, 230, 0.18);
  background: rgba(245, 240, 230, 0.035);
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.fact-card__front {
  justify-content: flex-start;
}

.fact-card__back {
  justify-content: center;
  background: var(--gold);
  color: var(--ink);
  transform: rotateY(180deg);
}

.fact-card__num {
  color: rgba(245, 240, 230, 0.38);
  font-family: var(--font-display);
  font-size: 10px;
  letter-spacing: 0.12em;
}

.fact-card__back .fact-card__num {
  color: rgba(30, 36, 40, 0.42);
}

.fact-card__icon {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  margin-top: 26px;
  border: 1px solid rgba(229, 205, 148, 0.4);
  border-radius: 50%;
  color: var(--gold-2);
  font-family: var(--font-brush);
  font-size: 22px;
}

.fact-card__title {
  margin-top: auto;
  color: rgba(245, 240, 230, 0.55);
  font-size: 11px;
  letter-spacing: 0.08em;
}

.fact-card__value {
  margin-top: 4px;
  font-family: var(--font-serif);
  font-size: clamp(1.5rem, 2.2vw, 2rem);
  color: var(--gold-2);
}

.fact-card__hint {
  margin-top: 18px;
  color: rgba(245, 240, 230, 0.3);
  font-size: 8px;
  letter-spacing: 0.14em;
}

.fact-card__hint i {
  font-style: normal;
  color: var(--gold);
}

.fact-card__back .fact-card__hint {
  color: rgba(30, 36, 40, 0.45);
}

.fact-card__back .fact-card__hint i {
  color: var(--ink);
}

.fact-card__back-title {
  margin-top: 18px;
  font-family: var(--font-serif);
  font-size: 1.2rem;
  font-weight: 500;
}

.fact-card__text {
  margin-top: 12px;
  color: rgba(30, 36, 40, 0.72);
  font-size: 12px;
  line-height: 1.85;
}

/* nature spots */
.nature-spots {
  background: var(--paper);
}

.nature-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.nature-card {
  position: relative;
  height: 440px;
  overflow: hidden;
  color: var(--paper);
  cursor: pointer;
  isolation: isolate;
}

.nature-card__media {
  position: absolute;
  inset: 0;
  z-index: -2;
}

.nature-card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 1.3s var(--ease);
}

.nature-card:hover .nature-card__media img {
  transform: scale(1.05);
}

.nature-card__shade {
  position: absolute;
  inset: 0;
  z-index: -1;
  background: linear-gradient(180deg, rgba(10, 14, 14, 0.2) 18%, rgba(10, 14, 14, 0.84) 100%);
}

.nature-card__body {
  position: absolute;
  left: 22px;
  right: 22px;
  bottom: 21px;
}

.nature-card__type {
  color: var(--gold-2);
  font-size: 9px;
  letter-spacing: 0.14em;
}

.nature-card__title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.nature-card__title h3 {
  margin-top: 5px;
  font-size: clamp(1.6rem, 2.6vw, 2.5rem);
  font-weight: 500;
}

.nature-card__title > span {
  color: var(--gold);
  font-size: 15px;
  opacity: 0;
  transform: translate(-4px, 4px);
  transition: opacity 0.3s var(--ease), transform 0.3s var(--ease);
}

.nature-card:hover .nature-card__title > span {
  opacity: 1;
  transform: translate(0, 0);
}

.nature-card__en {
  margin-top: 2px;
  color: rgba(245, 240, 230, 0.4);
  font-family: var(--font-display);
  font-size: 8px;
  letter-spacing: 0.15em;
}

.nature-card__text {
  max-width: 390px;
  margin-top: 10px;
  color: rgba(245, 240, 230, 0.62);
  font-size: 11px;
  line-height: 1.8;
}

.nature-card__meta {
  display: flex;
  gap: 18px;
  margin-top: 13px;
  padding-top: 10px;
  border-top: 1px solid rgba(245, 240, 230, 0.2);
  color: rgba(245, 240, 230, 0.4);
  font-size: 9px;
  letter-spacing: 0.06em;
}

/* greenway */
.greenway-feature {
  background: var(--paper-2);
}

.greenway-feature__grid {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: clamp(44px, 8vw, 120px);
  align-items: center;
}

.greenway-feature__images {
  position: relative;
  padding-bottom: 74px;
}

.greenway-feature__main {
  height: clamp(360px, 43vw, 580px);
  overflow: hidden;
}

.greenway-feature__main img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.greenway-feature__small {
  position: absolute;
  right: -28px;
  bottom: 0;
  width: 46%;
  height: 210px;
  overflow: hidden;
  border: 6px solid var(--paper-2);
}

.greenway-feature__small img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.greenway-feature__seal {
  position: absolute;
  left: -15px;
  top: 24px;
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  background: var(--green);
  color: var(--gold-2);
  font-family: var(--font-serif);
  font-size: 18px;
}

.greenway-feature__copy h2 {
  margin-top: 22px;
  font-size: clamp(2.5rem, 4.6vw, 4.8rem);
  line-height: 1.24;
}

.greenway-feature__copy h2 em {
  font-style: normal;
  color: var(--green);
}

.greenway-feature__copy > p {
  margin-top: 22px;
  color: var(--muted);
  font-size: 14px;
  line-height: 2.1;
}

.greenway-feature__stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-top: 28px;
  padding: 18px 0;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}

.greenway-feature__stats div {
  padding-right: 10px;
  border-right: 1px solid var(--line);
}

.greenway-feature__stats div:last-child {
  border-right: 0;
}

.greenway-feature__stats span {
  color: var(--red);
  font-family: var(--font-display);
  font-size: 9px;
}

.greenway-feature__stats p {
  margin-top: 4px;
  font-family: var(--font-serif);
  font-size: 14px;
}

.greenway-feature__stats small {
  display: block;
  margin-top: 2px;
  color: var(--muted);
  font-size: 9px;
}

.greenway-feature__copy .text-link {
  margin-top: 26px;
  color: var(--green);
}

/* seasons */
.seasons-section {
  background: var(--paper);
}

.season-tabs {
  display: flex;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}

.season-tab {
  flex: 1;
  display: flex;
  align-items: baseline;
  gap: 10px;
  padding: 17px 16px;
  border-right: 1px solid var(--line);
  color: var(--muted);
  text-align: left;
  transition: color 0.3s var(--ease), background 0.3s var(--ease);
}

.season-tab:last-child {
  border-right: 0;
}

.season-tab span {
  font-family: var(--font-serif);
  font-size: 1.3rem;
}

.season-tab em {
  font-family: var(--font-display);
  font-size: 9px;
  font-style: normal;
  letter-spacing: 0.1em;
}

.season-tab small {
  margin-left: auto;
  font-family: var(--font-display);
  font-size: 8px;
  letter-spacing: 0.08em;
  opacity: 0.55;
}

.season-tab.active {
  background: var(--green);
  color: var(--paper);
}

.season-panel {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: clamp(36px, 6vw, 90px);
  align-items: center;
  padding-top: clamp(32px, 4vw, 54px);
}

.season-panel__media {
  position: relative;
  height: clamp(350px, 42vw, 540px);
  overflow: hidden;
}

.season-panel__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.season-panel__stamp {
  position: absolute;
  right: 18px;
  top: 18px;
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  background: var(--red);
  color: var(--gold-3);
  font-family: var(--font-serif);
  font-size: 19px;
}

.season-panel__months {
  color: var(--red);
  font-family: var(--font-display);
  font-size: 10px;
  letter-spacing: 0.14em;
}

.season-panel__copy h3 {
  margin-top: 12px;
  font-size: clamp(2rem, 3.8vw, 3.8rem);
  font-weight: 400;
}

.season-panel__copy > p {
  max-width: 470px;
  margin-top: 18px;
  color: var(--muted);
  font-size: 14px;
  line-height: 2.05;
}

.season-panel__spots {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 22px;
}

.season-panel__spots span {
  padding: 5px 9px;
  border: 1px solid var(--line);
  color: var(--muted);
  font-size: 9px;
  letter-spacing: 0.05em;
}

.season-enter-active,
.season-leave-active {
  transition: opacity 0.4s var(--ease), transform 0.4s var(--ease);
}

.season-enter-from {
  opacity: 0;
  transform: translateY(12px);
}

.season-leave-to {
  opacity: 0;
  transform: translateY(-7px);
}

/* outro */
.nature-outro {
  position: relative;
  overflow: hidden;
  padding: clamp(100px, 14vw, 180px) 0;
  color: var(--paper);
  background: var(--green-deep);
}

.nature-outro__bg {
  position: absolute;
  inset: 0;
}

.nature-outro__bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(0.7);
}

.nature-outro__veil {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(12, 32, 28, 0.94), rgba(12, 32, 28, 0.32) 70%, rgba(12, 32, 28, 0.5)),
    linear-gradient(0deg, rgba(12, 32, 28, 0.78), transparent 60%);
}

.nature-outro__inner {
  position: relative;
  z-index: 1;
}

.nature-outro .eyebrow {
  color: var(--gold-2);
}

.nature-outro h2 {
  margin-top: 22px;
  font-size: clamp(2.9rem, 6vw, 6.4rem);
  line-height: 1.16;
}

.nature-outro h2 em {
  font-style: normal;
  color: var(--gold-2);
}

.nature-outro__actions {
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

@media (max-width: 1024px) {
  .nature-intro__grid {
    grid-template-columns: 1fr 1fr;
    gap: 34px;
  }

  .facts-grid {
    grid-template-columns: 1fr 1fr;
  }

  .greenway-feature__grid {
    grid-template-columns: 1fr;
    gap: 44px;
  }

  .greenway-feature__images {
    max-width: 720px;
  }
}

@media (max-width: 900px) {
  .nature-grid {
    grid-template-columns: 1fr 1fr;
  }

  .season-panel {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .season-panel__media {
    height: 360px;
  }
}

@media (max-width: 720px) {
  .nature-intro__grid {
    grid-template-columns: 1fr;
  }

  .nature-intro__media {
    height: 380px;
  }

  .nature-intro__copy h2 {
    font-size: 2.3rem;
  }

  .nature-metrics {
    grid-template-columns: 1fr 1fr;
  }

  .nature-metric:nth-child(2) {
    border-right: 0;
  }

  .nature-metric:nth-child(3),
  .nature-metric:nth-child(4) {
    border-top: 1px solid var(--line);
  }

  .facts-grid {
    grid-template-columns: 1fr;
  }

  .fact-card {
    height: 250px;
  }

  .fact-card__icon {
    margin-top: 18px;
  }

  .nature-grid {
    grid-template-columns: 1fr;
  }

  .nature-card {
    height: 390px;
  }

  .greenway-feature__small {
    right: 0;
    width: 52%;
    height: 160px;
  }

  .greenway-feature__copy h2 {
    font-size: 2.5rem;
  }

  .greenway-feature__stats {
    gap: 8px;
  }

  .season-tabs {
    overflow-x: auto;
  }

  .season-tab {
    flex: 0 0 120px;
    padding: 13px 12px;
  }

  .season-tab small {
    display: none;
  }

  .season-panel__media {
    height: 300px;
  }

  .season-panel__copy h3 {
    font-size: 2.3rem;
  }

  .nature-outro h2 {
    font-size: 2.7rem;
  }
}

@media (max-width: 460px) {
  .nature-metric {
    padding: 20px 12px 18px 0;
  }

  .nature-metric:not(:first-child) {
    padding-left: 14px;
  }

  .nature-metric__value {
    font-size: 2rem;
  }

  .nature-metric__label {
    font-size: 11px;
  }

  .fact-card {
    height: 230px;
  }
}
</style>
