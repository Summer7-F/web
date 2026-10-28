import {
  navItems,
  attractions,
  foods,
  timelineEras,
  galleryItems,
  travelRoutes
} from './site'

const pages = [
  {
    type: '页面',
    title: '首页 · 初见成都',
    en: 'HOME',
    summary: '一城烟火，千年蜀韵。从安顺廊桥的夜色走进成都。',
    path: '/',
    keywords: '成都 蜀运 首页 城市'
  },
  {
    type: '页面',
    title: '古蜀文脉 · 千年回响',
    en: 'HERITAGE',
    summary: '金沙、三国、唐宋、明清与当代，一条可点击的时间轴。',
    path: '/heritage',
    keywords: '历史 非遗 金沙 武侯祠 杜甫 川剧 蜀绣'
  },
  {
    type: '页面',
    title: '锦城漫游 · 城市之间',
    en: 'EXPLORE',
    summary: '宽窄巷子、锦里、春熙路、人民公园与东郊记忆。',
    path: '/explore',
    keywords: '街巷 城市 地图 景点 宽窄 锦里 春熙'
  },
  {
    type: '页面',
    title: '川味人间 · 百味成都',
    en: 'TASTE',
    summary: '火锅、串串、担担面、钟水饺、龙抄手与麻婆豆腐。',
    path: '/food',
    keywords: '美食 火锅 串串 面 麻婆豆腐 小吃'
  },
  {
    type: '页面',
    title: '熊猫与自然 · 生态成都',
    en: 'NATURE',
    summary: '大熊猫、青城山、都江堰、天府绿道与四季风物。',
    path: '/nature',
    keywords: '熊猫 自然 绿道 青城山 都江堰 西岭雪山'
  },
  {
    type: '页面',
    title: '游蜀指南 · 行走成都',
    en: 'TRAVEL',
    summary: '一日、两日、三日路线，按文化、美食、拍照与休闲筛选。',
    path: '/travel',
    keywords: '路线 攻略 行程 交通 地图 一日 两日 三日'
  },
  {
    type: '页面',
    title: '蜀城光影 · 镜头里的成都',
    en: 'GALLERY',
    summary: '夜景、古建、市井、人物与自然，一组城市影像。',
    path: '/gallery',
    keywords: '摄影 图片 夜景 古建 市井 人物 自然'
  }
]

const items = [
  ...pages,
  ...attractions.map(function (item) {
    return {
      type: item.group === 'nature' ? '自然' : item.group === 'heritage' ? '文脉' : '景点',
      title: item.name,
      en: item.en,
      summary: item.summary,
      path: item.group === 'city' ? '/explore?spot=' + item.id : item.group === 'nature' ? '/nature#' + item.id : '/heritage#' + item.id,
      keywords: [item.category, item.tags.join(' '), item.transport, item.story].join(' ')
    }
  }),
  ...foods.map(function (item) {
    return {
      type: '美食',
      title: item.name,
      en: item.en,
      summary: item.tagline,
      path: '/food#' + item.id,
      keywords: [item.category, item.tags.join(' '), item.story].join(' ')
    }
  }),
  ...timelineEras.map(function (item) {
    return {
      type: '文脉',
      title: item.label + ' · ' + item.title,
      en: item.en,
      summary: item.lead,
      path: '/heritage?era=' + item.id,
      keywords: [item.years, item.highlights.join(' '), item.quote].join(' ')
    }
  }),
  ...travelRoutes.map(function (item) {
    return {
      type: '路线',
      title: item.title,
      en: item.en,
      summary: item.subtitle,
      path: '/travel?route=' + item.id,
      keywords: [item.tags.join(' '), item.bestFor, item.intro].join(' ')
    }
  }),
  ...galleryItems.map(function (item) {
    return {
      type: '影像',
      title: item.title,
      en: item.en,
      summary: item.location + ' · ' + item.story,
      path: '/gallery?photo=' + item.id,
      keywords: [item.category, item.location, item.story].join(' ')
    }
  })
]

export const searchIndex = items

export function searchSite(query) {
  const q = String(query || '').trim().toLowerCase()
  if (!q) return []
  return searchIndex.filter(function (item) {
    const haystack = [item.title, item.en, item.summary, item.type, item.keywords]
      .join(' ')
      .toLowerCase()
    return haystack.includes(q)
  })
}
