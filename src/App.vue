<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
import SearchOverlay from './components/SearchOverlay.vue'

const route = useRoute()
const searchOpen = ref(false)
const progress = ref(0)
const toast = ref('')
let toastTimer = null

function onScroll() {
  const doc = document.documentElement
  const max = doc.scrollHeight - window.innerHeight
  progress.value = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
}

function openSearch() {
  searchOpen.value = true
}

function onToast(event) {
  toast.value = event.detail
  if (toastTimer) window.clearTimeout(toastTimer)
  toastTimer = window.setTimeout(function () {
    toast.value = ''
  }, 3200)
}

function onKeydown(event) {
  const target = event.target
  const typing = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault()
    searchOpen.value = !searchOpen.value
    return
  }
  if (event.key === '/' && !typing) {
    event.preventDefault()
    searchOpen.value = true
  }
}

watch(function () { return route.fullPath }, function () {
  searchOpen.value = false
  nextTick(function () {
    window.setTimeout(function () {
      ScrollTrigger.refresh()
    }, 620)
  })
})

onMounted(function () {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)
  window.addEventListener('shuyun-toast', onToast)
  window.addEventListener('resize', onScroll)
})

onBeforeUnmount(function () {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKeydown)
  window.removeEventListener('shuyun-toast', onToast)
  window.removeEventListener('resize', onScroll)
  if (toastTimer) window.clearTimeout(toastTimer)
})
</script>

<template>
  <a class="skip-link" href="#main-content">跳到主要内容</a>
  <div class="site-shell">
    <div class="grain" aria-hidden="true"></div>
    <div class="scroll-progress" aria-hidden="true">
      <span :style="{ transform: 'scaleX(' + progress + ')' }"></span>
    </div>

    <SiteHeader @open-search="openSearch" />

    <main id="main-content">
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" :key="route.path" />
        </Transition>
      </RouterView>
    </main>

    <SiteFooter />
    <SearchOverlay :open="searchOpen" @close="searchOpen = false" />

    <Transition name="toast">
      <div v-if="toast" class="toast" role="status">{{ toast }}</div>
    </Transition>
  </div>
</template>
