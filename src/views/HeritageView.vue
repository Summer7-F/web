<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import PageHero from '../components/PageHero.vue'
import SectionHead from '../components/SectionHead.vue'
import { timelineEras, heritageSites, crafts } from '../data/site'

const route = useRoute()
const activeEraId = ref(timelineEras[0].id)

const activeEra = computed(function () {
  return timelineEras.find(function (item) { return item.id === activeEraId.value }) || timelineEras[0]
})

function selectEra(id) {
  activeEraId.value = id
}

function applyQuery() {
  const era = route.query.era
  if (era && timelineEras.some(function (item) { return item.id === era })) {
    activeEraId.value = era
  }
}

watch(function () { return route.query.era }, applyQuery)
onMounted(applyQuery)
</script>

<template>
  <div class="heritage">
    <PageHero
      index="01"
      title="古蜀文脉"
      en="HISTORY & HERITAGE"
      intro="从金沙的神鸟，到三国的红墙；从杜甫的草堂，到川剧的一瞬千面。成都有三千年，不止一面。"
      image="/images/jinsha-mask.webp"
      image-position="center"
      theme="ink"
      :meta="['金沙遗址', '武侯祠', '川剧变脸']"
    />

    <section class="heritage-intro section">
      <span class="heritage-intro__ghost" aria-hidden="true">蜀</span>
      <div class="container">
        <div class="heritage-intro__grid">
          <div v-reveal>
            <p class="eyebrow">THE RIVER OF TIME · 时间之河</p>
            <h2>三千年，<br /><em>一座城的时间回声。</em></h2>
          </div>
          <div class="heritage-intro__copy" v-reveal="{ delay: 0.12 }">
            <p class="lead">
              成都的故事，不是一条笔直的路。它从金沙的太阳神鸟起飞，穿过蜀汉的祠堂、唐宋的诗行、明清的街巷，
              最后落在今天的一杯茶与一口火锅里。
            </p>
            <p>
              古蜀文明没有留下成体系的文字，却留下了金箔、青铜与象牙；三国英雄早已远去，红墙与柏树仍替他们站着；
              杜甫的茅屋被雨打湿过，也被一代代人重新修葺。文化不是博物馆里的标本，它一直在成都人的日常里继续生长。
            </p>
            <div class="heritage-intro__mark">
              <span class="seal">蜀</span>
              <p>一城烟火<br />千年蜀韵</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="heritage-timeline section section--ink">
      <div class="container">
        <SectionHead
          v-reveal
          num="01"
          label="TIME AXIS"
          en="FIVE CHAPTERS OF CHENGDU"
          title="时间轴上的成都"
          desc="点击不同历史节点，展开属于那个时代的图像与故事。"
        />

        <div class="timeline-layout">
          <div class="timeline-nav" role="tablist" aria-label="历史时期">
            <button
              v-for="(era, index) in timelineEras"
              :key="era.id"
              type="button"
              class="timeline-tab"
              :class="{ active: activeEraId === era.id }"
              role="tab"
              :aria-selected="activeEraId === era.id"
              @click="selectEra(era.id)"
            >
              <span class="timeline-tab__dot"></span>
              <span class="timeline-tab__index">0{{ index + 1 }}</span>
              <span class="timeline-tab__body">
                <span class="timeline-tab__years">{{ era.years }}</span>
                <strong>{{ era.label }}</strong>
              </span>
              <span class="timeline-tab__line" aria-hidden="true"></span>
            </button>
          </div>

          <div class="timeline-stage">
            <Transition name="era" mode="out-in">
              <article :key="activeEra.id" class="era">
                <div class="era__media">
                  <img :src="activeEra.image" :alt="activeEra.title" :style="{ objectPosition: activeEra.imagePosition }" loading="lazy" />
                  <span class="era__seal">{{ activeEra.label }}</span>
                </div>
                <div class="era__copy">
                  <p class="era__years">{{ activeEra.years }}</p>
                  <h3>{{ activeEra.title }}</h3>
                  <p class="era__en">{{ activeEra.en }}</p>
                  <p class="era__lead">{{ activeEra.lead }}</p>
                  <p class="era__body">{{ activeEra.body }}</p>
                  <div class="era__tags">
                    <span v-for="item in activeEra.highlights" :key="item">{{ item }}</span>
                  </div>
                  <blockquote>“{{ activeEra.quote }}”</blockquote>
                </div>
              </article>
            </Transition>
          </div>
        </div>
      </div>
    </section>

    <section class="heritage-sites section">
      <div class="container">
        <SectionHead
          v-reveal
          num="02"
          label="LANDMARKS"
          en="WHERE HISTORY STILL STANDS"
          title="遗迹之上，<em>文脉仍在</em>"
          desc="四处仍在呼吸的文化现场。它们不是过去式，而是成都人今天还会去的地方。"
        />

        <div class="sites-grid">
          <article
            v-for="(site, index) in heritageSites"
            :id="site.id"
            :key="site.id"
            class="site-card"
            :class="'site-card--' + (index + 1)"
            v-reveal="{ delay: index * 0.06, distance: 30 }"
          >
            <div class="site-card__media">
              <img :src="site.image" :alt="site.name" :style="{ objectPosition: site.imagePosition }" loading="lazy" />
            </div>
            <div class="site-card__shade" aria-hidden="true"></div>
            <div class="site-card__body">
              <span class="site-card__tag">{{ site.tag }}</span>
              <h3>{{ site.name }}</h3>
              <p class="site-card__en">{{ site.en }}</p>
              <p class="site-card__era">{{ site.era }}</p>
              <p class="site-card__text">{{ site.text }}</p>
              <RouterLink
                v-if="site.id === 'wuhou'"
                to="/explore?spot=wuhou"
                class="site-card__link"
              >在地图中查看 <span>↗</span></RouterLink>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="heritage-crafts section section--paper-2">
      <div class="container">
        <SectionHead
          v-reveal
          num="03"
          label="INTANGIBLE HERITAGE"
          en="CRAFTED BY HANDS"
          title="手上传承的成都"
          desc="川剧与蜀绣，一门在瞬间换脸，一门用一生走线。它们把成都的性格，留在舞台与丝线里。"
        />

        <div class="craft-list">
          <article
            v-for="(craft, index) in crafts"
            :key="craft.id"
            class="craft"
            :class="{ 'craft--reverse': index % 2 === 1 }"
            v-reveal
          >
            <div class="craft__media">
              <img :src="craft.image" :alt="craft.title" :style="{ objectPosition: craft.imagePosition }" loading="lazy" />
              <span class="craft__stamp">非遗</span>
            </div>
            <div class="craft__copy">
              <p class="kicker">{{ craft.kicker }}</p>
              <h3>{{ craft.title }}</h3>
              <p class="craft__en">{{ craft.en }}</p>
              <p class="craft__text">{{ craft.text }}</p>
              <div class="craft__facts">
                <span v-for="fact in craft.facts" :key="fact">{{ fact }}</span>
              </div>
              <blockquote>“{{ craft.quote }}”</blockquote>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="heritage-quote">
      <div class="container">
        <p class="quote-mark">“</p>
        <blockquote>锦城丝管日纷纷，半入江风半入云。</blockquote>
        <span>杜甫《赠花卿》</span>
        <div class="heritage-quote__actions">
          <RouterLink to="/explore" class="btn btn--light">走进今天的成都 <span class="btn__arrow"></span></RouterLink>
          <RouterLink to="/travel" class="hero-link">规划一条文脉路线 <span>↗</span></RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.heritage-intro {
  overflow: hidden;
  background:
    radial-gradient(circle at 88% 18%, rgba(201, 163, 92, 0.14), transparent 30%),
    var(--paper);
}

