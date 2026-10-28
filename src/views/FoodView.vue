<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PageHero from '../components/PageHero.vue'
import SectionHead from '../components/SectionHead.vue'
import FoodModal from '../components/FoodModal.vue'
import { foods, foodCategories } from '../data/site'

const route = useRoute()
const activeCategory = ref('全部')
const selectedFood = ref(null)
const randomFood = ref(foods[0])
const swapKey = ref(0)

const categories = foodCategories

const filteredFoods = computed(function () {
  if (activeCategory.value === '全部') return foods
  return foods.filter(function (item) { return item.category === activeCategory.value })
})

const flavorEntries = computed(function () {
  return Object.keys(randomFood.value.flavors).map(function (key) {
    return { label: key, value: randomFood.value.flavors[key] }
  })
})

function countFor(category) {
  if (category === '全部') return foods.length
  return foods.filter(function (item) { return item.category === category }).length
}

function pickRandom() {
  let next = randomFood.value
  while (next.id === randomFood.value.id) {
    next = foods[Math.floor(Math.random() * foods.length)]
  }
  randomFood.value = next
  swapKey.value += 1
}

function openFood(food) {
  selectedFood.value = food
}

function closeFood() {
  selectedFood.value = null
  if (route.hash) window.history.replaceState(window.history.state, '', route.path)
}

function applyHash() {
  if (!route.hash) return
  const id = route.hash.replace('#', '')
  const food = foods.find(function (item) { return item.id === id })
  if (food) {
    selectedFood.value = food
    window.setTimeout(function () {
      if (route.hash) window.history.replaceState(window.history.state, '', route.path)
    }, 200)
  }
}

watch(activeCategory, function () {
  nextTick(function () {
    ScrollTrigger.refresh()
  })
})

watch(function () { return route.hash }, applyHash)
onMounted(applyHash)
</script>

