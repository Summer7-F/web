<script setup>
import { ref } from 'vue'
import { navItems } from '../data/site'

const email = ref('')
const error = ref('')

function notify(message) {
  window.dispatchEvent(new CustomEvent('shuyun-toast', { detail: message }))
}

function subscribe() {
  error.value = ''
  const value = email.value.trim()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    error.value = '请留下一个有效的邮箱地址。'
    return
  }
  notify('已收到你的蜀运来信订阅，我们成都见。')
  email.value = ''
}

function backToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <footer class="site-footer">
    <div class="footer-art" aria-hidden="true">SHU YUN</div>
    <div class="container footer-inner">
      <div class="footer-top">
        <div class="footer-brand">
          <p class="eyebrow">SHU YUN · CHENGDU</p>
          <h2>一城烟火<br /><em>千年蜀韵</em></h2>
          <p class="footer-intro">
            以成都为卷，把古蜀、街巷、川味、熊猫与旅途写进同一本城市书。
            愿你在每一次抵达里，都能遇见一点慢下来的理由。
          </p>
          <div class="footer-seal" aria-hidden="true">
            <span>蜀</span>
            <small>SHU<br />YUN</small>
          </div>
        </div>

        <div class="newsletter">
          <p class="kicker">SHU YUN LETTERS</p>
          <h3>把成都的四季，<br />寄给你。</h3>
          <p class="newsletter__desc">路线灵感、城市影像与季节风物，每月一封，不打扰。</p>
          <form class="newsletter__form" @submit.prevent="subscribe">
            <label class="sr-only" for="newsletter-email">邮箱地址</label>
            <input
              id="newsletter-email"
              v-model="email"
              type="email"
              placeholder="你的邮箱地址"
              autocomplete="email"
            />
            <button type="submit" aria-label="订阅蜀运来信">
              <span>订阅</span>
              <i aria-hidden="true">↗</i>
            </button>
          </form>
          <p v-if="error" class="newsletter__error">{{ error }}</p>
          <p class="newsletter__small">订阅即表示你愿意收到蜀运的城市来信。</p>
        </div>
      </div>

      <div class="footer-mid">
        <div class="footer-col">
          <p class="footer-col__title">城市章节</p>
          <RouterLink v-for="item in navItems" :key="item.path" :to="item.path">
            <span>{{ item.index }}</span>{{ item.label }}
          </RouterLink>
        </div>
        <div class="footer-col">
          <p class="footer-col__title">行前准备</p>
          <RouterLink to="/travel">路线规划</RouterLink>
          <RouterLink to="/explore">城市地图</RouterLink>
          <RouterLink to="/food">味觉清单</RouterLink>
          <RouterLink to="/gallery">影像故事</RouterLink>
        </div>
        <div class="footer-col">
          <p class="footer-col__title">关于蜀运</p>
          <a href="https://www.mct.gov.cn/" target="_blank" rel="noopener">文化和旅游部</a>
          <a href="https://www.dufucaotang.com/" target="_blank" rel="noopener">杜甫草堂</a>
          <RouterLink to="/heritage">文化顾问</RouterLink>
          <button type="button" @click="backToTop">回到顶部 ↑</button>
        </div>
        <div class="footer-quote">
          <p class="quote-mark">“</p>
          <p>晓看红湿处，<br />花重锦官城。</p>
          <span>杜甫《春夜喜雨》</span>
        </div>
      </div>

      <div class="footer-bottom">
        <p>© 2026 蜀运 SHU YUN · 成都城市文化旅游网站</p>
        <p>文化资料参考：文化和旅游部、杜甫草堂博物馆公开资料。影像素材来源于公开网络，仅作文化展示。</p>
        <button type="button" @click="backToTop" aria-label="返回页面顶部">TOP ↑</button>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  position: relative;
  overflow: hidden;
  padding: clamp(82px, 10vw, 130px) 0 34px;
  background:
    radial-gradient(circle at 85% 8%, rgba(201, 163, 92, 0.12), transparent 32%),
    var(--green-deep);
  color: var(--paper);
}

.site-footer::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(245, 240, 230, 0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(245, 240, 230, 0.035) 1px, transparent 1px);
  background-size: 90px 90px;
  mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.55), transparent 70%);
  pointer-events: none;
}

.footer-art {
  position: absolute;
  left: 50%;
  bottom: -2vw;
  transform: translateX(-50%);
  font-family: var(--font-display);
  font-size: clamp(8rem, 26vw, 28rem);
  font-weight: 300;
  letter-spacing: 0.02em;
  line-height: 0.75;
  color: transparent;
  -webkit-text-stroke: 1px rgba(245, 240, 230, 0.055);
  white-space: nowrap;
  pointer-events: none;
}

.footer-inner {
  position: relative;
  z-index: 1;
}

.footer-top {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(340px, 0.9fr);
  gap: clamp(50px, 9vw, 140px);
  padding-bottom: clamp(56px, 7vw, 90px);
  border-bottom: 1px solid var(--line-light);
}

.footer-brand .eyebrow {
  color: var(--gold-2);
}

.footer-brand h2 {
  margin-top: 22px;
  font-size: clamp(2.8rem, 5.6vw, 6rem);
  line-height: 1.08;
  letter-spacing: -0.04em;
}

