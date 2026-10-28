<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHead from '../components/SectionHead.vue'
import {
  themeCards,
  stats,
  travelRoutes,
  galleryItems,
  homeGalleryIds
} from '../data/site'

gsap.registerPlugin(ScrollTrigger)

const heroRef = ref(null)
let heroContext = null

const homeGallery = computed(function () {
  return homeGalleryIds.map(function (id) {
    return galleryItems.find(function (item) { return item.id === id })
  }).filter(Boolean)
})

const featuredRoutes = computed(function () {
  return [travelRoutes[0], travelRoutes[2], travelRoutes[4]]
})

const stripImages = [
  { src: '/images/jinli-lanterns.webp', alt: '锦里灯笼' },
  { src: '/images/peoples-park-2.webp', alt: '人民公园茶客' },
  { src: '/images/panda-close.webp', alt: '大熊猫' },
  { src: '/images/night-market.webp', alt: '建设路夜市' },
  { src: '/images/opera-mask.webp', alt: '川剧变脸' },
  { src: '/images/ginkgo-avenue.webp', alt: '成都银杏' },
  { src: '/images/eastmemory-1.webp', alt: '东郊记忆' }
]

function scrollToIntro() {
  const target = document.getElementById('city-intro')
  if (target) target.scrollIntoView({ behavior: 'smooth' })
}

onMounted(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  heroContext = gsap.context(function () {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.from('.home-hero__topline', { y: -12, opacity: 0, duration: 0.9 })
      .from('.home-hero__eyebrow', { y: 18, opacity: 0, duration: 0.8 }, '-=0.35')
      .from('.home-hero__char', { yPercent: 120, opacity: 0, stagger: 0.12, duration: 1.15 }, '-=0.45')
      .from('.home-hero__seal', { scale: 0.6, rotate: -12, opacity: 0, duration: 0.8 }, '-=0.5')
      .from('.home-hero__en, .home-hero__slogan, .home-hero__lede, .home-hero__actions', {
        y: 24,
        opacity: 0,
        stagger: 0.09,
        duration: 0.85
      }, '-=0.55')
      .from('.home-hero__aside, .home-hero__scroll, .home-hero__count', {
        opacity: 0,
        duration: 0.8,
        stagger: 0.1
      }, '-=0.5')

    gsap.to('.home-hero__media img', {
      scale: 1.08,
      yPercent: 5,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.value,
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      }
    })
  }, heroRef.value)
})

onBeforeUnmount(function () {
  if (heroContext) heroContext.revert()
})
</script>