<template>
  <div class="food">
    <PageHero
      index="03"
      title="川味人间"
      en="TASTE OF CHENGDU"
      intro="成都人把日子过成一桌热气腾腾的饭。红汤翻滚，竹签成把，一碗面也能吃出江湖。"
      image="/images/hotpot-spread.webp"
      image-position="center"
      theme="red"
      :meta="['火锅', '串串', '担担面', '麻婆豆腐']"
    />

    <section class="food-intro section">
      <span class="food-intro__ghost" aria-hidden="true">食</span>
      <div class="container">
        <div class="food-intro__grid">
          <div v-reveal>
            <p class="eyebrow">THE TASTE OF A CITY · 味觉成都</p>
            <h2>成都人把日子，<br /><em>过成一桌热气腾腾的饭。</em></h2>
          </div>
          <div class="food-intro__copy" v-reveal="{ delay: 0.1 }">
            <p class="lead">
              麻辣是成都的脾气，鲜香是它的底色，甜是它藏在红油后面的温柔。
              从清晨的一碗面，到深夜的一把签签，成都的味道从来不只在餐厅里，也在街边、巷口和加班的夜里。
            </p>
            <div class="food-intro__chars" aria-hidden="true">
              <span>麻</span><span>辣</span><span>鲜</span><span>香</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="food-random section section--paper-2">
      <div class="container">
        <div class="food-random__grid">
          <div class="food-random__copy" v-reveal>
            <p class="eyebrow">WHAT TO EAT TODAY · 今日推荐</p>
            <h2>今天，<br /><em>吃点什么？</em></h2>
            <p>
              选择困难的时候，把决定交给成都。点一下，随机抽一道本地味道，
              然后顺着它的香气，去找一家小店坐下来。
            </p>
            <button type="button" class="btn btn--red random-btn" @click="pickRandom">
              换一道 <span>↻</span>
            </button>
          </div>

          <div class="random-card" v-reveal="{ delay: 0.1 }">
            <div class="random-card__media">
              <Transition name="food-swap" mode="out-in">
                <img
                  :key="randomFood.id"
                  :src="randomFood.image"
                  :alt="randomFood.name"
                  :style="{ objectPosition: randomFood.imagePosition }"
                />
              </Transition>
              <span class="random-card__index">{{ randomFood.category }}</span>
              <span class="random-card__stamp">今日<br />食单</span>
            </div>
            <div class="random-card__body">
              <p class="random-card__en">{{ randomFood.en }}</p>
              <h3>{{ randomFood.name }}</h3>
              <p class="random-card__tagline">{{ randomFood.tagline }}</p>
              <div class="random-card__flavors">
                <div v-for="item in flavorEntries" :key="item.label" class="random-flavor">
                  <span>{{ item.label }}</span>
                  <i><b :style="{ width: item.value * 20 + '%' }"></b></i>
                </div>
              </div>
              <button type="button" class="text-link" @click="openFood(randomFood)">看看这道菜 <span>↗</span></button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="food-list-section section">
      <div class="container">
        <SectionHead
          v-reveal
          num="01"
          label="TASTE INDEX"
          en="SEVEN BITES OF CHENGDU"
          title="七种成都味"
          desc="按类别筛选，找一道合你胃口的成都。点击卡片，展开它的来历、吃法与推荐去处。"
        />

        <div class="food-filter" role="tablist" aria-label="美食分类">
          <button
            v-for="category in categories"
            :key="category"
            type="button"
            class="food-filter__tab"
            :class="{ active: activeCategory === category }"
            role="tab"
            :aria-selected="activeCategory === category"
            @click="activeCategory = category"
          >
            {{ category }} <span>{{ countFor(category) }}</span>
          </button>
        </div>

        <div class="food-grid">
          <article
            v-for="(food, index) in filteredFoods"
            :id="food.id"
            :key="food.id"
            class="food-card"
            role="button"
            tabindex="0"
            :aria-label="'查看' + food.name + '详情'"
            v-reveal="{ delay: (index % 4) * 0.05, distance: 26 }"
            @click="openFood(food)"
            @keydown.enter="openFood(food)"
          >
            <div class="food-card__media">
              <img :src="food.image" :alt="food.name" :style="{ objectPosition: food.imagePosition }" loading="lazy" />
              <span class="food-card__category">{{ food.category }}</span>
              <span class="food-card__number">0{{ index + 1 }}</span>
            </div>
            <div class="food-card__body">
              <div class="food-card__title">
                <h3>{{ food.name }}</h3>
                <span aria-hidden="true">↗</span>
              </div>
              <p class="food-card__en">{{ food.en }}</p>
              <p class="food-card__tagline">{{ food.tagline }}</p>
              <div class="food-card__tags">
                <span v-for="tag in food.tags" :key="tag">{{ tag }}</span>
              </div>
              <div class="food-card__heat">
                <span>辣度</span>
                <i
                  v-for="n in 5"
                  :key="n"
                  :class="{ filled: n <= food.flavors.辣 }"
                ></i>
                <em>{{ food.price }}</em>
              </div>
            </div>
          </article>

          <article class="food-card food-card--note" v-reveal="{ delay: 0.15, distance: 26 }">
            <div class="food-note">
              <p class="food-note__en">NIGHT MARKET · 夜市</p>
              <h3>最好的味道，<br />常常在巷子里。</h3>
              <p>
                建设路的烤脑花、蛋烘糕、锅巴土豆，玉林的冷锅串串，还有学校门口五块钱的糖油果子。
              </p>
              <RouterLink to="/explore?spot=jianshe" class="text-link">去夜市找答案 <span>↗</span></RouterLink>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="flavor-map section section--ink">
      <div class="container">
        <SectionHead
          v-reveal
          num="02"
          label="FLAVOR COORDINATES"
          en="MA, LA, XIAN, XIANG"
          title="味觉坐标"
          desc="成都的味觉不是单一的辣，而是几种性格同时抵达：麻、辣、鲜、香。"
        />

        <div class="flavor-grid">
          <article v-for="(item, index) in [{ char: '麻', en: 'NUMB', text: '花椒的清麻，像一小阵电流，从舌尖窜到耳后。', num: '01' }, { char: '辣', en: 'SPICY', text: '不是蛮横的辣，是牛油、辣椒与香气一起推上来的热。', num: '02' }, { char: '鲜', en: 'UMAMI', text: '高汤、豆瓣与食材本味，让辣有了回甘的余地。', num: '03' }, { char: '香', en: 'AROMA', text: '蒜泥、香油、熟油海椒，成都的香气总在巷口先到。', num: '04' }]" :key="item.char" class="flavor-item" v-reveal="{ delay: index * 0.06 }">
            <span class="flavor-item__num">{{ item.num }}</span>
            <p class="flavor-item__char">{{ item.char }}</p>
            <p class="flavor-item__en">{{ item.en }}</p>
            <p class="flavor-item__text">{{ item.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="night-food">
      <div class="night-food__bg">
        <img src="/images/night-market-wide.webp" alt="成都夜市" loading="lazy" />
      </div>
      <div class="night-food__veil"></div>
      <div class="container night-food__inner">
        <div class="night-food__copy" v-reveal>
          <p class="eyebrow">AFTER DARK · 深夜食堂</p>
          <h2>成都的夜，<br /><em>是吃出来的。</em></h2>
          <p>
            晚上十点，建设路的灯牌还亮着，玉林的火锅刚翻第二轮台。
            在成都，宵夜不是一天之外的加餐，而是一天真正的开始。
          </p>
          <RouterLink to="/explore?spot=jianshe" class="btn btn--light">去夜市逛逛 <span class="btn__arrow"></span></RouterLink>
        </div>
        <div class="night-food__list" v-reveal="{ delay: 0.1 }">
          <div><span>01</span><p>烤脑花</p><small>重口味的下酒菜</small></div>
          <div><span>02</span><p>蛋烘糕</p><small>甜咸都由你</small></div>
          <div><span>03</span><p>锅巴土豆</p><small>外脆内绵</small></div>
          <div><span>04</span><p>冰粉</p><small>吃完辣的收尾</small></div>
        </div>
      </div>
    </section>

    <section class="food-tips section">
      <div class="container">
        <SectionHead
          v-reveal
          num="03"
          label="TABLE MANNERS"
          en="EAT LIKE A LOCAL"
          title="成都吃法小抄"
          desc="第一次来成都，记住这几件小事，就能吃得更像本地人。"
        />
        <div class="tip-grid">
          <article v-for="(tip, index) in [{ num: '01', title: '先调油碟', text: '香油、蒜泥、香菜、蚝油，按自己的口味来。油碟不是蘸料，是降温与提香的关键。' }, { num: '02', title: '七上八下', text: '毛肚在红汤里七上八下，大约十秒；鸭肠更快，卷起来就起锅。煮老了，口感就没了。' }, { num: '03', title: '数签签', text: '吃串串最后按竹签结账。有的店按根数，有的按重量，坐下前先问清楚。' }]" :key="tip.num" class="tip-card" v-reveal="{ delay: index * 0.06 }">
            <span>{{ tip.num }}</span>
            <h3>{{ tip.title }}</h3>
            <p>{{ tip.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="food-outro">
      <div class="container food-outro__inner" v-reveal>
        <p class="eyebrow">ONE MORE BITE</p>
        <h2>吃饱了，<br /><em>才有力气继续逛成都。</em></h2>
        <div class="food-outro__actions">
          <RouterLink to="/explore" class="btn btn--light">去城市里消食 <span class="btn__arrow"></span></RouterLink>
          <RouterLink to="/travel" class="hero-link hero-link--light">安排一条吃货路线 <span>↗</span></RouterLink>
        </div>
      </div>
    </section>

    <FoodModal :food="selectedFood" @close="closeFood" />
  </div>
</template>

<style scoped>
.food-intro {
  overflow: hidden;
  background:
    radial-gradient(circle at 92% 10%, rgba(130, 31, 38, 0.1), transparent 29%),
    var(--paper);
}

.food-intro__ghost {
  position: absolute;
  right: -3vw;
  top: -7vw;
  font-family: var(--font-brush);
  font-size: min(40vw, 540px);
  line-height: 1;
  color: rgba(130, 31, 38, 0.045);
  pointer-events: none;
}

.food-intro__grid {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: clamp(50px, 9vw, 140px);
  align-items: start;
}

.food-intro h2 {
  margin-top: 22px;
  font-size: clamp(2.5rem, 4.7vw, 5rem);
  line-height: 1.3;
}

.food-intro h2 em {
  font-style: normal;
  color: var(--red);
}

.food-intro__copy {
  padding-top: 30px;
}

.food-intro__chars {
  display: flex;
  gap: 18px;
  margin-top: 36px;
  padding-top: 24px;
  border-top: 1px solid var(--line);
}

.food-intro__chars span {
  font-family: var(--font-brush);
  font-size: clamp(2.6rem, 4.4vw, 4.6rem);
  line-height: 1;
  color: var(--red);
}

.food-intro__chars span:nth-child(2) {
  color: var(--gold);
}

.food-intro__chars span:nth-child(3) {
  color: var(--green);
}

.food-intro__chars span:nth-child(4) {
  color: var(--ink);
}

/* random */
.food-random {
  background:
    linear-gradient(180deg, rgba(245, 240, 230, 0.35), transparent 24%),
    var(--paper-2);
}

.food-random__grid {
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  gap: clamp(40px, 7vw, 110px);
  align-items: center;
}

.food-random__copy h2 {
  margin-top: 22px;
  font-size: clamp(2.8rem, 5vw, 5.4rem);
  line-height: 1.1;
}

.food-random__copy h2 em {
  font-style: normal;
  color: var(--red);
}

.food-random__copy > p {
  max-width: 400px;
  margin-top: 24px;
  color: var(--muted);
  font-size: 14px;
  line-height: 2;
}

.random-btn {
  margin-top: 30px;
}

.random-btn span {
  font-size: 17px;
  line-height: 0.7;
}

.random-card {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  min-height: 420px;
  border: 1px solid var(--line);
  background: var(--paper);
}

.random-card__media {
  position: relative;
  min-height: 320px;
  overflow: hidden;
  background: var(--ink);
}

.random-card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.random-card__index {
  position: absolute;
  left: 16px;
  top: 16px;
  padding: 5px 8px;
  background: rgba(245, 240, 230, 0.9);
  color: var(--red);
  font-size: 8px;
  letter-spacing: 0.12em;
}

.random-card__stamp {
  position: absolute;
  right: 16px;
  bottom: 16px;
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  border: 1px solid rgba(229, 205, 148, 0.7);
  background: var(--red);
  color: var(--gold-3);
  font-family: var(--font-serif);
  font-size: 11px;
  line-height: 1.5;
  text-align: center;
}

.random-card__body {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: clamp(24px, 3.4vw, 46px);
}

.random-card__en {
  color: var(--muted);
  font-family: var(--font-display);
  font-size: 9px;
  letter-spacing: 0.18em;
}

.random-card__body h3 {
  margin-top: 12px;
  font-size: clamp(2rem, 3.3vw, 3.4rem);
  line-height: 1.15;
}

.random-card__tagline {
  margin-top: 12px;
  color: var(--red);
  font-family: var(--font-serif);
  font-size: 13px;
  line-height: 1.8;
}

.random-card__flavors {
  width: 100%;
  margin-top: 22px;
  padding: 14px 0;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}

.random-flavor {
  display: grid;
  grid-template-columns: 22px 1fr;
  align-items: center;
  gap: 8px;
  padding: 3px 0;
}

.random-flavor span {
  font-family: var(--font-serif);
  font-size: 11px;
}

.random-flavor i {
  height: 3px;
  overflow: hidden;
  background: var(--paper-3);
}

.random-flavor i b {
  display: block;
  height: 100%;
  background: linear-gradient(90deg, var(--red), var(--gold));
}

.random-card__body .text-link {
  margin-top: 24px;
  color: var(--red);
}

.food-swap-enter-active,
.food-swap-leave-active {
  transition: opacity 0.35s var(--ease), transform 0.5s var(--ease);
}

.food-swap-enter-from {
  opacity: 0;
  transform: scale(1.04);
}

.food-swap-leave-to {
  opacity: 0;
  transform: scale(0.98);
}

/* food list */
.food-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: -10px 0 30px;
  padding-bottom: 18px;
  border-bottom: 1px solid var(--line);
}

.food-filter__tab {
  padding: 8px 13px;
  border: 1px solid transparent;
  color: var(--muted);
  font-size: 11px;
  letter-spacing: 0.07em;
  transition: color 0.3s var(--ease), border-color 0.3s var(--ease), background 0.3s var(--ease);
}

.food-filter__tab span {
  margin-left: 5px;
  font-family: var(--font-display);
  font-size: 9px;
  opacity: 0.5;
}

.food-filter__tab:hover {
  color: var(--ink);
}

.food-filter__tab.active {
  border-color: var(--red);
  background: var(--red);
  color: var(--paper);
}

.food-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.food-card {
  position: relative;
  overflow: hidden;
  border: 1px solid var(--line);
  background: var(--paper);
  cursor: pointer;
  transition: border-color 0.35s var(--ease), transform 0.35s var(--ease);
}

.food-card:hover,
.food-card:focus-visible {
  border-color: rgba(130, 31, 38, 0.4);
  transform: translateY(-3px);
}

.food-card__media {
  position: relative;
  height: 230px;
  overflow: hidden;
  background: var(--paper-3);
}

.food-card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 1.1s var(--ease);
}

.food-card:hover .food-card__media img {
  transform: scale(1.05);
}

.food-card__category {
  position: absolute;
  left: 12px;
  top: 12px;
  padding: 4px 7px;
  background: rgba(245, 240, 230, 0.9);
  color: var(--red);
  font-size: 8px;
  letter-spacing: 0.08em;
}

.food-card__number {
  position: absolute;
  right: 13px;
  top: 11px;
  color: rgba(245, 240, 230, 0.7);
  font-family: var(--font-display);
  font-size: 11px;
  letter-spacing: 0.12em;
  text-shadow: 0 1px 8px rgba(0, 0, 0, 0.2);
}

.food-card__body {
  padding: 17px 17px 15px;
}

.food-card__title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.food-card__title h3 {
  font-size: 1.4rem;
  font-weight: 500;
}

.food-card__title span {
  color: var(--red);
  font-size: 14px;
  opacity: 0;
  transform: translate(-4px, 4px);
  transition: opacity 0.3s var(--ease), transform 0.3s var(--ease);
}

.food-card:hover .food-card__title span {
  opacity: 1;
  transform: translate(0, 0);
}

.food-card__en {
  margin-top: 2px;
  color: var(--muted);
  font-family: var(--font-display);
  font-size: 8px;
  letter-spacing: 0.13em;
}

.food-card__tagline {
  display: -webkit-box;
  overflow: hidden;
  margin-top: 10px;
  color: var(--muted);
  font-size: 11px;
  line-height: 1.8;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.food-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 12px;
}

.food-card__tags span {
  padding: 3px 6px;
  border: 1px solid var(--line);
  color: var(--muted);
  font-size: 8px;
  letter-spacing: 0.04em;
}

.food-card__heat {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 13px;
  padding-top: 11px;
  border-top: 1px solid var(--line);
}

.food-card__heat > span {
  margin-right: 3px;
  color: var(--muted);
  font-size: 8px;
  letter-spacing: 0.08em;
}

.food-card__heat i {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--paper-3);
}

.food-card__heat i.filled {
  background: var(--red);
}

.food-card__heat em {
  margin-left: auto;
  color: var(--muted);
  font-family: var(--font-display);
  font-size: 9px;
  font-style: normal;
  letter-spacing: 0.05em;
}

.food-card--note {
  background: var(--green);
  color: var(--paper);
  border-color: var(--green);
  cursor: default;
}

.food-card--note:hover {
  transform: none;
}

.food-note {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  padding: 28px;
  background:
    radial-gradient(circle at 90% 0%, rgba(201, 163, 92, 0.18), transparent 32%),
    var(--green);
}

.food-note__en {
  color: var(--gold-2);
  font-family: var(--font-display);
  font-size: 8px;
  letter-spacing: 0.16em;
}

.food-note h3 {
  margin-top: 12px;
  font-size: 1.7rem;
  line-height: 1.35;
  font-weight: 400;
}

.food-note p:not(.food-note__en) {
  margin-top: 14px;
  color: rgba(245, 240, 230, 0.56);
  font-size: 11px;
  line-height: 1.9;
}

.food-note .text-link {
  margin-top: 24px;
  color: var(--gold-2);
}

/* flavor map */
.flavor-map {
  background:
    radial-gradient(circle at 100% 0%, rgba(201, 163, 92, 0.12), transparent 30%),
    var(--ink);
}

.flavor-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-top: 1px solid var(--line-light);
  border-bottom: 1px solid var(--line-light);
}