.heritage-intro__ghost {
  position: absolute;
  right: -2vw;
  top: -9vw;
  font-family: var(--font-brush);
  font-size: min(42vw, 560px);
  line-height: 1;
  color: rgba(130, 31, 38, 0.045);
  pointer-events: none;
}

.heritage-intro__grid {
  display: grid;
  grid-template-columns: 1fr 0.9fr;
  gap: clamp(50px, 9vw, 140px);
  align-items: start;
}

.heritage-intro h2 {
  margin-top: 22px;
  font-size: clamp(2.6rem, 4.8vw, 5rem);
  line-height: 1.28;
}

.heritage-intro h2 em {
  font-style: normal;
  color: var(--red);
}

.heritage-intro__copy {
  padding-top: 34px;
}

.heritage-intro__copy > p + p {
  margin-top: 22px;
  color: var(--muted);
  font-size: 14px;
  line-height: 2.1;
}

.heritage-intro__mark {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-top: 34px;
}

.heritage-intro__mark p {
  font-family: var(--font-serif);
  font-size: 12px;
  letter-spacing: 0.18em;
  line-height: 1.8;
  color: var(--muted);
}

/* timeline */
.heritage-timeline {
  background:
    radial-gradient(circle at 100% 0%, rgba(201, 163, 92, 0.1), transparent 33%),
    var(--ink);
}