<template>
  <div class="home">
    <section ref="heroRef" class="home-hero">
      <div class="home-hero__media">
        <img
          src="/images/hero-bridge.webp"
          alt="蓝调时刻的成都安顺廊桥与锦江倒影"
          fetchpriority="high"
        />
      </div>
      <div class="home-hero__veil" aria-hidden="true"></div>
      <div class="home-hero__frame" aria-hidden="true"></div>

      <div class="home-hero__topline">
        <span>CHENGDU · SICHUAN · CHINA</span>
        <span class="home-hero__coords">30.67°N / 104.06°E</span>
        <span>EST. 2300 YEARS</span>
      </div>

      <div class="home-hero__content">
        <p class="home-hero__eyebrow">
          <span></span>
          DISCOVER CHENGDU · 城市文化入口
        </p>

        <div class="home-hero__heading">
          <h1 aria-label="蜀运">
            <span class="home-hero__char" aria-hidden="true">蜀</span>
            <span class="home-hero__char" aria-hidden="true">运</span>
          </h1>
          <span class="home-hero__seal" aria-hidden="true">成都<br /><i>CHENGDU</i></span>
        </div>

        <p class="home-hero__en">SHU YUN</p>
        <p class="home-hero__slogan">一城烟火 · 千年蜀韵</p>
        <p class="home-hero__lede">
          入蜀境，见成都。<br />
          在烟火与诗意之间，读懂一座城。
        </p>

        <div class="home-hero__actions">
          <button type="button" class="hero-cta" @click="scrollToIntro">
            <span>开启蜀城之旅</span>
            <i aria-hidden="true">↓</i>
          </button>
          <RouterLink to="/travel" class="hero-link">
            <span>查看游蜀指南</span>
            <i aria-hidden="true">↗</i>
          </RouterLink>
        </div>
      </div>

      <aside class="home-hero__aside" aria-hidden="true">
        <span>天府之国</span>
        <i></i>
        <span>锦官城</span>
        <i></i>
        <span>雪山下的公园城市</span>
      </aside>

      <div class="home-hero__bottom">
        <span class="home-hero__scroll">SCROLL TO ENTER</span>
        <span class="home-hero__count">城市画卷 · 01 / 07</span>
      </div>

      <div class="home-hero__marquee" aria-hidden="true">
        <div class="home-hero__marquee-track">
          <span>DISCOVER CHENGDU</span><i>·</i>
          <span>天府之国</span><i>·</i>
          <span>一城烟火</span><i>·</i>
          <span>千年蜀韵</span><i>·</i>
          <span>PARK CITY</span><i>·</i>
          <span>锦官城</span><i>·</i>
          <span>DISCOVER CHENGDU</span><i>·</i>
          <span>天府之国</span><i>·</i>
          <span>一城烟火</span><i>·</i>
          <span>千年蜀韵</span><i>·</i>
          <span>PARK CITY</span><i>·</i>
          <span>锦官城</span><i>·</i>
        </div>
      </div>
    </section>

    <section id="city-intro" class="home-intro section">
      <span class="home-intro__ghost" aria-hidden="true">成</span>
      <div class="container">
        <div class="home-intro__grid">
          <div class="home-intro__title" v-reveal>
            <p class="eyebrow">ABOUT CHENGDU · 城市序章</p>
            <h2>
              九天开出一成都，<br />
              <em>万户千门入画图。</em>
            </h2>
            <p class="home-intro__source">李白《上皇西巡南京歌》</p>
          </div>

          <div class="home-intro__copy" v-reveal="{ delay: 0.12 }">
            <p class="lead">
              成都是泡在茶里的，也是滚在红汤里的；是杜甫笔下的花重锦官城，也是深夜街边的一把竹签。
              它不急着向你证明什么，只是把三千年的光阴，慢慢摊开在街巷、河桥与一日三餐之间。
            </p>
            <p class="home-intro__small">
              蜀运以六个章节，串起这座城市的古与今。你可以从一面金箔、一条巷子、一口火锅开始，
              也可以什么都不做，先坐下来喝一碗茶。
            </p>
            <RouterLink to="/heritage" class="text-link home-intro__link">
              从古蜀文脉开始 <span>↗</span>
            </RouterLink>
          </div>
        </div>

        <div class="home-stats" v-reveal>
          <div v-for="item in stats" :key="item.label" class="home-stat">
            <p class="home-stat__value">{{ item.value }}<small>{{ item.unit }}</small></p>
            <p class="home-stat__label">{{ item.label }}</p>
            <span>{{ item.en }}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="home-themes section section--paper-2">
      <div class="container">
        <SectionHead
          v-reveal
          num="01 — 06"
          label="六境成都"
          en="SIX FACETS OF CHENGDU"
          title="六境成都，<em>各有风华</em>"
          desc="历史、街巷、味觉、自然、旅途与影像，六个入口，通向同一座城的不同侧面。"
        />

        <div class="theme-grid">
          <RouterLink
            v-for="(card, index) in themeCards"
            :key="card.id"
            :to="card.path"
            class="theme-card"
            :class="'theme-card--' + card.size"
            v-reveal="{ delay: index * 0.06, distance: 30 }"
          >
            <div class="theme-card__media">
              <img :src="card.image" :alt="card.title" loading="lazy" />
            </div>
            <div class="theme-card__shade" aria-hidden="true"></div>
            <div class="theme-card__top">
              <span>{{ card.num }}</span>
              <span>{{ card.en }}</span>
            </div>
            <div class="theme-card__body">
              <div class="theme-card__tags">
                <span v-for="tag in card.tags" :key="tag">{{ tag }}</span>
              </div>
              <div class="theme-card__title-row">
                <h3>{{ card.title }}</h3>
                <span class="theme-card__arrow" aria-hidden="true">↗</span>
              </div>
              <p>{{ card.desc }}</p>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>

    <section class="home-strip" aria-label="成都城市切片">
      <div class="home-strip__head container">
        <p class="eyebrow">CITY FRAGMENTS · 城市切片</p>
        <span>一帧一帧，都是成都</span>
      </div>
      <div class="home-strip__viewport">
        <div class="home-strip__track">
          <figure v-for="(item, index) in stripImages" :key="'a' + index" class="strip-frame">
            <img :src="item.src" :alt="item.alt" loading="lazy" />
          </figure>
          <figure v-for="(item, index) in stripImages" :key="'b' + index" class="strip-frame" aria-hidden="true">
            <img :src="item.src" :alt="item.alt" loading="lazy" />
          </figure>
        </div>
      </div>
    </section>

    <section class="home-routes section section--green">
      <div class="home-routes__wash" aria-hidden="true"></div>
      <div class="container">
        <div class="home-routes__grid">
          <div class="home-routes__intro" v-reveal>
            <p class="eyebrow">WALK THE CITY · 游蜀指南</p>
            <h2>把成都，<br /><em>走成一条线。</em></h2>
            <p>
              不赶路，也不错过。我们替你排好了几种走法：
              一日看老城，两日读古蜀，三日把山水与烟火都收进去。
            </p>
            <div class="home-routes__meta">
              <span>01 / 02 / 03 DAYS</span>
              <span>按偏好筛选 →</span>
            </div>
            <RouterLink to="/travel" class="btn btn--gold">
              定制我的路线 <span class="btn__arrow"></span>
            </RouterLink>
          </div>

          <div class="home-routes__list">
            <RouterLink
              v-for="(route, index) in featuredRoutes"
              :key="route.id"
              :to="'/travel?route=' + route.id"
              class="route-row"
              v-reveal="{ delay: index * 0.08, distance: 24 }"
            >
              <span class="route-row__index">0{{ index + 1 }}</span>
              <div class="route-row__body">
                <div class="route-row__top">
                  <span>{{ route.days }} DAY{{ route.days > 1 ? 'S' : '' }}</span>
                  <span>{{ route.pace }}</span>
                </div>
                <h3>{{ route.title }}</h3>
                <p>{{ route.subtitle }}</p>
                <div class="route-row__tags">
                  <span v-for="tag in route.tags" :key="tag">{{ tag }}</span>
                </div>
              </div>
              <span class="route-row__arrow" aria-hidden="true">↗</span>
            </RouterLink>
          </div>
        </div>

        <div class="home-routes__quote" v-reveal>
          <span>“</span>
          <p>旅行不是抵达，而是把日子过慢。</p>
          <i></i>
        </div>
      </div>
    </section>

    <section class="home-gallery section">
      <div class="container">
        <SectionHead
          v-reveal
          num="07"
          label="蜀城光影"
          en="FRAMES OF CHENGDU"
          title="镜头里的成都"
          desc="从廊桥的蓝调时刻，到茶桌上的一个下午。城市在光里，也在人身上。"
        >
          <template #aside>
            <RouterLink to="/gallery" class="text-link">进入影像馆 <span>↗</span></RouterLink>
          </template>
        </SectionHead>

        <div class="home-gallery__grid">
          <RouterLink
            v-for="(item, index) in homeGallery"
            :key="item.id"
            :to="'/gallery?photo=' + item.id"
            class="home-gallery__item"
            :class="'home-gallery__item--' + (index + 1)"
            v-reveal="{ delay: index * 0.045, distance: 28 }"
          >
            <img :src="item.image" :alt="item.title" loading="lazy" />
            <div class="home-gallery__shade" aria-hidden="true"></div>
            <div class="home-gallery__caption">
              <span>{{ item.category }} · {{ item.location }}</span>
              <h3>{{ item.title }}</h3>
            </div>
            <span class="home-gallery__arrow" aria-hidden="true">↗</span>
          </RouterLink>
        </div>
      </div>
    </section>

    <section class="home-outro">
      <div class="home-outro__bg">
        <img src="/images/anshun-gold.webp" alt="暮色中的安顺廊桥" loading="lazy" />
      </div>
      <div class="home-outro__veil" aria-hidden="true"></div>
      <div class="container home-outro__inner">
        <p class="eyebrow">THE CITY IS WAITING</p>
        <h2>来成都，<br /><em>把日子过成诗。</em></h2>
        <div class="home-outro__bottom">
          <p>下一次假期，把成都排进去。<br />剩下的，交给一条巷子、一口火锅和一场慢雨。</p>
          <div class="home-outro__actions">
            <RouterLink to="/travel" class="btn btn--light">开始规划 <span class="btn__arrow"></span></RouterLink>
            <RouterLink to="/explore" class="hero-link hero-link--light">先逛一逛 <span>↗</span></RouterLink>
          </div>
        </div>
        <div class="home-outro__word" aria-hidden="true">CHENGDU</div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-hero {
  position: relative;
  min-height: 100svh;
  overflow: hidden;
  background: var(--ink);
  color: var(--paper);
  display: flex;
  align-items: flex-end;
}

