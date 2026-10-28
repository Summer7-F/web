<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PageHero from '../components/PageHero.vue'
import SectionHead from '../components/SectionHead.vue'
import GalleryLightbox from '../components/GalleryLightbox.vue'
import { galleryItems, galleryCategories } from '../data/site'

const route = useRoute()
const router = useRouter()
const activeCategory = ref('全部')
const lightboxOpen = ref(false)
const activeIndex = ref(0)

const filteredItems = computed(function () {
  if (activeCategory.value === '全部') return galleryItems
  return galleryItems.filter(function (item) { return item.category === activeCategory.value })
})

function countFor(category) {
  if (category === '全部') return galleryItems.length
  return galleryItems.filter(function (item) { return item.category === category }).length
}

function openLightbox(item) {
  const index = filteredItems.value.findIndex(function (entry) { return entry.id === item.id })
  activeIndex.value = index < 0 ? 0 : index
  lightboxOpen.value = true
}

function closeLightbox() {
  lightboxOpen.value = false
  if (route.query.photo) {
    const query = { ...route.query }
    delete query.photo
    router.replace({ path: route.path, query: query })
  }
}

function applyQuery() {
  if (!route.query.photo) return
  const item = galleryItems.find(function (entry) { return entry.id === route.query.photo })
  if (!item) return
  activeCategory.value = '全部'
  nextTick(function () {
    const index = galleryItems.findIndex(function (entry) { return entry.id === item.id })
    activeIndex.value = index < 0 ? 0 : index
    lightboxOpen.value = true
  })
}

watch(activeCategory, function () {
  nextTick(function () {
    ScrollTrigger.refresh()
  })
})

watch(function () { return route.query.photo }, applyQuery)
onMounted(applyQuery)
</script>