.timeline-layout {
  display: grid;
  grid-template-columns: minmax(220px, 0.33fr) minmax(0, 1fr);
  gap: clamp(40px, 6vw, 90px);
  align-items: start;
}

.timeline-nav {
  position: sticky;
  top: calc(var(--header-h) + 42px);
  border-top: 1px solid var(--line-light);
}

.timeline-tab {
  position: relative;
  display: grid;
  grid-template-columns: 12px 26px 1fr;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 22px 0;
  border-bottom: 1px solid rgba(245, 240, 230, 0.13);
  color: rgba(245, 240, 230, 0.46);
  text-align: left;
  transition: color 0.35s var(--ease), padding 0.35s var(--ease);
}

.timeline-tab:hover {
  color: var(--paper);
}

.timeline-tab.active {
  color: var(--gold-2);
  padding-left: 8px;
}

.timeline-tab__dot {
  width: 6px;
  height: 6px;
  border: 1px solid currentColor;
  border-radius: 50%;
  transition: background 0.3s var(--ease), box-shadow 0.3s var(--ease);
}

.timeline-tab.active .timeline-tab__dot {
  background: var(--gold);
  border-color: var(--gold);
  box-shadow: 0 0 0 5px rgba(201, 163, 92, 0.12);
}

.timeline-tab__index {
  font-family: var(--font-display);
  font-size: 9px;
  letter-spacing: 0.1em;
  opacity: 0.5;
}

.timeline-tab__body {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
}

.timeline-tab__years {
  font-family: var(--font-display);
  font-size: 9px;
  letter-spacing: 0.06em;
  opacity: 0.6;
}

.timeline-tab__body strong {
  font-family: var(--font-serif);
  font-size: 1.2rem;
  font-weight: 400;
  letter-spacing: 0.08em;
}

.timeline-tab__line {
  position: absolute;
  right: 0;
  bottom: -1px;
  width: 0;
  height: 1px;
  background: var(--gold);
  transition: width 0.4s var(--ease);
}

.timeline-tab.active .timeline-tab__line {
  width: 100%;
}

.timeline-stage {
  min-height: 600px;
}

.era {
  display: grid;
  grid-template-columns: minmax(220px, 0.8fr) minmax(0, 1fr);
  gap: clamp(26px, 4vw, 56px);
  align-items: start;
}

.era__media {
  position: relative;
  height: 560px;
  overflow: hidden;
  background: var(--green-deep);
}

.era__media::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(0deg, rgba(10, 14, 14, 0.65), transparent 55%);
}

.era__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.era__seal {
  position: absolute;
  right: 16px;
  bottom: 16px;
  z-index: 1;
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  border: 1px solid rgba(229, 205, 148, 0.55);
  color: var(--gold-2);
  font-family: var(--font-serif);
  font-size: 14px;
  letter-spacing: 0.08em;
}

.era__copy {
  padding-top: 12px;
}

.era__years {
  color: var(--gold-2);
  font-family: var(--font-display);
  font-size: 12px;
  letter-spacing: 0.18em;
}

.era__copy h3 {
  margin-top: 18px;
  font-size: clamp(2rem, 3.3vw, 3.6rem);
  line-height: 1.3;
}

.era__en {
  margin-top: 10px;
  color: rgba(245, 240, 230, 0.38);
  font-family: var(--font-display);
  font-size: 11px;
  letter-spacing: 0.2em;
}