.home-hero__media {
  position: absolute;
  inset: -2%;
  z-index: 0;
  overflow: hidden;
}

.home-hero__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 54%;
  filter: saturate(0.82) contrast(1.03);
}

.home-hero__veil {
  position: absolute;
  inset: 0;
  z-index: 1;
  background:
    linear-gradient(90deg, rgba(10, 15, 15, 0.78) 0%, rgba(10, 15, 15, 0.3) 48%, rgba(10, 15, 15, 0.28) 100%),
    linear-gradient(0deg, rgba(10, 15, 15, 0.87) 0%, rgba(10, 15, 15, 0.12) 46%, rgba(10, 15, 15, 0.56) 100%);
}

.home-hero__frame {
  position: absolute;
  inset: 24px;
  z-index: 2;
  border: 1px solid rgba(245, 240, 230, 0.17);
  pointer-events: none;
}

.home-hero__frame::before,
.home-hero__frame::after {
  content: "";
  position: absolute;
  width: 18px;
  height: 18px;
  border-color: var(--gold);
  border-style: solid;
}

.home-hero__frame::before {
  top: -1px;
  left: -1px;
  border-width: 1px 0 0 1px;
}

.home-hero__frame::after {
  right: -1px;
  bottom: -1px;
  border-width: 0 1px 1px 0;
}

.home-hero__topline {
  position: absolute;
  top: calc(var(--header-h) + 20px);
  left: 50%;
  z-index: 3;
  width: min(1540px, calc(100vw - 72px));
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding-top: 18px;
  border-top: 1px solid rgba(245, 240, 230, 0.15);
  color: rgba(245, 240, 230, 0.52);
  font-family: var(--font-display);
  font-size: 10px;
  letter-spacing: 0.2em;
}