.footer-brand h2 em {
  font-style: normal;
  color: var(--gold-2);
}

.footer-intro {
  max-width: 440px;
  margin-top: 28px;
  color: rgba(245, 240, 230, 0.58);
  font-size: 13px;
  line-height: 2.1;
}

.footer-seal {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin-top: 34px;
  padding: 13px 16px;
  border: 1px solid rgba(229, 205, 148, 0.3);
}

.footer-seal span {
  font-family: var(--font-serif);
  font-size: 26px;
  color: var(--gold-2);
  line-height: 1;
}

.footer-seal small {
  font-family: var(--font-display);
  font-size: 9px;
  letter-spacing: 0.18em;
  line-height: 1.4;
  color: rgba(245, 240, 230, 0.45);
}

.newsletter {
  padding-top: 10px;
}

.newsletter .kicker {
  color: var(--gold-2);
}

.newsletter h3 {
  margin-top: 20px;
  font-size: clamp(1.7rem, 2.8vw, 2.7rem);
  line-height: 1.35;
  font-weight: 400;
}

.newsletter__desc {
  max-width: 420px;
  margin-top: 16px;
  color: rgba(245, 240, 230, 0.55);
  font-size: 13px;
}

.newsletter__form {
  display: flex;
  align-items: stretch;
  margin-top: 28px;
  border-bottom: 1px solid rgba(245, 240, 230, 0.3);
}

.newsletter__form input {
  flex: 1;
  min-width: 0;
  padding: 14px 0;
  border: 0;
  background: transparent;
  color: var(--paper);
  font-size: 14px;
  outline: none;
}

.newsletter__form input::placeholder {
  color: rgba(245, 240, 230, 0.36);
}

.newsletter__form button {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 0 2px 0 20px;
  color: var(--gold-2);
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  transition: color 0.3s var(--ease);
}

.newsletter__form button:hover {
  color: var(--paper);
}

.newsletter__form button i {
  font-style: normal;
  font-size: 16px;
}

.newsletter__error {
  margin-top: 10px;
  color: #e2a58e;
  font-size: 12px;
}

.newsletter__small {
  margin-top: 13px;
  color: rgba(245, 240, 230, 0.34);
  font-size: 10px;
  letter-spacing: 0.06em;
}

.footer-mid {
  display: grid;
  grid-template-columns: 0.7fr 0.7fr 0.8fr 1.2fr;
  gap: clamp(30px, 4vw, 64px);
  padding: clamp(42px, 5vw, 64px) 0;
  border-bottom: 1px solid var(--line-light);
}

.footer-col {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
}

.footer-col__title {
  margin-bottom: 10px;
  color: var(--gold-2);
  font-size: 10px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}

.footer-col a,
.footer-col button {
  color: rgba(245, 240, 230, 0.56);
  font-size: 12px;
  line-height: 1.9;
  transition: color 0.3s var(--ease);
}

.footer-col a span {
  margin-right: 8px;
  font-family: var(--font-display);
  font-size: 9px;
  color: rgba(245, 240, 230, 0.28);
}

.footer-col a:hover,
.footer-col button:hover {
  color: var(--gold-2);
}

.footer-quote {
  justify-self: end;
  text-align: right;
}

.footer-quote .quote-mark {
  font-size: 64px;
  line-height: 0.4;
}

.footer-quote p {
  margin-top: 12px;
  font-family: var(--font-serif);
  font-size: clamp(1.15rem, 1.7vw, 1.55rem);
  line-height: 1.8;
}

.footer-quote span {
  display: block;
  margin-top: 14px;
  color: rgba(245, 240, 230, 0.38);
  font-size: 10px;
  letter-spacing: 0.16em;
}

.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 26px;
  padding-top: 26px;
  color: rgba(245, 240, 230, 0.32);
  font-size: 9px;
  letter-spacing: 0.08em;
  line-height: 1.8;
}

.footer-bottom p:nth-child(2) {
  max-width: 520px;
  text-align: center;
}

.footer-bottom button {
  color: rgba(245, 240, 230, 0.45);
  font-size: 9px;
  letter-spacing: 0.18em;
}

.footer-bottom button:hover {
  color: var(--gold-2);
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

@media (max-width: 960px) {
  .footer-top {
    grid-template-columns: 1fr;
    gap: 46px;
  }

  .footer-mid {
    grid-template-columns: 1fr 1fr;
    row-gap: 40px;
  }

  .footer-quote {
    justify-self: start;
    text-align: left;
  }

  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .footer-bottom p:nth-child(2) {
    text-align: left;
  }
}

@media (max-width: 560px) {
  .footer-mid {
    grid-template-columns: 1fr 1fr;
    gap: 34px 22px;
  }

  .footer-brand h2 {
    font-size: 2.9rem;
  }

  .newsletter__form {
    flex-direction: column;
    border-bottom: 0;
    gap: 8px;
  }

  .newsletter__form input {
    border-bottom: 1px solid rgba(245, 240, 230, 0.3);
  }

  .newsletter__form button {
    align-self: flex-start;
    padding: 10px 0 4px;
  }
}
</style>