.flavor-item {
  position: relative;
  min-height: 340px;
  padding: 26px;
  border-right: 1px solid var(--line-light);
  transition: background 0.4s var(--ease);
}

.flavor-item:last-child {
  border-right: 0;
}

.flavor-item:hover {
  background: rgba(245, 240, 230, 0.035);
}

.flavor-item__num {
  color: rgba(245, 240, 230, 0.3);
  font-family: var(--font-display);
  font-size: 10px;
  letter-spacing: 0.12em;
}

.flavor-item__char {
  margin-top: 34px;
  font-family: var(--font-brush);
  font-size: clamp(4.6rem, 8vw, 8rem);
  line-height: 0.9;
  color: var(--gold-2);
}

.flavor-item:nth-child(2) .flavor-item__char {
  color: #c75d59;
}

.flavor-item:nth-child(3) .flavor-item__char {
  color: #d9c9a5;
}

.flavor-item:nth-child(4) .flavor-item__char {
  color: #9fb1a3;
}

.flavor-item__en {
  margin-top: 8px;
  color: rgba(245, 240, 230, 0.35);
  font-family: var(--font-display);
  font-size: 9px;
  letter-spacing: 0.2em;
}

.flavor-item__text {
  max-width: 200px;
  margin-top: 22px;
  color: rgba(245, 240, 230, 0.55);
  font-size: 11px;
  line-height: 1.9;
}