<template>
  <div class="gallery-page">
    <PageHero
      index="06"
      title="蜀城光影"
      en="GALLERY & STORIES"
      intro="城市会忘记，镜头会记得。夜景、古建、市井、人物与自然，二十三个瞬间，组成我们看见的成都。"
      image="images/skyline-tower.webp"
      image-position="center"
      theme="ink"
      :meta="['夜景', '古建', '市井', '人物', '自然']"
    />

    <section class="gallery-intro section">
      <div class="container">
        <div class="gallery-intro__grid">
          <div v-reveal>
            <p class="eyebrow">A CITY IN FRAMES · 镜头里的成都</p>
            <h2>城市会忘记，<br /><em>镜头会记得。</em></h2>
          </div>
          <div class="gallery-intro__copy" v-reveal="{ delay: 0.1 }">
            <p class="lead">
              有些成都，不在攻略里。它是一盏刚亮起的灯笼，是茶桌上被风吹动的树叶，
              是熊猫抬头看你的一秒，是深夜街头一锅还没熄的火。
            </p>
            <div class="gallery-intro__count">
              <span>23</span>
              <p>帧城市切片<br />5 个影像分类<br />1 座城的呼吸</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="gallery-main section section--paper-2">
      <div class="container">
        <div class="gallery-toolbar">
          <div class="gallery-filters" role="tablist" aria-label="影像分类">
            <button
              v-for="category in galleryCategories"
              :key="category"
              type="button"
              class="gallery-filter"
              :class="{ active: activeCategory === category }"
              role="tab"
              :aria-selected="activeCategory === category"
              @click="activeCategory = category"
            >
              {{ category }} <span>{{ countFor(category) }}</span>
            </button>
          </div>
          <span class="gallery-toolbar__hint">点击影像 · 全屏浏览</span>
        </div>

        <div class="gallery-masonry" :class="{ 'gallery-masonry--filtered': activeCategory !== '全部' }">
          <button
            v-for="(item, index) in filteredItems"
            :key="item.id"
            type="button"
            class="gallery-card"
            :class="'gallery-card--' + item.aspect"
            :aria-label="'打开影像：' + item.title"
            v-reveal="{ delay: (index % 3) * 0.05, distance: 24 }"
            @click="openLightbox(item)"
          >
            <span class="gallery-card__media">
              <img :src="item.image" :alt="item.title" loading="lazy" />
            </span>
            <span class="gallery-card__shade"></span>
            <span class="gallery-card__top">
              <span>{{ item.category }}</span>
              <span>{{ String(index + 1).padStart(2, '0') }}</span>
            </span>
            <span class="gallery-card__body">
              <span class="gallery-card__location">{{ item.location }}</span>
              <span class="gallery-card__title">{{ item.title }}</span>
              <span class="gallery-card__en">{{ item.en }}</span>
            </span>
            <span class="gallery-card__open" aria-hidden="true">↗</span>
          </button>
        </div>
      </div>
    </section>

    <section class="gallery-story section">
      <div class="container">
        <div class="gallery-story__grid">
          <div class="gallery-story__media" v-reveal>
            <img :src="'images/jinli-courtyard.webp'" alt="锦里院落" loading="lazy" />
            <span class="gallery-story__stamp">光影<br />札记</span>
          </div>
          <div class="gallery-story__copy" v-reveal="{ delay: 0.1 }">
            <p class="eyebrow">STORY 01 · 灯亮起来的时候</p>
            <h2>灯亮起来的时候，<br /><em>城市才开始说话。</em></h2>
            <p class="gallery-story__lead">
              傍晚六点半，锦里的灯笼一盏接一盏亮起。白天的游客开始散去，石板路被灯光染成暖红色，
              卖糖画的老人还在原地，茶馆里的盖碗茶换了第二道水。
            </p>
            <p>
              这是成都一天里最柔软的时刻。城市没有真正安静下来，只是把声音调低了一点。
              你站在桥边，能听见水声、碗碟声，还有远处谁家店里传出的川剧唱腔。
            </p>
            <div class="gallery-story__meta">
              <span>地点 / 锦里</span>
              <span>时间 / 入夜</span>
              <span>关键词 / 灯笼、院落、烟火</span>
            </div>
            <RouterLink to="/explore?spot=jinli" class="text-link">走进锦里 <span>↗</span></RouterLink>
          </div>
        </div>
      </div>
    </section>

    <section class="gallery-quote">
      <div class="container">
        <p class="quote-mark">“</p>
        <blockquote>照片不是答案，<br />它只是让我们想起，曾经这样看见过成都。</blockquote>
        <span>蜀运 · 城市影像札记</span>
      </div>
    </section>

    <section class="gallery-outro">
      <div class="container gallery-outro__inner" v-reveal>
        <p class="eyebrow">THE END IS ANOTHER BEGINNING</p>
        <h2>再看一眼成都，<br /><em>然后出发。</em></h2>
        <div class="gallery-outro__actions">
          <RouterLink to="/travel" class="btn btn--light">规划下一次出发 <span class="btn__arrow"></span></RouterLink>
          <RouterLink to="/" class="hero-link hero-link--light">回到首页 <span>↗</span></RouterLink>
        </div>
      </div>
    </section>

    <GalleryLightbox
      v-model:index="activeIndex"
      :items="filteredItems"
      :open="lightboxOpen"
      @close="closeLightbox"
    />
  </div>
</template>

<style scoped>
.gallery-intro {
  background:
    radial-gradient(circle at 92% 10%, rgba(201, 163, 92, 0.12), transparent 30%),
    var(--paper);
}

.gallery-intro__grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: clamp(50px, 9vw, 140px);
  align-items: start;
}

.gallery-intro h2 {
  margin-top: 22px;
  font-size: clamp(2.7rem, 5vw, 5.4rem);
  line-height: 1.2;
}

.gallery-intro h2 em {
  font-style: normal;
  color: var(--red);
}

.gallery-intro__copy {
  padding-top: 30px;
}

.gallery-intro__count {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  margin-top: 30px;
  padding-top: 24px;
  border-top: 1px solid var(--line);
}

.gallery-intro__count > span {
  font-family: var(--font-display);
  font-size: clamp(3.2rem, 5vw, 5.2rem);
  font-weight: 300;
  line-height: 0.8;
  color: var(--red);
}

.gallery-intro__count p {
  color: var(--muted);
  font-size: 10px;
  line-height: 2;
  letter-spacing: 0.06em;
}

.gallery-main {
  background:
    linear-gradient(180deg, rgba(245, 240, 230, 0.35), transparent 16%),
    var(--paper-2);
}

.gallery-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 0 0 18px;
  border-bottom: 1px solid var(--line);
}