.home-hero__coords {
  color: rgba(229, 205, 148, 0.72);
}

.home-hero__content {
  position: relative;
  z-index: 3;
  width: var(--container);
  margin-inline: auto;
  padding-top: 130px;
  padding-bottom: clamp(96px, 13vh, 156px);
}

.home-hero__eyebrow {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 24px;
  color: rgba(245, 240, 230, 0.68);
  font-size: 10px;
  letter-spacing: 0.26em;
  text-transform: uppercase;
}

.home-hero__eyebrow span {
  width: 44px;
  height: 1px;
  background: var(--gold);
}

.home-hero__heading {
  display: flex;
  align-items: flex-start;
  gap: clamp(20px, 3vw, 48px);
}

.home-hero h1 {
  display: flex;
  font-size: clamp(6rem, 17vw, 18rem);
  font-weight: 500;
  line-height: 0.82;
  letter-spacing: -0.08em;
  text-indent: -0.08em;
  text-shadow: 0 30px 90px rgba(0, 0, 0, 0.24);
}

.home-hero__char {
  display: inline-block;
}

.home-hero__char + .home-hero__char {
  margin-left: 0.04em;
  color: var(--gold-3);
}

.home-hero__seal {
  flex: 0 0 auto;
  margin-top: clamp(6px, 1vw, 18px);
  padding: 11px 10px 9px;
  border: 1px solid rgba(130, 31, 38, 0.55);
  background: var(--red);
  color: var(--gold-3);
  font-family: var(--font-serif);
  font-size: 16px;
  line-height: 1.25;
  letter-spacing: 0.12em;
  text-align: center;
  box-shadow: inset 0 0 0 3px var(--red), inset 0 0 0 4px rgba(229, 205, 148, 0.55);
  transform: rotate(3deg);
}

.home-hero__seal i {
  display: block;
  margin-top: 5px;
  font-family: var(--font-display);
  font-size: 6px;
  font-style: normal;
  letter-spacing: 0.12em;
  opacity: 0.7;
}

.home-hero__en {
  margin-top: 16px;
  font-family: var(--font-display);
  font-size: clamp(1.1rem, 2.1vw, 1.7rem);
  letter-spacing: 0.52em;
  color: rgba(245, 240, 230, 0.76);
}

.home-hero__slogan {
  margin-top: 26px;
  padding-top: 24px;
  border-top: 1px solid rgba(245, 240, 230, 0.22);
  max-width: 510px;
  color: var(--gold-2);
  font-family: var(--font-serif);
  font-size: clamp(0.95rem, 1.3vw, 1.15rem);
  letter-spacing: 0.24em;
}

.home-hero__lede {
  max-width: 430px;
  margin-top: 17px;
  color: rgba(245, 240, 230, 0.64);
  font-size: 14px;
  line-height: 2;
}

.home-hero__actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 28px;
  margin-top: 34px;
}

.hero-cta {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 34px;
  min-width: 224px;
  padding: 15px 18px 15px 22px;
  border: 1px solid rgba(229, 205, 148, 0.52);
  color: var(--gold-2);
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  transition: background 0.4s var(--ease), color 0.4s var(--ease);
}

.hero-cta i {
  font-style: normal;
  font-size: 14px;
  transition: transform 0.35s var(--ease);
}

.hero-cta:hover {
  background: var(--gold);
  color: var(--ink);
}

.hero-cta:hover i {
  transform: translateY(3px);
}

.hero-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: rgba(245, 240, 230, 0.62);
  font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  transition: color 0.3s var(--ease);
}

.hero-link i {
  font-style: normal;
  color: var(--gold);
}

.hero-link:hover {
  color: var(--paper);
}

.home-hero__aside {
  position: absolute;
  top: 50%;
  right: max(40px, calc((100vw - 1540px) / 2));
  z-index: 3;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 15px;
  writing-mode: vertical-rl;
  color: rgba(245, 240, 230, 0.44);
  font-family: var(--font-serif);
  font-size: 10px;
  letter-spacing: 0.32em;
}

.home-hero__aside i {
  width: 1px;
  height: 28px;
  background: rgba(229, 205, 148, 0.4);
}