.era__lead {
  margin-top: 26px;
  color: var(--paper);
  font-family: var(--font-serif);
  font-size: 1rem;
  line-height: 1.9;
}

.era__body {
  margin-top: 14px;
  color: rgba(245, 240, 230, 0.56);
  font-size: 13px;
  line-height: 2.05;
}

.era__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 22px;
}

.era__tags span {
  padding: 4px 9px;
  border: 1px solid rgba(245, 240, 230, 0.22);
  color: rgba(245, 240, 230, 0.55);
  font-size: 9px;
  letter-spacing: 0.12em;
}

.era blockquote {
  margin-top: 28px;
  padding-top: 22px;
  border-top: 1px solid rgba(245, 240, 230, 0.16);
  color: var(--gold-2);
  font-family: var(--font-serif);
  font-size: 15px;
  line-height: 1.8;
}

.era-enter-active,
.era-leave-active {
  transition: opacity 0.4s var(--ease), transform 0.4s var(--ease);
}

.era-enter-from {
  opacity: 0;
  transform: translateY(14px);
}

.era-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* sites */
.heritage-sites {
  background: var(--paper);
}

.sites-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
}

.site-card {
  position: relative;
  min-height: 520px;
  overflow: hidden;
  grid-column: span 6;
  color: var(--paper);
  isolation: isolate;
}

.site-card--1,
.site-card--4 {
  grid-column: span 7;
}

.site-card--2,
.site-card--3 {
  grid-column: span 5;
}

.site-card__media {
  position: absolute;
  inset: 0;
  z-index: -2;
}

.site-card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 1.3s var(--ease);
}

.site-card:hover .site-card__media img {
  transform: scale(1.045);
}

.site-card__shade {
  position: absolute;
  inset: 0;
  z-index: -1;
  background: linear-gradient(180deg, rgba(10, 14, 14, 0.12) 20%, rgba(10, 14, 14, 0.86) 100%);
}

.site-card__body {
  position: absolute;
  left: clamp(20px, 2.4vw, 32px);
  right: clamp(20px, 2.4vw, 32px);
  bottom: clamp(20px, 2.6vw, 34px);
}

.site-card__tag {
  color: var(--gold-2);
  font-size: 9px;
  letter-spacing: 0.18em;
}

.site-card h3 {
  margin-top: 8px;
  font-size: clamp(2rem, 3.2vw, 3.4rem);
  font-weight: 500;
}

.site-card__en {
  margin-top: 4px;
  color: rgba(245, 240, 230, 0.44);
  font-family: var(--font-display);
  font-size: 10px;
  letter-spacing: 0.17em;
}

.site-card__era {
  margin-top: 14px;
  color: rgba(245, 240, 230, 0.65);
  font-size: 10px;
  letter-spacing: 0.08em;
}

.site-card__text {
  max-width: 530px;
  margin-top: 10px;
  color: rgba(245, 240, 230, 0.68);
  font-size: 12px;
  line-height: 1.9;
}

.site-card__link {
  display: inline-flex;
  gap: 8px;
  margin-top: 16px;
  padding-bottom: 3px;
  border-bottom: 1px solid rgba(229, 205, 148, 0.55);
  color: var(--gold-2);
  font-size: 9px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

/* crafts */
.heritage-crafts {
  background: var(--paper-2);
}

.craft-list {
  display: flex;
  flex-direction: column;
  gap: clamp(48px, 7vw, 92px);
}

.craft {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: clamp(34px, 6vw, 96px);
  align-items: center;
}

.craft--reverse {
  grid-template-columns: 0.85fr 1.15fr;
}

.craft--reverse .craft__media {
  order: 2;
}

.craft__media {
  position: relative;
  height: clamp(380px, 48vw, 640px);
  overflow: hidden;
  background: var(--ink);
}

.craft__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 1.3s var(--ease);
}

.craft:hover .craft__media img {
  transform: scale(1.035);
}

.craft__stamp {
  position: absolute;
  right: 18px;
  top: 18px;
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border: 1px solid rgba(229, 205, 148, 0.55);
  color: var(--gold-2);
  font-family: var(--font-serif);
  font-size: 12px;
  letter-spacing: 0.06em;
}