/* night */
.night-food {
  position: relative;
  overflow: hidden;
  padding: clamp(100px, 13vw, 170px) 0;
  color: var(--paper);
  background: var(--red-deep);
}

.night-food__bg {
  position: absolute;
  inset: 0;
}

.night-food__bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(0.72);
}

.night-food__veil {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(58, 9, 14, 0.93), rgba(58, 9, 14, 0.35) 65%, rgba(58, 9, 14, 0.52)),
    linear-gradient(0deg, rgba(58, 9, 14, 0.82), transparent 60%);
}

.night-food__inner {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr 0.7fr;
  gap: clamp(50px, 9vw, 140px);
  align-items: center;
}

.night-food__copy .eyebrow {
  color: var(--gold-2);
}

.night-food__copy h2 {
  margin-top: 22px;
  font-size: clamp(2.7rem, 5.2vw, 5.6rem);
  line-height: 1.15;
}

.night-food__copy h2 em {
  font-style: normal;
  color: var(--gold-2);
}

.night-food__copy > p {
  max-width: 440px;
  margin-top: 22px;
  color: rgba(245, 240, 230, 0.62);
  font-size: 13px;
  line-height: 2;
}

.night-food__copy .btn {
  margin-top: 30px;
}

.night-food__list {
  border-top: 1px solid rgba(245, 240, 230, 0.2);
}

