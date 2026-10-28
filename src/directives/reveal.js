import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function reducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export default {
  mounted(el, binding) {
    if (reducedMotion()) return
    const options = binding.value || {}
    const delay = options.delay || 0
    const distance = options.distance || 36
    el.classList.add('reveal-pending')
    const tween = gsap.fromTo(
      el,
      { y: distance, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: options.duration || 1.1,
        delay,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: el,
          start: options.start || 'top 90%',
          once: true
        },
        onComplete: function () {
          el.classList.remove('reveal-pending')
        }
      }
    )
    el.__revealTween = tween
  },
  unmounted(el) {
    if (el.__revealTween) el.__revealTween.kill()
    ScrollTrigger.getAll().forEach(function (trigger) {
      if (trigger.trigger === el) trigger.kill()
    })
  }
}
