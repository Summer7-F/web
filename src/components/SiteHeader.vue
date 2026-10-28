<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { navItems } from '../data/site'

const emit = defineEmits(['open-search'])
const route = useRoute()
const solid = ref(false)
const menuOpen = ref(false)
const lastScroll = ref(0)

function onScroll() {
  const y = window.scrollY || 0
  solid.value = y > 48
  lastScroll.value = y
}

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function closeMenu() {
  menuOpen.value = false
}

function onKeydown(event) {
  if (event.key === 'Escape' && menuOpen.value) closeMenu()
}

watch(menuOpen, function (open) {
  document.body.classList.toggle('no-scroll', open)
})

watch(function () { return route.fullPath }, closeMenu)

onMounted(function () {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(function () {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKeydown)
  document.body.classList.remove('no-scroll')
})
</script>

<template>
  <header
    class="site-header"
    :class="{ 'is-solid': solid, 'is-menu-open': menuOpen }"
  >
    <div class="header-inner">
      <RouterLink to="/" class="brand" aria-label="蜀运 SHU YUN 首页" @click="closeMenu">
        <span class="brand-seal" aria-hidden="true">蜀</span>
        <span class="brand-type">
          <strong>蜀运</strong>
          <small>SHU YUN</small>
        </span>
      </RouterLink>

      <nav class="desktop-nav" aria-label="主导航">
        <RouterLink
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="nav-link"
        >
          <span class="nav-index">{{ item.index }}</span>
          <span class="nav-label">{{ item.label }}</span>
        </RouterLink>
      </nav>

      <div class="header-actions">
        <button class="icon-btn" type="button" aria-label="搜索全站" @click="emit('open-search')">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="10.8" cy="10.8" r="6.3" stroke="currentColor" stroke-width="1.2" />
            <path d="m15.6 15.6 4.2 4.2" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />
          </svg>
        </button>
        <RouterLink to="/travel" class="plan-link">行程规划 <span>PLAN</span></RouterLink>
        <button
          class="menu-btn"
          type="button"
          :aria-expanded="menuOpen"
          aria-controls="mobile-menu"
          :aria-label="menuOpen ? '关闭菜单' : '打开菜单'"
          @click="toggleMenu"
        >
          <span :class="{ open: menuOpen }"></span>
          <span :class="{ open: menuOpen }"></span>
        </button>
      </div>
    </div>

    <div class="header-rule" aria-hidden="true"></div>
  </header>

  <Teleport to="body">
    <Transition name="menu">
      <div v-if="menuOpen" id="mobile-menu" class="mobile-menu">
        <div class="mobile-menu__inner">
          <div class="mobile-menu__top">
            <p class="eyebrow">MENU · 城市目录</p>
            <p class="mobile-menu__coords">30.67°N · 104.06°E</p>
          </div>

          <nav class="mobile-nav" aria-label="移动端主导航">
            <RouterLink
              v-for="(item, index) in navItems"
              :key="item.path"
              :to="item.path"
              class="mobile-link"
              :style="{ '--delay': index * 0.055 + 's' }"
              @click="closeMenu"
            >
              <span class="mobile-link__num">{{ item.index }}</span>
              <span class="mobile-link__cn">{{ item.label }}</span>
              <span class="mobile-link__en">{{ item.en }}</span>
              <span class="mobile-link__arrow">↗</span>
            </RouterLink>
          </nav>

          <div class="mobile-menu__bottom">
            <p>一城烟火，千年蜀韵。</p>
            <div class="mobile-menu__links">
              <RouterLink to="/gallery" @click="closeMenu">影像</RouterLink>
              <RouterLink to="/travel" @click="closeMenu">路线</RouterLink>
              <button type="button" @click="closeMenu(); emit('open-search')">搜索</button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.site-header {
  position: fixed;
  inset: 0 0 auto;
  z-index: 11000;
  color: var(--paper);
  transition: background 0.45s var(--ease), color 0.45s var(--ease), border-color 0.45s var(--ease);
}

.site-header::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(12, 16, 16, 0.52), transparent);
  pointer-events: none;
  transition: opacity 0.45s var(--ease);
}