.craft__copy .kicker {
  color: var(--red);
}

.craft__copy h3 {
  margin-top: 16px;
  font-size: clamp(2.4rem, 4vw, 4.6rem);
  line-height: 1.2;
}

.craft__en {
  margin-top: 6px;
  color: var(--muted);
  font-family: var(--font-display);
  font-size: 11px;
  letter-spacing: 0.2em;
}

.craft__text {
  margin-top: 24px;
  color: var(--muted);
  font-size: 14px;
  line-height: 2.1;
}

.craft__facts {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 24px;
}

.craft__facts span {
  padding: 5px 9px;
  border: 1px solid var(--line);
  color: var(--muted);
  font-size: 9px;
  letter-spacing: 0.1em;
}

.craft__copy blockquote {
  margin-top: 28px;
  padding-top: 20px;
  border-top: 1px solid var(--line);
  color: var(--red);
  font-family: var(--font-serif);
  font-size: 15px;
  line-height: 1.8;
}

/* quote */
.heritage-quote {
  padding: clamp(85px, 11vw, 140px) 0;
  background:
    radial-gradient(circle at 10% 50%, rgba(201, 163, 92, 0.18), transparent 32%),
    var(--red);
  color: var(--paper);
  text-align: center;
}

.heritage-quote .quote-mark {
  color: var(--gold-2);
}

.heritage-quote blockquote {
  max-width: 920px;
  margin: 14px auto 0;
  font-family: var(--font-serif);
  font-size: clamp(1.8rem, 3.9vw, 4rem);
  line-height: 1.5;
  letter-spacing: 0.02em;
}

.heritage-quote > .container > span {
  display: block;
  margin-top: 20px;
  color: rgba(245, 240, 230, 0.52);
  font-size: 10px;
  letter-spacing: 0.18em;
}

.heritage-quote__actions {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 28px;
  margin-top: 40px;
}

.heritage-quote__actions .hero-link {
  color: rgba(245, 240, 230, 0.62);
}

@media (max-width: 1024px) {
  .heritage-intro__grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .heritage-intro__copy {
    max-width: 720px;
    padding-top: 0;
  }

  .timeline-layout {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .timeline-nav {
    position: static;
    display: flex;
    overflow-x: auto;
    border-top: 1px solid var(--line-light);
  }

  .timeline-tab {
    flex: 0 0 160px;
    grid-template-columns: 8px 22px 1fr;
    padding: 17px 12px 17px 0;
    border-bottom: 0;
    border-top: 1px solid transparent;
  }

  .timeline-tab.active {
    padding-left: 0;
    border-top-color: var(--gold);
  }

  .timeline-tab__body {
    align-items: flex-start;
    flex-direction: column;
    gap: 2px;
  }

  .era {
    grid-template-columns: 0.85fr 1fr;
  }

  .era__media {
    height: 500px;
  }
}

@media (max-width: 800px) {
  .sites-grid {
    display: block;
  }

  .site-card {
    min-height: 460px;
    margin-bottom: 18px;
  }

  .craft,
  .craft--reverse {
    grid-template-columns: 1fr;
    gap: 26px;
  }

  .craft--reverse .craft__media {
    order: 0;
  }

  .craft__media {
    height: 440px;
  }
}

@media (max-width: 720px) {
  .heritage-intro h2 {
    font-size: 2.2rem;
  }

  .heritage-intro__mark {
    margin-top: 26px;
  }

  .timeline-stage {
    min-height: 0;
  }

  .era {
    grid-template-columns: 1fr;
  }

  .era__media {
    height: 320px;
  }

  .era__copy h3 {
    font-size: 2rem;
  }

  .site-card {
    min-height: 420px;
  }

  .site-card h3 {
    font-size: 2rem;
  }

  .craft__media {
    height: 360px;
  }

  .craft__copy h3 {
    font-size: 2.3rem;
  }

  .heritage-quote blockquote {
    font-size: 1.7rem;
  }

  .heritage-quote__actions {
    align-items: flex-start;
    flex-direction: column;
    gap: 18px;
    padding-left: 8px;
    text-align: left;
  }
}
</style>