.home-hero__bottom {
  position: absolute;
  left: 50%;
  bottom: 58px;
  z-index: 3;
  transform: translateX(-50%);
  width: min(1540px, calc(100vw - 72px));
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  color: rgba(245, 240, 230, 0.42);
  font-size: 9px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.home-hero__scroll {
  display: inline-flex;
  align-items: center;
  gap: 13px;
}

.home-hero__scroll::before {
  content: "";
  width: 1px;
  height: 36px;
  background: var(--gold-2);
  animation: scroll-pulse 1.8s ease-in-out infinite;
}

.home-hero__marquee {
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 4;
  width: 100%;
  overflow: hidden;
  border-top: 1px solid rgba(245, 240, 230, 0.16);
  background: rgba(11, 15, 15, 0.28);
  backdrop-filter: blur(6px);
}

.home-hero__marquee-track {
  display: flex;
  width: max-content;
  align-items: center;
  gap: 24px;
  padding: 12px 0;
  animation: marquee 38s linear infinite;
  color: rgba(245, 240, 230, 0.46);
  font-family: var(--font-display);
  font-size: 10px;
  letter-spacing: 0.26em;
  text-transform: uppercase;
}

.home-hero__marquee-track i {
  color: var(--gold);
  font-style: normal;
  opacity: 0.65;
}

@keyframes marquee {
  to {
    transform: translateX(-50%);
  }
}

/* ---------- intro ---------- */
.home-intro {
  overflow: hidden;
  background:
    radial-gradient(circle at 93% 18%, rgba(201, 163, 92, 0.12), transparent 27%),
    var(--paper);
}

.home-intro__ghost {
  position: absolute;
  right: -3vw;
  top: -4vw;
  font-family: var(--font-brush);
  font-size: min(39vw, 480px);
  line-height: 1;
  color: rgba(130, 31, 38, 0.045);
  pointer-events: none;
}

.home-intro__grid {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(300px, 0.8fr);
  gap: clamp(50px, 9vw, 150px);
  align-items: end;
}

.home-intro h2 {
  margin-top: 22px;
  font-size: clamp(2.4rem, 4.4vw, 4.6rem);
  line-height: 1.4;
  letter-spacing: -0.045em;
}

.home-intro h2 em {
  font-style: normal;
  color: var(--red);
}

.home-intro__source {
  margin-top: 22px;
  color: var(--muted);
  font-size: 10px;
  letter-spacing: 0.18em;
}

.home-intro__copy {
  padding-bottom: 4px;
}

.home-intro__small {
  margin-top: 22px;
  color: var(--muted);
  font-size: 14px;
  line-height: 2.1;
}

.home-intro__link {
  margin-top: 28px;
  color: var(--red);
}

.home-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-top: clamp(62px, 8vw, 110px);
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}

.home-stat {
  padding: 30px 28px 28px 0;
  border-right: 1px solid var(--line);
}

.home-stat:not(:first-child) {
  padding-left: 28px;
}

.home-stat:last-child {
  border-right: 0;
}

.home-stat__value {
  display: flex;
  align-items: baseline;
  gap: 4px;
  font-family: var(--font-display);
  font-size: clamp(2.6rem, 4vw, 4.2rem);
  font-weight: 300;
  line-height: 1;
  color: var(--red);
}

.home-stat__value small {
  font-family: var(--font-serif);
  font-size: 12px;
  font-weight: 400;
  color: var(--ink);
}

.home-stat__label {
  margin-top: 12px;
  font-family: var(--font-serif);
  font-size: 14px;
  color: var(--ink);
}

.home-stat > span {
  display: block;
  margin-top: 4px;
  color: var(--muted);
  font-family: var(--font-display);
  font-size: 9px;
  letter-spacing: 0.16em;
}

/* ---------- theme cards ---------- */
.home-themes {
  background:
    linear-gradient(180deg, rgba(245, 240, 230, 0.28), transparent 22%),
    var(--paper-2);
}

.theme-grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  grid-template-rows: 365px 365px 410px;
  gap: 24px;
}

.theme-card {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 0;
  padding: clamp(20px, 2.2vw, 30px);
  color: var(--paper);
  isolation: isolate;
}

.theme-card--feature {
  grid-column: span 7;
  grid-row: span 2;
}

.theme-card--wide {
  grid-column: span 5;
}

.theme-card--third {
  grid-column: span 4;
}

.theme-card__media {
  position: absolute;
  inset: 0;
  z-index: -2;
  overflow: hidden;
  background: var(--ink);
}

.theme-card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 1.3s var(--ease), filter 1.3s var(--ease);
}

.theme-card__shade {
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    linear-gradient(180deg, rgba(12, 16, 16, 0.5) 0%, transparent 38%, rgba(12, 16, 16, 0.82) 100%),
    linear-gradient(90deg, rgba(12, 16, 16, 0.3), transparent 55%);
  transition: background 0.8s var(--ease);
}

.theme-card::after {
  content: "";
  position: absolute;
  inset: 12px;
  border: 1px solid rgba(245, 240, 230, 0.18);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.5s var(--ease), inset 0.5s var(--ease);
}

.theme-card:hover::after {
  opacity: 1;
  inset: 9px;
}

.theme-card:hover .theme-card__media img {
  transform: scale(1.055);
  filter: saturate(1.08);
}

.theme-card__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  color: rgba(245, 240, 230, 0.64);
  font-family: var(--font-display);
  font-size: 10px;
  letter-spacing: 0.2em;
}

.theme-card__top span:first-child {
  color: var(--gold-2);
  font-size: 13px;
}

.theme-card__body {
  max-width: 500px;
}

.theme-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 13px;
}

.theme-card__tags span {
  padding: 4px 8px;
  border: 1px solid rgba(245, 240, 230, 0.28);
  color: rgba(245, 240, 230, 0.68);
  font-size: 9px;
  letter-spacing: 0.12em;
}