.gallery-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.gallery-filter {
  padding: 8px 12px;
  border: 1px solid transparent;
  color: var(--muted);
  font-size: 11px;
  letter-spacing: 0.06em;
  transition: color 0.3s var(--ease), border-color 0.3s var(--ease), background 0.3s var(--ease);
}

.gallery-filter span {
  margin-left: 4px;
  font-family: var(--font-display);
  font-size: 9px;
  opacity: 0.5;
}

.gallery-filter:hover {
  color: var(--ink);
}

.gallery-filter.active {
  border-color: var(--red);
  background: var(--red);
  color: var(--paper);
}

.gallery-toolbar__hint {
  flex: 0 0 auto;
  color: var(--muted);
  font-size: 9px;
  letter-spacing: 0.1em;
}

.gallery-masonry {
  columns: 3;
  column-gap: 20px;
  margin-top: 26px;
}

.gallery-masonry--filtered {
  columns: 2;
}

.gallery-card {
  position: relative;
  display: block;
  break-inside: avoid;
  width: 100%;
  margin-bottom: 20px;
  overflow: hidden;
  color: var(--paper);
  text-align: left;
  isolation: isolate;
  cursor: zoom-in;
}

.gallery-card__media {
  display: block;
  width: 100%;
  overflow: hidden;
}

.gallery-card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 1.25s var(--ease), filter 1.25s var(--ease);
}

.gallery-card--wide .gallery-card__media {
  aspect-ratio: 4 / 3;
}

.gallery-card--tall .gallery-card__media {
  aspect-ratio: 3 / 4;
}

.gallery-card--square .gallery-card__media {
  aspect-ratio: 1 / 1;
}

.gallery-card:hover .gallery-card__media img {
  transform: scale(1.045);
  filter: saturate(1.07);
}

.gallery-card__shade {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(10, 14, 14, 0.2) 22%, transparent 52%, rgba(10, 14, 14, 0.82) 100%);
}

.gallery-card__top {
  position: absolute;
  top: 14px;
  left: 14px;
  right: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: rgba(245, 240, 230, 0.64);
  font-family: var(--font-display);
  font-size: 8px;
  letter-spacing: 0.14em;
}

.gallery-card__top span:first-child {
  padding: 4px 7px;
  border: 1px solid rgba(245, 240, 230, 0.26);
  font-family: var(--font-sans);
  font-size: 8px;
}

.gallery-card__body {
  position: absolute;
  left: 16px;
  right: 44px;
  bottom: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.gallery-card__location {
  color: var(--gold-2);
  font-size: 8px;
  letter-spacing: 0.12em;
}

.gallery-card__title {
  margin-top: 4px;
  font-family: var(--font-serif);
  font-size: clamp(1.1rem, 1.6vw, 1.5rem);
  line-height: 1.3;
}

.gallery-card__en {
  margin-top: 1px;
  color: rgba(245, 240, 230, 0.36);
  font-family: var(--font-display);
  font-size: 7px;
  letter-spacing: 0.1em;
}

.gallery-card__open {
  position: absolute;
  right: 14px;
  bottom: 14px;
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border: 1px solid rgba(245, 240, 230, 0.4);
  border-radius: 50%;
  color: var(--gold-2);
  font-size: 12px;
  opacity: 0;
  transform: translateY(-4px);
  transition: opacity 0.3s var(--ease), transform 0.3s var(--ease);
}

.gallery-card:hover .gallery-card__open {
  opacity: 1;
  transform: translateY(0);
}

/* story */
.gallery-story {
  background: var(--paper);
}

.gallery-story__grid {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: clamp(44px, 8vw, 120px);
  align-items: center;
}

.gallery-story__media {
  position: relative;
  height: clamp(430px, 51vw, 680px);
  overflow: hidden;
}

.gallery-story__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 1.3s var(--ease);
}

.gallery-story__media:hover img {
  transform: scale(1.03);
}

.gallery-story__stamp {
  position: absolute;
  right: 20px;
  top: 20px;
  display: grid;
  place-items: center;
  width: 58px;
  height: 58px;
  background: var(--red);
  color: var(--gold-3);
  font-family: var(--font-serif);
  font-size: 12px;
  line-height: 1.5;
  text-align: center;
}

.gallery-story__copy h2 {
  margin-top: 20px;
  font-size: clamp(2.2rem, 4vw, 4.2rem);
  line-height: 1.3;
}