.night-food__list > div {
  display: grid;
  grid-template-columns: 36px 1fr auto;
  align-items: baseline;
  gap: 12px;
  padding: 18px 0;
  border-bottom: 1px solid rgba(245, 240, 230, 0.16);
}

.night-food__list span {
  color: var(--gold-2);
  font-family: var(--font-display);
  font-size: 10px;
}

.night-food__list p {
  font-family: var(--font-serif);
  font-size: 1.1rem;
}

.night-food__list small {
  color: rgba(245, 240, 230, 0.4);
  font-size: 9px;
}

/* tips */
.food-tips {
  background: var(--paper);
}

.tip-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.tip-card {
  padding: 28px;
  border-top: 2px solid var(--red);
  background: var(--paper-2);
}

.tip-card > span {
  color: var(--red);
  font-family: var(--font-display);
  font-size: 11px;
  letter-spacing: 0.1em;
}

.tip-card h3 {
  margin-top: 25px;
  font-size: 1.8rem;
  font-weight: 400;
}

.tip-card p {
  margin-top: 12px;
  color: var(--muted);
  font-size: 12px;
  line-height: 1.95;
}

/* outro */
.food-outro {
  padding: clamp(86px, 11vw, 140px) 0;
  color: var(--paper);
  background:
    radial-gradient(circle at 12% 20%, rgba(201, 163, 92, 0.17), transparent 30%),
    var(--red);
}