.theme-card__title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
}

.theme-card h3 {
  font-size: clamp(1.8rem, 3.1vw, 3.6rem);
  font-weight: 500;
}

.theme-card--wide h3,
.theme-card--third h3 {
  font-size: clamp(1.45rem, 2.2vw, 2.2rem);
}

.theme-card p {
  max-width: 460px;
  margin-top: 8px;
  color: rgba(245, 240, 230, 0.7);
  font-size: 12px;
  line-height: 1.85;
}

.theme-card__arrow {
  display: grid;
  place-items: center;
  flex: 0 0 auto;
  width: 42px;
  height: 42px;
  border: 1px solid rgba(245, 240, 230, 0.38);
  border-radius: 50%;
  color: var(--gold-2);
  font-size: 15px;
  transition: background 0.4s var(--ease), color 0.4s var(--ease), transform 0.4s var(--ease);
}

.theme-card:hover .theme-card__arrow {
  background: var(--gold);
  border-color: var(--gold);
  color: var(--ink);
  transform: rotate(45deg);
}

/* ---------- strip ---------- */
.home-strip {
  padding: 0 0 clamp(80px, 9vw, 120px);
  background: var(--paper-2);
  overflow: hidden;
}

.home-strip__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding-bottom: 22px;
}

.home-strip__head .eyebrow {
  margin: 0;
}

.home-strip__head > span {
  color: var(--muted);
  font-size: 10px;
  letter-spacing: 0.14em;
}

.home-strip__viewport {
  overflow: hidden;
}

.home-strip__track {
  display: flex;
  width: max-content;
  gap: 14px;
  animation: strip-marquee 48s linear infinite;
}

.home-strip__track:hover {
  animation-play-state: paused;
}

.strip-frame {
  width: clamp(220px, 24vw, 380px);
  height: clamp(155px, 17vw, 270px);
  overflow: hidden;
}

.strip-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 1.2s var(--ease);
}

.strip-frame:hover img {
  transform: scale(1.04);
}

@keyframes strip-marquee {
  to {
    transform: translateX(-50%);
  }
}

/* ---------- routes ---------- */
.home-routes {
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(circle at 10% 20%, rgba(201, 163, 92, 0.15), transparent 30%),
    var(--green);
}

.home-routes__wash {
  position: absolute;
  top: -20%;
  right: -12%;
  width: 58vw;
  height: 58vw;
  border: 1px solid rgba(245, 240, 230, 0.08);
  border-radius: 50%;
  box-shadow:
    0 0 0 90px rgba(245, 240, 230, 0.025),
    0 0 0 180px rgba(245, 240, 230, 0.018);
  pointer-events: none;
}

.home-routes__grid {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
  gap: clamp(50px, 9vw, 140px);
}

.home-routes__intro h2 {
  margin-top: 22px;
  font-size: clamp(2.7rem, 5vw, 5.4rem);
  line-height: 1.12;
}

.home-routes__intro h2 em {
  font-style: normal;
  color: var(--gold-2);
}

.home-routes__intro > p {
  max-width: 420px;
  margin-top: 25px;
  color: rgba(245, 240, 230, 0.62);
  font-size: 14px;
  line-height: 2;
}

.home-routes__meta {
  display: flex;
  gap: 24px;
  margin-top: 30px;
  color: rgba(245, 240, 230, 0.36);
  font-family: var(--font-display);
  font-size: 9px;
  letter-spacing: 0.16em;
}

.home-routes__intro .btn {
  margin-top: 36px;
}

.home-routes__list {
  border-top: 1px solid rgba(245, 240, 230, 0.2);
}

.route-row {
  display: grid;
  grid-template-columns: 58px 1fr 30px;
  gap: 20px;
  padding: 22px 0 25px;
  border-bottom: 1px solid rgba(245, 240, 230, 0.16);
  transition: background 0.4s var(--ease), padding 0.4s var(--ease);
}

.route-row:hover {
  padding-left: 10px;
  background: rgba(245, 240, 230, 0.035);
}

.route-row__index {
  padding-top: 3px;
  font-family: var(--font-display);
  font-size: 14px;
  letter-spacing: 0.12em;
  color: var(--gold-2);
}

.route-row__top {
  display: flex;
  gap: 18px;
  color: rgba(245, 240, 230, 0.4);
  font-family: var(--font-display);
  font-size: 9px;
  letter-spacing: 0.2em;
}

.route-row h3 {
  margin-top: 7px;
  font-size: clamp(1.15rem, 1.8vw, 1.55rem);
  font-weight: 400;
}

.route-row p {
  margin-top: 4px;
  color: rgba(245, 240, 230, 0.5);
  font-size: 12px;
}

.route-row__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: 12px;
}

.route-row__tags span {
  padding: 3px 8px;
  border: 1px solid rgba(245, 240, 230, 0.2);
  color: rgba(245, 240, 230, 0.48);
  font-size: 8px;
  letter-spacing: 0.1em;
}

