import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default {
  mounted(el, binding) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const amount = Number(binding.value || 12)
    const trigger = el.closest('[data-parallax]') || el.parentElement || el
    const tween = gsap.fromTo(
      el,
      { yPercent: -amount / 2 },
      {
        yPercent: amount / 2,
        ease: 'none',
        scrollTrigger: {
          trigger: trigger,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.1
        }
      }
    )
    el.__parallaxTween = tween
  },
  unmounted(el) {
    if (el.__parallaxTween) el.__parallaxTween.kill()
    ScrollTrigger.getAll().forEach(function (trigger) {
      if (trigger.trigger === el.parentElement) trigger.kill()
    })
  }
}