.food-outro .eyebrow {
  color: var(--gold-2);
}

.food-outro h2 {
  margin-top: 22px;
  font-size: clamp(2.8rem, 6vw, 6.4rem);
  line-height: 1.15;
}

.food-outro h2 em {
  font-style: normal;
  color: var(--gold-2);
}

.food-outro__actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 28px;
  margin-top: 32px;
}

.hero-link {
  display: inline-flex;
  gap: 9px;
  color: rgba(245, 240, 230, 0.62);
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

@media (max-width: 1120px) {
  .food-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 960px) {
  .food-intro__grid,
  .food-random__grid {
    grid-template-columns: 1fr;
    gap: 34px;
  }

  .food-intro__copy {
    padding-top: 0;
  }

  .random-card {
    max-width: 720px;
  }

  .flavor-grid {
    grid-template-columns: 1fr 1fr;
  }

  .flavor-item:nth-child(2) {
    border-right: 0;
  }

  .flavor-item:nth-child(1),
  .flavor-item:nth-child(2) {
    border-bottom: 1px solid var(--line-light);
  }

  .night-food__inner {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .night-food__list {
    max-width: 600px;
  }
}

@media (max-width: 760px) {
  .food-intro h2 {
    font-size: 2.2rem;
  }

  .food-random__copy h2 {
    font-size: 2.8rem;
  }

  .random-card {
    grid-template-columns: 1fr;
  }

  .random-card__media {
    height: 280px;
    min-height: 0;
  }

  .food-grid {
    grid-template-columns: 1fr 1fr;
    gap: 13px;
  }

  .food-card__media {
    height: 170px;
  }

  .food-card__body {
    padding: 13px;
  }

  .food-card__title h3 {
    font-size: 1.15rem;
  }

  .food-card__tagline,
  .food-card__tags {
    display: none;
  }

  .food-card__heat {
    margin-top: 8px;
    padding-top: 8px;
  }

  .food-card__heat em {
    display: none;
  }

  .food-note {
    padding: 20px;
  }

  .food-note h3 {
    font-size: 1.4rem;
  }

  .flavor-item {
    min-height: 280px;
    padding: 20px;
  }

  .flavor-item__char {
    margin-top: 24px;
  }

  .tip-grid {
    grid-template-columns: 1fr;
  }

  .food-filter {
    flex-wrap: nowrap;
    overflow-x: auto;
    padding-bottom: 10px;
    scrollbar-width: none;
  }

  .food-filter::-webkit-scrollbar {
    display: none;
  }

  .food-filter__tab {
    flex: 0 0 auto;
  }

  .night-food__list > div {
    grid-template-columns: 28px 1fr;
  }

  .night-food__list small {
    display: none;
  }

  .food-outro h2 {
    font-size: 2.6rem;
  }
}

@media (max-width: 460px) {
  .food-grid {
    grid-template-columns: 1fr;
  }

  .food-card__media {
    height: 230px;
  }

  .food-card__tagline,
  .food-card__tags {
    display: block;
  }

  .food-card__tags {
    display: flex;
  }

  .flavor-grid {
    grid-template-columns: 1fr;
  }

  .flavor-item {
    min-height: 240px;
    border-right: 0;
    border-bottom: 1px solid var(--line-light);
  }

  .flavor-item:last-child {
    border-bottom: 0;
  }
}
</style>