.route-row__arrow {
  align-self: center;
  color: var(--gold);
  font-size: 15px;
  transition: transform 0.35s var(--ease);
}

.route-row:hover .route-row__arrow {
  transform: translate(3px, -3px);
}

.home-routes__quote {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: clamp(50px, 7vw, 92px);
  padding-top: 24px;
  border-top: 1px solid rgba(245, 240, 230, 0.15);
  color: rgba(245, 240, 230, 0.5);
}

.home-routes__quote span {
  font-family: var(--font-display);
  font-size: 48px;
  line-height: 0.5;
  color: var(--gold);
}

.home-routes__quote p {
  font-family: var(--font-serif);
  font-size: clamp(1.05rem, 1.7vw, 1.45rem);
  letter-spacing: 0.08em;
}

.home-routes__quote i {
  width: 70px;
  height: 1px;
  margin-left: auto;
  background: rgba(245, 240, 230, 0.25);
}

/* ---------- gallery preview ---------- */
.home-gallery {
  background: var(--paper);
}

.home-gallery__grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: 360px;
  gap: 20px;
}

.home-gallery__item {
  position: relative;
  overflow: hidden;
  color: var(--paper);
  grid-column: span 4;
}

.home-gallery__item--1 {
  grid-column: span 6;
}

.home-gallery__item--2 {
  grid-column: span 3;
}

.home-gallery__item--3 {
  grid-column: span 3;
}

.home-gallery__item--4,
.home-gallery__item--5,
.home-gallery__item--6 {
  grid-column: span 4;
}

.home-gallery__item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 1.3s var(--ease), filter 1.3s var(--ease);
}

.home-gallery__item:hover img {
  transform: scale(1.055);
  filter: saturate(1.08);
}

.home-gallery__shade {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 40%, rgba(10, 14, 14, 0.82) 100%);
}

.home-gallery__caption {
  position: absolute;
  left: 22px;
  right: 22px;
  bottom: 20px;
}

.home-gallery__caption span {
  color: var(--gold-2);
  font-size: 9px;
  letter-spacing: 0.16em;
}

.home-gallery__caption h3 {
  margin-top: 5px;
  font-size: clamp(1.2rem, 1.8vw, 1.7rem);
  font-weight: 400;
}

.home-gallery__arrow {
  position: absolute;
  top: 20px;
  right: 20px;
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border: 1px solid rgba(245, 240, 230, 0.34);
  border-radius: 50%;
  color: var(--gold-2);
  font-size: 13px;
  opacity: 0;
  transform: translateY(-5px);
  transition: opacity 0.4s var(--ease), transform 0.4s var(--ease);
}

.home-gallery__item:hover .home-gallery__arrow {
  opacity: 1;
  transform: translateY(0);
}

/* ---------- outro ---------- */
.home-outro {
  position: relative;
  overflow: hidden;
  padding: clamp(110px, 15vw, 200px) 0 clamp(90px, 12vw, 150px);
  background: var(--red-deep);
  color: var(--paper);
}

.home-outro__bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.home-outro__bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 58%;
  filter: saturate(0.65);
}

.home-outro__veil {
  position: absolute;
  inset: 0;
  z-index: 1;
  background:
    linear-gradient(90deg, rgba(75, 12, 18, 0.92), rgba(75, 12, 18, 0.4) 68%, rgba(75, 12, 18, 0.62)),
    linear-gradient(0deg, rgba(75, 12, 18, 0.9), transparent 65%);
}

.home-outro__inner {
  position: relative;
  z-index: 2;
}

.home-outro .eyebrow {
  color: var(--gold-2);
}

.home-outro h2 {
  margin-top: 22px;
  font-size: clamp(3rem, 7vw, 7.2rem);
  line-height: 1.12;
  letter-spacing: -0.05em;
}

.home-outro h2 em {
  font-style: normal;
  color: var(--gold-2);
}

.home-outro__bottom {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 40px;
  margin-top: clamp(38px, 5vw, 64px);
  padding-top: 26px;
  border-top: 1px solid rgba(245, 240, 230, 0.26);
}

.home-outro__bottom > p {
  max-width: 430px;
  color: rgba(245, 240, 230, 0.68);
  font-size: 13px;
  line-height: 2;
}

.home-outro__actions {
  display: flex;
  align-items: center;
  gap: 26px;
}

.hero-link--light {
  color: rgba(245, 240, 230, 0.68);
}

.home-outro__word {
  margin-top: clamp(48px, 8vw, 100px);
  font-family: var(--font-display);
  font-size: clamp(5rem, 18vw, 17rem);
  font-weight: 300;
  line-height: 0.72;
  letter-spacing: 0.04em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(245, 240, 230, 0.16);
  user-select: none;
}

/* ---------- responsive ---------- */
@media (max-width: 1120px) {
  .home-hero__aside {
    display: none;
  }

  .theme-grid {
    grid-template-rows: 340px 340px 370px;
  }

  .home-routes__grid {
    grid-template-columns: 1fr;
    gap: 50px;
  }

  .home-routes__intro > p {
    max-width: 620px;
  }
}