.site-header.is-solid::before {
  opacity: 0;
}

.site-header.is-solid {
  background: rgba(245, 240, 230, 0.92);
  color: var(--ink);
  backdrop-filter: blur(18px);
  border-bottom: 1px solid rgba(30, 36, 40, 0.08);
}

.site-header.is-menu-open {
  background: transparent;
  color: var(--paper);
  border-color: transparent;
  backdrop-filter: none;
}

.site-header.is-menu-open::before {
  opacity: 0;
}

.header-inner {
  position: relative;
  z-index: 1;
  width: min(1540px, calc(100vw - 72px));
  height: var(--header-h);
  margin-inline: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  flex: 0 0 auto;
}

.brand-seal {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  background: var(--red);
  color: var(--gold-3);
  font-family: var(--font-serif);
  font-size: 21px;
  line-height: 1;
  box-shadow: inset 0 0 0 3px var(--red), inset 0 0 0 4px rgba(229, 205, 148, 0.6);
  transition: transform 0.4s var(--ease);
}

.brand:hover .brand-seal {
  transform: rotate(-4deg) scale(1.04);
}

.brand-type {
  display: flex;
  flex-direction: column;
  gap: 0;
  line-height: 1;
}

.brand-type strong {
  font-family: var(--font-serif);
  font-size: 21px;
  font-weight: 600;
  letter-spacing: 0.14em;
}

.brand-type small {
  margin-top: 5px;
  font-family: var(--font-display);
  font-size: 9px;
  letter-spacing: 0.38em;
  opacity: 0.68;
}

.desktop-nav {
  display: flex;
  align-items: center;
  gap: clamp(14px, 2vw, 30px);
}

.nav-link {
  position: relative;
  display: inline-flex;
  align-items: baseline;
  gap: 6px;
  padding: 10px 0;
  font-size: 12px;
  letter-spacing: 0.08em;
  white-space: nowrap;
}

.nav-link::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 2px;
  width: 100%;
  height: 1px;
  background: var(--gold);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.4s var(--ease);
}

.nav-link:hover::after,
.nav-link.router-link-active::after {
  transform: scaleX(1);
  transform-origin: left;
}

.nav-link.router-link-active {
  color: var(--gold-2);
}

.is-solid .nav-link.router-link-active {
  color: var(--red);
}

.nav-index {
  font-family: var(--font-display);
  font-size: 9px;
  letter-spacing: 0;
  opacity: 0.55;
}

.nav-label {
  font-weight: 500;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 20px;
  flex: 0 0 auto;
}

.icon-btn {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  color: currentColor;
  transition: color 0.3s var(--ease), transform 0.3s var(--ease);
}

.icon-btn svg {
  width: 20px;
  height: 20px;
}

.icon-btn:hover {
  color: var(--gold);
  transform: translateY(-1px);
}

.plan-link {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 8px 0;
  border-bottom: 1px solid currentColor;
  font-size: 10px;
  letter-spacing: 0.16em;
  line-height: 1.2;
  text-transform: uppercase;
}

.plan-link span {
  font-family: var(--font-display);
  font-size: 9px;
  letter-spacing: 0.14em;
  opacity: 0.6;
}

.menu-btn {
  display: none;
  place-items: center;
  width: 38px;
  height: 38px;
  position: relative;
}

.menu-btn span {
  position: absolute;
  left: 9px;
  width: 20px;
  height: 1px;
  background: currentColor;
  transition: transform 0.35s var(--ease), top 0.35s var(--ease);
}

.menu-btn span:first-child {
  top: 15px;
}

.menu-btn span:last-child {
  top: 22px;
}

.menu-btn span.open:first-child {
  top: 19px;
  transform: rotate(45deg);
}

.menu-btn span.open:last-child {
  top: 19px;
  transform: rotate(-45deg);
}

.header-rule {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  background: rgba(245, 240, 230, 0.14);
  transition: opacity 0.4s var(--ease);
}

.is-solid .header-rule {
  opacity: 0;
}