.gallery-story__copy h2 em {
  font-style: normal;
  color: var(--red);
}

.gallery-story__lead {
  margin-top: 24px;
  color: var(--ink);
  font-family: var(--font-serif);
  font-size: clamp(1rem, 1.4vw, 1.15rem);
  line-height: 2;
}

.gallery-story__copy > p:not(.eyebrow):not(.gallery-story__lead) {
  margin-top: 14px;
  color: var(--muted);
  font-size: 13px;
  line-height: 2.05;
}

.gallery-story__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 14px 24px;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid var(--line);
  color: var(--muted);
  font-size: 9px;
  letter-spacing: 0.05em;
}

.gallery-story__copy .text-link {
  margin-top: 24px;
  color: var(--red);
}

/* quote */
.gallery-quote {
  padding: clamp(88px, 11vw, 140px) 0;
  background:
    radial-gradient(circle at 15% 50%, rgba(201, 163, 92, 0.15), transparent 33%),
    var(--green-deep);
  color: var(--paper);
  text-align: center;
}

.gallery-quote .quote-mark {
  color: var(--gold-2);
}

.gallery-quote blockquote {
  max-width: 850px;
  margin: 10px auto 0;
  font-family: var(--font-serif);
  font-size: clamp(1.7rem, 3.4vw, 3.3rem);
  line-height: 1.55;
}

.gallery-quote span {
  display: block;
  margin-top: 20px;
  color: rgba(245, 240, 230, 0.38);
  font-size: 9px;
  letter-spacing: 0.16em;
}

/* outro */
.gallery-outro {
  position: relative;
  overflow: hidden;
  padding: clamp(92px, 12vw, 150px) 0;
  color: var(--paper);
  background:
    radial-gradient(circle at 85% 20%, rgba(201, 163, 92, 0.15), transparent 30%),
    var(--red);
}

.gallery-outro .eyebrow {
  color: var(--gold-2);
}

.gallery-outro h2 {
  margin-top: 22px;
  font-size: clamp(2.8rem, 5.8vw, 6rem);
  line-height: 1.16;
}

.gallery-outro h2 em {
  font-style: normal;
  color: var(--gold-2);
}

.gallery-outro__actions {
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
  .gallery-intro__grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .gallery-intro__copy {
    padding-top: 0;
  }

  .gallery-masonry {
    columns: 2;
  }
}

@media (max-width: 820px) {
  .gallery-story__grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .gallery-story__media {
    height: 430px;
  }
}

@media (max-width: 720px) {
  .gallery-intro h2 {
    font-size: 2.3rem;
  }

  .gallery-toolbar {
    align-items: flex-start;
    flex-direction: column;
    gap: 8px;
  }

  .gallery-filters {
    flex-wrap: nowrap;
    width: 100%;
    overflow-x: auto;
    scrollbar-width: none;
  }

  .gallery-filters::-webkit-scrollbar {
    display: none;
  }

  .gallery-filter {
    flex: 0 0 auto;
    padding: 7px 10px;
  }

  .gallery-toolbar__hint {
    display: none;
  }

  .gallery-masonry {
    columns: 2;
    column-gap: 12px;
    margin-top: 18px;
  }

  .gallery-card {
    margin-bottom: 12px;
  }

  .gallery-card__body {
    left: 11px;
    right: 36px;
    bottom: 11px;
  }

  .gallery-card__top {
    top: 10px;
    left: 10px;
    right: 10px;
  }

  .gallery-card__en {
    display: none;
  }

  .gallery-card__title {
    font-size: 1rem;
  }

  .gallery-card__open {
    right: 10px;
    bottom: 10px;
  }

  .gallery-story__media {
    height: 340px;
  }

  .gallery-story__copy h2 {
    font-size: 2.1rem;
  }

  .gallery-story__meta {
    flex-direction: column;
    gap: 5px;
  }

  .gallery-quote blockquote {
    font-size: 1.6rem;
  }

  .gallery-outro h2 {
    font-size: 2.6rem;
  }
}

@media (max-width: 420px) {
  .gallery-masonry {
    columns: 1;
  }

  .gallery-card__media {
    aspect-ratio: 4 / 3 !important;
  }

  .gallery-card__title {
    font-size: 1.2rem;
  }
}
</style>