@media (max-width: 900px) {
  .home-intro__grid {
    grid-template-columns: 1fr;
    gap: 36px;
  }

  .home-intro__copy {
    max-width: 680px;
  }

  .home-stats {
    grid-template-columns: 1fr 1fr;
  }

  .home-stat:nth-child(2) {
    border-right: 0;
  }

  .home-stat:nth-child(3),
  .home-stat:nth-child(4) {
    border-top: 1px solid var(--line);
  }

  .theme-grid {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
  }

  .theme-card--feature,
  .theme-card--wide,
  .theme-card--third {
    grid-column: span 1;
    grid-row: auto;
    min-height: 360px;
  }

  .theme-card--feature {
    grid-column: span 2;
    min-height: 500px;
  }

  .home-gallery__grid {
    grid-auto-rows: 300px;
  }

  .home-gallery__item--1 {
    grid-column: span 12;
  }

  .home-gallery__item--2,
  .home-gallery__item--3 {
    grid-column: span 6;
  }

  .home-gallery__item--4,
  .home-gallery__item--5,
  .home-gallery__item--6 {
    grid-column: span 4;
  }
}

@media (max-width: 720px) {
  .home-hero {
    min-height: 94svh;
  }

  .home-hero__frame {
    inset: 12px;
  }

  .home-hero__topline {
    top: calc(var(--header-h) + 8px);
    width: calc(100vw - 36px);
    padding-top: 12px;
    font-size: 8px;
  }

  .home-hero__topline span:last-child {
    display: none;
  }

  .home-hero__content {
    padding-top: 110px;
    padding-bottom: 106px;
  }

  .home-hero__eyebrow {
    margin-bottom: 18px;
    font-size: 8px;
    letter-spacing: 0.18em;
  }

  .home-hero__heading {
    gap: 14px;
  }

  .home-hero h1 {
    font-size: clamp(5.2rem, 24vw, 8.6rem);
  }

  .home-hero__seal {
    padding: 8px 7px;
    font-size: 12px;
  }

  .home-hero__en {
    margin-top: 12px;
    font-size: 0.9rem;
    letter-spacing: 0.36em;
  }

  .home-hero__slogan {
    margin-top: 20px;
    padding-top: 18px;
    font-size: 0.82rem;
    letter-spacing: 0.16em;
  }

  .home-hero__lede {
    font-size: 12px;
    line-height: 1.9;
  }

  .home-hero__actions {
    gap: 18px;
    margin-top: 26px;
  }

  .hero-cta {
    min-width: 0;
    gap: 20px;
    padding: 13px 15px;
    font-size: 10px;
  }

  .home-hero__bottom {
    display: none;
  }

  .home-hero__marquee-track {
    padding: 9px 0;
    font-size: 8px;
    gap: 16px;
    animation-duration: 28s;
  }

  .home-hero__content {
    padding-bottom: 96px;
  }

  .home-intro h2 {
    font-size: 2.1rem;
    line-height: 1.55;
  }

  .home-stats {
    margin-top: 50px;
  }

  .home-stat {
    padding: 22px 14px 20px 0;
  }

  .home-stat:not(:first-child) {
    padding-left: 16px;
  }

  .theme-grid {
    display: block;
  }

  .theme-card,
  .theme-card--feature,
  .theme-card--wide,
  .theme-card--third {
    min-height: 330px;
    margin-bottom: 16px;
  }

  .theme-card--feature {
    min-height: 440px;
  }

  .theme-card h3,
  .theme-card--wide h3,
  .theme-card--third h3 {
    font-size: 1.65rem;
  }

  .theme-card p {
    font-size: 11px;
  }

  .home-strip {
    padding-bottom: 72px;
  }

  .home-strip__head {
    align-items: flex-start;
    flex-direction: column;
    gap: 8px;
  }

  .home-routes__intro h2 {
    font-size: 2.7rem;
  }

  .home-routes__meta {
    flex-direction: column;
    gap: 4px;
  }

  .route-row {
    grid-template-columns: 40px 1fr 22px;
    gap: 10px;
  }

  .home-routes__quote {
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 12px;
  }

  .home-routes__quote i {
    display: none;
  }

  .home-gallery__grid {
    display: block;
  }

  .home-gallery__item {
    height: 300px;
    margin-bottom: 14px;
  }

  .home-gallery__item--1 {
    height: 340px;
  }

  .home-outro__bottom {
    align-items: flex-start;
    flex-direction: column;
    gap: 24px;
  }

  .home-outro h2 {
    font-size: 3.2rem;
  }

  .home-outro__word {
    font-size: 4.8rem;
  }
}

@media (max-width: 480px) {
  .home-hero__lede {
    max-width: 290px;
  }

  .home-hero__actions {
    align-items: flex-start;
    flex-direction: column;
  }

  .home-stat__value {
    font-size: 2.2rem;
  }

  .home-stat__label {
    font-size: 12px;
  }

  .home-outro__actions {
    align-items: flex-start;
    flex-direction: column;
    gap: 18px;
  }
}
</style>