/* ---------- mobile menu ---------- */
.mobile-menu {
  position: fixed;
  inset: 0;
  z-index: 10500;
  overflow-y: auto;
  background:
    radial-gradient(circle at 82% 12%, rgba(201, 163, 92, 0.12), transparent 30%),
    var(--green-deep);
  color: var(--paper);
}

.mobile-menu::before {
  content: "蜀";
  position: absolute;
  right: -3vw;
  bottom: -13vw;
  font-family: var(--font-brush);
  font-size: min(56vw, 580px);
  line-height: 1;
  color: rgba(245, 240, 230, 0.035);
  pointer-events: none;
}

.mobile-menu__inner {
  position: relative;
  z-index: 1;
  width: min(980px, calc(100vw - 72px));
  min-height: 100%;
  margin-inline: auto;
  padding: calc(var(--header-h) + 42px) 0 44px;
  display: flex;
  flex-direction: column;
}

.mobile-menu__top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--line-light);
}

.mobile-menu__top .eyebrow {
  margin: 0;
  color: var(--gold-2);
}

.mobile-menu__coords {
  font-family: var(--font-display);
  font-size: 10px;
  letter-spacing: 0.16em;
  color: rgba(245, 240, 230, 0.44);
}

.mobile-nav {
  display: flex;
  flex-direction: column;
  margin-top: clamp(24px, 4vh, 48px);
}

.mobile-link {
  display: grid;
  grid-template-columns: 46px 1fr auto 26px;
  align-items: baseline;
  gap: 16px;
  padding: clamp(11px, 1.6vh, 18px) 0;
  border-bottom: 1px solid rgba(245, 240, 230, 0.12);
  animation: menu-in 0.7s var(--ease) both;
  animation-delay: var(--delay);
}

.mobile-link__num {
  font-family: var(--font-display);
  font-size: 13px;
  color: var(--gold-2);
  letter-spacing: 0.08em;
}

.mobile-link__cn {
  font-family: var(--font-serif);
  font-size: clamp(2rem, 5.4vw, 4rem);
  font-weight: 500;
  line-height: 1.1;
}

.mobile-link__en {
  font-family: var(--font-display);
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(245, 240, 230, 0.44);
}

.mobile-link__arrow {
  color: var(--gold);
  font-size: 13px;
  transition: transform 0.35s var(--ease);
}

.mobile-link.router-link-active .mobile-link__cn {
  color: var(--gold-2);
}

.mobile-link:hover .mobile-link__arrow {
  transform: translate(3px, -3px);
}

.mobile-menu__bottom {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 28px;
  margin-top: auto;
  padding-top: 48px;
  color: rgba(245, 240, 230, 0.55);
  font-size: 12px;
  letter-spacing: 0.16em;
}

.mobile-menu__links {
  display: flex;
  gap: 22px;
  font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.mobile-menu__links a:hover,
.mobile-menu__links button:hover {
  color: var(--gold-2);
}

.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.45s var(--ease), transform 0.55s var(--ease);
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-3%);
}

@keyframes menu-in {
  from {
    opacity: 0;
    transform: translateY(22px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 1120px) {
  .desktop-nav {
    display: none;
  }

  .menu-btn {
    display: grid;
  }

  .header-inner {
    width: calc(100vw - 48px);
  }

  .plan-link {
    display: none;
  }
}

@media (max-width: 600px) {
  .header-inner {
    width: calc(100vw - 36px);
    gap: 10px;
  }

  .brand-seal {
    width: 33px;
    height: 33px;
    font-size: 18px;
  }

  .brand-type strong {
    font-size: 18px;
  }

  .brand-type small {
    font-size: 8px;
  }

  .header-actions {
    gap: 12px;
  }

  .mobile-menu__inner {
    width: calc(100vw - 36px);
  }

  .mobile-link {
    grid-template-columns: 32px 1fr 18px;
    gap: 12px;
  }

  .mobile-link__en {
    display: none;
  }

  .mobile-menu__bottom {
    align-items: flex-start;
    flex-direction: column;
    gap: 16px;
    padding-top: 36px;
  }
}
</style>
