export const navItems = [
  { index: '01', label: '古蜀文脉', en: 'Heritage', path: '/heritage' },
  { index: '02', label: '锦城漫游', en: 'Explore', path: '/explore' },
  { index: '03', label: '川味人间', en: 'Taste', path: '/food' },
  { index: '04', label: '熊猫与自然', en: 'Nature', path: '/nature' },
  { index: '05', label: '游蜀指南', en: 'Travel', path: '/travel' },
  { index: '06', label: '蜀城光影', en: 'Gallery', path: '/gallery' }
]

export const themeCards = [
  {
    id: 'heritage',
    num: '01',
    title: '古蜀文脉',
    en: 'HISTORY & HERITAGE',
    desc: '从金沙神鸟到三国祠庙，在时间深处听见成都。',
    tags: ['金沙遗址', '武侯祠', '川剧变脸'],
    image: 'images/jinsha-sunbird.webp',
    path: '/heritage',
    size: 'feature'
  },
  {
    id: 'explore',
    num: '02',
    title: '锦城漫游',
    en: 'EXPLORE CHENGDU',
    desc: '巷陌、街市与公园，把城市走成一张地图。',
    tags: ['宽窄巷子', '锦里', '春熙路'],
    image: 'images/jinli-lanterns.webp',
    path: '/explore',
    size: 'wide'
  },
  {
    id: 'food',
    num: '03',
    title: '川味人间',
    en: 'TASTE OF CHENGDU',
    desc: '一锅红汤，一碗面，成都人的日子热气腾腾。',
    tags: ['火锅', '串串', '担担面'],
    image: 'images/hotpot-pot.webp',
    path: '/food',
    size: 'wide'
  },
  {
    id: 'nature',
    num: '04',
    title: '熊猫与自然',
    en: 'PANDAS & NATURE',
    desc: '在竹林、雪山与绿道之间，重新学会慢下来。',
    tags: ['大熊猫', '青城山', '天府绿道'],
    image: 'images/panda-grass.webp',
    path: '/nature',
    size: 'third'
  },
  {
    id: 'travel',
    num: '05',
    title: '游蜀指南',
    en: 'TRAVEL PLANNER',
    desc: '一日、两日、三日，把想看的成都排进行程。',
    tags: ['路线', '交通', '地图'],
    image: 'images/anshun-gold.webp',
    path: '/travel',
    size: 'third'
  },
  {
    id: 'gallery',
    num: '06',
    title: '蜀城光影',
    en: 'GALLERY & STORIES',
    desc: '镜头替城市记住那些稍纵即逝的光。',
    tags: ['夜景', '古建', '市井'],
    image: 'images/chunxi-night.webp',
    path: '/gallery',
    size: 'third'
  }
]

export const stats = [
  { value: '2300+', unit: '年', label: '建城史', en: 'YEARS OF CITY' },
  { value: '2', unit: '项', label: '世界遗产', en: 'WORLD HERITAGE' },
  { value: '6', unit: '章', label: '城市主题', en: 'CURATED STORIES' },
  { value: '1', unit: '座', label: '雪山下的公园城市', en: 'PARK CITY' }
]

export const timelineEras = [
  {
    id: 'gushu',
    label: '古蜀',
    years: '约前1200—前316',
    title: '神鸟负日，金沙醒来',
    en: 'THE SHU KINGDOM',
    lead: '在成都平原的晨雾里，古蜀人把太阳、神鸟与黄金，铸成了自己的宇宙。',
    body: '金沙遗址出土的太阳神鸟金箔，以十二道旋转的光芒与四只神鸟，成为古蜀文明最轻盈也最耀眼的注脚。金面具、象牙与玉器，则让一座三千年前的王都重新被看见。',
    image: 'images/jinsha-sunbird.webp',
    imagePosition: 'center',
    highlights: ['金沙遗址', '太阳神鸟', '古蜀王都'],
    quote: '十二道光，转出古蜀人的日出与日落。'
  },
  {
    id: 'sanguo',
    label: '三国',
    years: '221—263',
    title: '红墙竹影，忠义入蜀',
    en: 'THREE KINGDOMS',
    lead: '成都曾是蜀汉都城。英雄故事穿过一千八百年，落进红墙、柏树与祠庙的阴影里。',
    body: '武侯祠始建于公元223年，是中国唯一的君臣合祀祠庙。刘备殿、诸葛亮殿与红墙夹道，让“鞠躬尽瘁”的叙事有了可以行走的现场。',
    image: 'images/wuhou-gate.webp',
    imagePosition: 'center',
    highlights: ['武侯祠', '蜀汉都城', '三国文化'],
    quote: '出师未捷身先死，长使英雄泪满襟。'
  },
  {
    id: 'tang song',
    label: '唐宋',
    years: '618—1279',
    title: '花重锦官，诗酒成都',
    en: 'TANG & SONG',
    lead: '唐宋的成都，是“扬一益二”的繁华都会，也是诗人笔下的温柔乡。',
    body: '杜甫在浣花溪畔筑草堂，留下“晓看红湿处，花重锦官城”。薛涛、陆游、范成大先后在此留下诗篇。蜀锦、漆器与雕版印刷，让城市的风雅有了具体的形状。',
    image: 'images/dufu-cottage.webp',
    imagePosition: 'center',
    highlights: ['杜甫草堂', '锦官城', '蜀锦'],
    quote: '晓看红湿处，花重锦官城。'
  },
  {
    id: 'mingqing',
    label: '明清',
    years: '1368—1912',
    title: '少城烟火，市井成诗',
    en: 'MING & QING',
    lead: '城墙、街巷与茶馆，把成都慢慢养成了一座懂得生活的城。',
    body: '清康熙年间，成都筑满城，宽窄巷子的肌理由此生长。文殊院的香火、人民公园的茶桌、锦江边的码头，共同拼出老成都的日常。',
    image: 'images/kuanzhai-lane.webp',
    imagePosition: 'center',
    highlights: ['少城', '宽窄巷子', '茶馆生活'],
    quote: '青砖黛瓦间，藏着一座城的慢。'
  },
  {
    id: 'modern',
    label: '当代',
    years: '1949—今',
    title: '雪山之下，公园生长',
    en: 'CONTEMPORARY',
    lead: '今天的成都，一边是太古里的霓虹，一边是绿道尽头的稻田与雪山。',
    body: '从东郊老厂房到天府艺术公园，从环城绿道到城市天际线，成都把“公园城市”写进日常。它仍然爱喝茶、爱摆龙门阵，也仍然相信，生活比速度更重要。',
    image: 'images/skyline-tower.webp',
    imagePosition: 'center',
    highlights: ['公园城市', '东郊记忆', '天府绿道'],
    quote: '在成都，远方与日常可以住在同一条街。'
  }
]

export const heritageSites = [
  {
    id: 'jinsha',
    name: '金沙遗址',
    en: 'JINSHA SITE',
    era: '约前1200—前650',
    image: 'images/jinsha-mask.webp',
    imagePosition: 'center',
    text: '太阳神鸟金箔、金面具与成堆象牙，让古蜀王都从传说里醒来。博物馆的螺旋展厅，像一条回到三千年前的时间隧道。',
    tag: '古蜀文明'
  },
  {
    id: 'wuhou',
    name: '武侯祠',
    en: 'WUHOU SHRINE',
    era: '始建于 223 年',
    image: 'images/wuhou-ginkgo.webp',
    imagePosition: 'center',
    text: '中国唯一的君臣合祀祠庙。红墙夹道、古柏森森，刘备与诸葛亮的故事在这里被反复讲述。',
    tag: '三国文化'
  },
  {
    id: 'dufu',
    name: '杜甫草堂',
    en: 'DU FU COTTAGE',
    era: '759 年',
    image: 'images/dufu-cottage.webp',
    imagePosition: 'center',
    text: '杜甫在浣花溪畔生活近四年，写下两百四十余首诗。茅屋、竹林与溪水，仍保留着诗里的清贫与辽阔。',
    tag: '诗歌圣地'
  },
  {
    id: 'wenshu',
    name: '文殊院',
    en: 'WENSHU MONASTERY',
    era: '始建于隋',
    image: 'images/wenshu-panorama.webp',
    imagePosition: 'center',
    text: '川西著名佛教丛林。红墙外是车水马龙，红墙内是香火、银杏与一碗素斋，成都的闹与静只隔一道门。',
    tag: '佛教文化'
  }
]

export const crafts = [
  {
    id: 'opera',
    title: '川剧 · 变脸',
    en: 'SICHUAN OPERA',
    image: 'images/opera-mask.webp',
    imagePosition: 'center',
    kicker: '一瞬千面',
    text: '川剧成形于清代，融合昆、高、胡、弹、灯五种声腔。变脸、吐火、滚灯，是舞台上最令人屏息的绝技。脸谱一翻，忠奸喜怒在毫秒之间切换。',
    facts: ['2006 年列入国家级非遗', '变脸手法属行业秘密', '成都人叫它“川戏”'],
    quote: '台上一转身，已是另一张脸。'
  },
  {
    id: 'embroidery',
    title: '蜀绣 · 针尖山河',
    en: 'SHU EMBROIDERY',
    image: 'images/shu-panda.webp',
    imagePosition: 'center',
    kicker: '一线千丝',
    text: '蜀绣与苏绣、湘绣、粤绣并称中国四大名绣。以针代笔、以线晕色，熊猫的绒毛、锦鲤的鳞光、芙蓉的花瓣，都能在丝线里获得呼吸。',
    facts: ['2006 年列入国家级非遗', '针法逾百种', '成都又称“锦官城”'],
    quote: '一根丝线，也能绣出山河的呼吸。'
  }
]

export const cityWalks = [
  {
    id: 'half-day',
    title: '半日老城',
    en: 'OLD TOWN HALF DAY',
    duration: '约 4 小时',
    spots: ['宽窄巷子', '人民公园', '锦里'],
    text: '从青砖巷子走到竹椅茶桌，再到灯笼亮起的锦里。',
    image: 'images/peoples-park.webp'
  },
  {
    id: 'night-river',
    title: '夜色锦江',
    en: 'RIVER NIGHT WALK',
    duration: '约 3 小时',
    spots: ['春熙路', '安顺廊桥', '建设路夜市'],
    text: '霓虹、桥影与夜市烟火，一条属于夜晚的成都。',
    image: 'images/anshun-gold.webp'
  },
  {
    id: 'east-art',
    title: '文艺东郊',
    en: 'EAST END ART',
    duration: '约 4 小时',
    spots: ['东郊记忆', '建设路夜市', '安顺廊桥'],
    text: '旧厂房、黑胶唱片与路边摊，工业记忆的另一种浪漫。',
    image: 'images/eastmemory-7.webp'
  }
]

export const attractions = [
  {
    id: 'kuanzhai',
    group: 'city',
    category: '历史街巷',
    name: '宽窄巷子',
    en: 'KUANZHAI ALLEYS',
    image: 'images/kuanzhai-lane.webp',
    imagePosition: 'center',
    coords: '104.0555,30.6690',
    map: { x: 39, y: 40 },
    best: '清晨 / 傍晚',
    duration: '2–3 小时',
    transport: '地铁 4 号线宽窄巷子站 B 口',
    summary: '青砖黛瓦的川西院落，成都慢生活的一张名片。',
    story: '清康熙年间，成都筑满城，宽巷子、窄巷子与井巷子由此生长。今天，老院墙里住进了茶馆、书店、川菜与手作，但青砖、门墩与梧桐树仍保留着旧时的尺度。',
    tip: '上午九点前游客较少，适合拍空镜；井巷子的砖墙浮雕常被错过。',
    tags: ['川西民居', '盖碗茶', '老街']
  },
  {
    id: 'jinli',
    group: 'city',
    category: '历史街巷',
    name: '锦里',
    en: 'JINLI STREET',
    image: 'images/jinli-lanterns.webp',
    imagePosition: 'center',
    coords: '104.0487,30.6464',
    map: { x: 40, y: 64 },
    best: '傍晚 / 入夜',
    duration: '1.5–2 小时',
    transport: '地铁 3/5 号线高升桥站，步行约 15 分钟',
    summary: '紧邻武侯祠的川西古街，灯笼亮起时最有成都味。',
    story: '锦里以三国文化与川西民俗为底色，戏台、糖画、三大炮、茶馆与客栈挤在一条不长的街上。入夜后红灯笼倒映在湿漉漉的石板路上，像一场不散的老成都夜宴。',
    tip: '和武侯祠安排在同半天；想拍灯笼倒影，雨后或刚洒过水的石板路最好看。',
    tags: ['三国文化', '红灯笼', '小吃']
  },
  {
    id: 'wuhou',
    group: 'city',
    category: '历史街巷',
    name: '武侯祠',
    en: 'WUHOU SHRINE',
    image: 'images/wuhou-gate.webp',
    imagePosition: 'center',
    coords: '104.0471,30.6458',
    map: { x: 36, y: 68 },
    best: '上午',
    duration: '1.5–2 小时',
    transport: '地铁 3/5 号线高升桥站 D 口',
    summary: '红墙夹道，竹影森森，中国唯一的君臣合祀祠庙。',
    story: '武侯祠始建于公元223年，纪念刘备、诸葛亮等蜀汉英雄。刘备殿在前，诸葛亮殿在后，一君一臣共享香火。最出圈的红墙夹道在惠陵旁，阳光穿过竹叶，红与绿都变得柔软。',
    tip: '请一位讲解，或租语音导览，三国故事会让建筑活起来。',
    tags: ['三国', '红墙', '竹影']
  },
  {
    id: 'chunxi',
    group: 'city',
    category: '现代都市',
    name: '春熙路',
    en: 'CHUNXI ROAD',
    image: 'images/chunxi-night.webp',
    imagePosition: 'center',
    coords: '104.0816,30.6572',
    map: { x: 63, y: 42 },
    best: '夜晚',
    duration: '2–3 小时',
    transport: '地铁 2/3 号线春熙路站',
    summary: '成都最亮的商业街，霓虹与熊猫一起营业到深夜。',
    story: '春熙路得名于“众人熙熙，如享太牢，如春登台”。1924 年建路至今，它始终是成都的潮流坐标。IFS 楼顶的爬墙熊猫、太古里的青瓦与玻璃幕墙，构成这座城市最混搭的天际线。',
    tip: '拍爬墙熊猫去 IFS 七楼露台；傍晚蓝调时刻，街景与霓虹最平衡。',
    tags: ['商圈', '霓虹', '爬墙熊猫']
  },
  {
    id: 'eastmemory',
    group: 'city',
    category: '现代都市',
    name: '东郊记忆',
    en: 'EASTERN SUBURB MEMORY',
    image: 'images/eastmemory-1.webp',
    imagePosition: 'center',
    coords: '104.1216,30.6721',
    map: { x: 82, y: 35 },
    best: '下午 / 傍晚',
    duration: '2–3 小时',
    transport: '地铁 8 号线东郊记忆站',
    summary: '旧电子管厂改成的音乐与艺术街区，工业风出片地。',
    story: '这里原是成都国营红光电子管厂。红砖厂房、烟囱、管道与铁轨被保留下来，住进了 Livehouse、展览、咖啡馆与买手店。旧机器没有沉默，它们变成了背景里的低音。',
    tip: '工作日下午光线柔和、人少；周末常有市集与演出，气氛更热闹。',
    tags: ['工业遗产', 'Livehouse', '红砖']
  },
  {
    id: 'peoplespark',
    group: 'city',
    category: '休闲生活',
    name: '人民公园',
    en: "PEOPLE'S PARK",
    image: 'images/peoples-park.webp',
    imagePosition: 'center',
    coords: '104.0610,30.6573',
    map: { x: 48, y: 51 },
    best: '下午',
    duration: '2–3 小时',
    transport: '地铁 2 号线人民公园站',
    summary: '竹椅、盖碗茶、采耳与相亲角，成都日常的显微镜。',
    story: '人民公园建于1911年，是成都最早的公园之一。鹤鸣茶社的竹椅一摆，茶盖一掀，时间就慢下来。旁边是相亲角、掏耳朵的师傅、跳坝坝舞的阿姨，成都的生活哲学都在这片树荫下。',
    tip: '点一杯盖碗茶可以坐一下午；采耳按次收费，先问价再体验。',
    tags: ['鹤鸣茶社', '盖碗茶', '慢生活']
  },
  {
    id: 'wenshu',
    group: 'city',
    category: '历史街巷',
    name: '文殊院',
    en: 'WENSHU MONASTERY',
    image: 'images/wenshu-panorama.webp',
    imagePosition: 'center',
    coords: '104.0735,30.6810',
    map: { x: 55, y: 28 },
    best: '上午',
    duration: '1.5–2 小时',
    transport: '地铁 1 号线文殊院站 K 口',
    summary: '红墙内的香火与银杏，红墙外是甜水面和宫廷糕点。',
    story: '文殊院始建于隋，康熙年间重建，是川西著名佛教丛林。院内古木参天，香火与银杏一起落在青石板上。出了山门，洞子口张老二凉粉、宫廷糕点铺和甜水面，又把成都拉回人间。',
    tip: '素斋和禅茶值得一试；周边小吃店排队很长，避开正午。',
    tags: ['古刹', '银杏', '素斋']
  },
  {
    id: 'anshun',
    group: 'city',
    category: '休闲生活',
    name: '安顺廊桥',
    en: 'ANSHUN BRIDGE',
    image: 'images/hero-bridge.webp',
    imagePosition: 'center',
    coords: '104.0870,30.6430',
    map: { x: 61, y: 57 },
    best: '蓝调时刻 / 夜晚',
    duration: '1 小时',
    transport: '地铁 3 号线新南门站，步行约 12 分钟',
    summary: '锦江上最温柔的一盏灯，成都夜景的经典机位。',
    story: '安顺廊桥横跨锦江，始建于清代，今桥为2003年复建。桥上是餐厅与茶座，桥下是游船与倒影。蓝调时刻，桥洞与水面合成一轮满月，城市的喧闹忽然有了留白。',
    tip: '日落后 20–40 分钟最佳，带三脚架或在桥对岸取景。',
    tags: ['锦江', '夜景', '廊桥']
  },
  {
    id: 'jianshe',
    group: 'city',
    category: '休闲生活',
    name: '建设路夜市',
    en: 'JIANSHE ROAD NIGHT MARKET',
    image: 'images/night-market.webp',
    imagePosition: 'center',
    coords: '104.1130,30.6700',
    map: { x: 78, y: 45 },
    best: '晚上 7 点后',
    duration: '1.5–2 小时',
    transport: '地铁 6 号线建设北路站',
    summary: '成都年轻人的深夜食堂，排队最长的一条街。',
    story: '建设路夜市是成都夜宵的浓缩版：烤脑花、蛋烘糕、锅巴土豆、冰粉、钵钵鸡，一条街能从咸吃到甜。霓虹灯牌和油烟一起升起来，才是成都夜晚真正的开场。',
    tip: '少量多样，几个人分食最划算；周末排队久，工作日更从容。',
    tags: ['夜市', '小吃', '烟火气']
  },
  {
    id: 'opera',
    group: 'city',
    category: '休闲生活',
    name: '蜀风雅韵',
    en: 'SHUFENG YAYUN',
    image: 'images/opera-mask.webp',
    imagePosition: 'center',
    coords: '104.0550,30.6650',
    map: { x: 44, y: 47 },
    best: '晚上',
    duration: '1.5 小时',
    transport: '地铁 4 号线宽窄巷子站，步行约 10 分钟',
    summary: '看一场川剧变脸，把成都的热闹看到骨子里。',
    story: '蜀风雅韵藏在琴台路旁的老院子里。锣鼓一响，变脸、吐火、滚灯、手影戏轮番上场。台下的盖碗茶还没凉，台上的脸已经换了好几张。',
    tip: '提前一天订票，前排中间位置体验最好；演出后可到琴台路散步。',
    tags: ['川剧', '变脸', '盖碗茶']
  },
  {
    id: 'jinsha',
    group: 'heritage',
    category: '古蜀文明',
    name: '金沙遗址',
    en: 'JINSHA SITE',
    image: 'images/jinsha-sunbird.webp',
    imagePosition: 'center',
    coords: '104.0115,30.6818',
    map: { x: 20, y: 22 },
    best: '上午',
    duration: '2–3 小时',
    transport: '地铁 7 号线金沙博物馆站',
    summary: '太阳神鸟起飞的地方，古蜀王都的三千年回声。',
    story: '金沙遗址距今约3000年，是古蜀文明继三星堆之后的又一都邑。太阳神鸟金箔、金面具、玉琮与象牙堆积，让一段没有文字的文明有了惊人的视觉语言。',
    tip: '先看遗迹馆再看陈列馆，最后去太阳神鸟金箔前多停留一会儿。',
    tags: ['太阳神鸟', '金面具', '博物馆']
  },
  {
    id: 'dufu',
    group: 'heritage',
    category: '诗歌圣地',
    name: '杜甫草堂',
    en: 'DU FU COTTAGE',
    image: 'images/dufu-cottage.webp',
    imagePosition: 'center',
    coords: '104.0293,30.6600',
    map: { x: 27, y: 54 },
    best: '上午 / 雨后',
    duration: '2–3 小时',
    transport: '地铁 4 号线草堂北路站',
    summary: '浣花溪畔的茅屋，中国诗歌史上一处温柔的坐标。',
    story: '759年，杜甫为避安史之乱入蜀，在浣花溪畔营建草堂，居住近四年，写下240余首诗。今天的草堂是清代重建的纪念性建筑群，竹林、溪水与碑廊仍保留着诗里的清寂。',
    tip: '从南门进、北门出，顺路去浣花溪公园；雨天游客少，更有“润物细无声”的意境。',
    tags: ['杜甫', '茅屋', '浣花溪']
  },
  {
    id: 'panda',
    group: 'nature',
    category: '生态',
    name: '成都大熊猫繁育研究基地',
    en: 'CHENGDU PANDA BASE',
    image: 'images/panda-grass.webp',
    imagePosition: 'center',
    coords: '104.1470,30.7330',
    map: { x: 92, y: 18 },
    best: '清晨 7:30–10:30',
    duration: '3–4 小时',
    transport: '地铁 3 号线熊猫大道站转景区接驳',
    summary: '看熊猫吃早饭、爬树、打架，请一定早起。',
    story: '成都大熊猫繁育研究基地建立于1987年，是集科研、保护、科普与旅游于一体的迁地保护基地。上午是熊猫最活跃的时段，竹子、苹果与饲养员的脚步声，决定了一天的剧情。',
    tip: '至少提前一天预约，开园即入；先坐观光车到最里面的月亮产房，再一路往外看。',
    tags: ['大熊猫', '亲子', '生态保护']
  },
  {
    id: 'qingcheng',
    group: 'nature',
    category: '山野',
    name: '青城山',
    en: 'MOUNT QINGCHENG',
    image: 'images/qingcheng.webp',
    imagePosition: 'center',
    coords: '103.5680,30.9000',
    map: { x: 8, y: 8 },
    best: '春 / 秋',
    duration: '4–6 小时',
    transport: '犀浦站乘城际列车至青城山站',
    summary: '“青城天下幽”，中国道教发源地之一。',
    story: '青城山分前山与后山。前山宫观林立，天师洞、上清宫藏在古木之间；后山溪谷幽深，瀑布与栈道更适合徒步。雨天来，山色空蒙，才懂“幽”字的偏旁为什么是山。',
    tip: '前山看人文，后山看自然；穿防滑鞋，山上湿气重。',
    tags: ['道教', '徒步', '避暑']
  },
  {
    id: 'dujiangyan',
    group: 'nature',
    category: '山野',
    name: '都江堰',
    en: 'DUJIANGYAN',
    image: 'images/dujiangyan.webp',
    imagePosition: 'center',
    coords: '103.6170,31.0020',
    map: { x: 14, y: 5 },
    best: '春 / 夏',
    duration: '3–4 小时',
    transport: '犀浦站乘城际列车至都江堰站',
    summary: '两千多年仍在工作的水利工程，成都平原的生命线。',
    story: '公元前256年，李冰主持修建都江堰，以鱼嘴分水、飞沙堰泄洪、宝瓶口引水，让岷江从猛兽变成母亲河。没有大坝，却驯服了洪水；两千多年过去，它仍在灌溉成都平原。',
    tip: '从离堆公园进，经宝瓶口、飞沙堰到鱼嘴；傍晚南桥的蓝眼泪灯光值得等。',
    tags: ['世界遗产', '水利工程', '南桥']
  },
  {
    id: 'xiling',
    group: 'nature',
    category: '雪山',
    name: '西岭雪山',
    en: 'XILING SNOW MOUNTAIN',
    image: 'images/xiling-snow.webp',
    imagePosition: 'center',
    coords: '103.1830,30.8560',
    map: { x: 4, y: 30 },
    best: '冬季 / 夏季',
    duration: '1 天',
    transport: '成都西站乘动车至大邑站，转景区班车',
    summary: '“窗含西岭千秋雪”，成都人自己的雪山。',
    story: '西岭雪山最高峰大雪塘海拔5364米，是成都平原西缘的雪山屏障。冬季滑雪、夏季避暑，山脚的温泉与山上的云海，构成成都人周末的两小时出逃。',
    tip: '冬季注意保暖与防滑；想看“成都第一峰”，出发前查能见度。',
    tags: ['雪山', '滑雪', '温泉']
  },
  {
    id: 'longquan',
    group: 'nature',
    category: '山野',
    name: '龙泉山城市森林公园',
    en: 'LONGQUAN MOUNTAIN',
    image: 'images/longquan-sunrise.webp',
    imagePosition: 'center',
    coords: '104.2830,30.5500',
    map: { x: 92, y: 70 },
    best: '日出 / 日落',
    duration: '半天',
    transport: '地铁 2 号线龙泉驿站转公交/打车',
    summary: '成都东侧的城市观景台，日出、云海与整座城。',
    story: '龙泉山城市森林公园是成都东侧的生态屏障。丹景台、高空栈道与观景平台，让城市与山野同框。天气好时，向西能看见雪山，向东是起伏的丘陵与果园。',
    tip: '看日出提前查天气与开门时间；山上风大，带一件外套。',
    tags: ['日出', '观景台', '城市森林']
  },
  {
    id: 'greenway',
    group: 'nature',
    category: '绿道',
    name: '天府绿道',
    en: 'TIANFU GREENWAY',
    image: 'images/greenway-aerial.webp',
    imagePosition: 'center',
    coords: '104.0500,30.5700',
    map: { x: 60, y: 80 },
    best: '春秋',
    duration: '2 小时–1 天',
    transport: '环城生态公园各入口，建议骑行',
    summary: '1.69万公里绿道，把城市轻轻放进公园里。',
    story: '天府绿道规划总长1.69万公里，环城生态公园像一条绿色项链，把湖泊、田野、桥梁与骑行道串在一起。成都人周末的日常，是租一辆自行车，骑到一片没有天花板的风景里。',
    tip: '新手选环城生态公园一段即可；带防晒、水和补胎工具。',
    tags: ['骑行', '公园城市', '亲子']
  }
]

export const foods = [
  {
    id: 'hotpot',
    name: '成都火锅',
    en: 'CHENGDU HOTPOT',
    category: '火锅江湖',
    image: 'images/hotpot-spread.webp',
    imagePosition: 'center',
    tagline: '一锅红汤，煮尽人间热闹。',
    summary: '牛油、辣椒与花椒在锅里翻滚，毛肚七上八下，鸭肠十秒起锅。',
    story: '成都火锅以牛油红锅为底，讲究“麻、辣、鲜、香、烫”。桌上必配香油碟，蒜泥与香菜压住辣意，也提住香气。它不只是一顿饭，更是一场持续两小时的社交。',
    flavors: { 麻: 4, 辣: 5, 鲜: 4, 香: 5 },
    tags: ['牛油红锅', '毛肚', '香油碟'],
    price: '人均 ¥80–150',
    where: '玉林 / 九眼桥 / 建设路',
    tip: '第一次吃建议微辣鸳鸯锅；先涮肉再煮菜，最后下粉。'
  },
  {
    id: 'chuanchuan',
    name: '串串香',
    en: 'CHUANCHUAN SKEWERS',
    category: '火锅江湖',
    image: 'images/chuanchuan.webp',
    imagePosition: 'center',
    tagline: '把一座城的烟火，串在竹签上。',
    summary: '自选食材、自己煮，最后按签签结账，是成都最自在的火锅。',
    story: '串串香是火锅的市井版本。牛肉、郡肝、藕片、土豆穿在竹签上，往红汤里一放，吃完数签结账。它比火锅更随意，也更适合一个人或两个人，在深夜坐下来慢慢吃。',
    flavors: { 麻: 4, 辣: 5, 鲜: 3, 香: 5 },
    tags: ['竹签', '数签签', '干碟'],
    price: '人均 ¥50–90',
    where: '玉林 / 致民路 / 建设路',
    tip: '干碟加花生碎更香；牛肉签和郡肝是本地人常点的。'
  },
  {
    id: 'dandan',
    name: '担担面',
    en: 'DANDAN NOODLES',
    category: '面食小吃',
    image: 'images/dandan-bowl.webp',
    imagePosition: 'center',
    tagline: '一碗干拌面，藏着成都的麻辣鲜香。',
    summary: '面条细薄，肉臊酥香，芽菜、花生碎与红油在碗底等你拌匀。',
    story: '旧时小贩挑着扁担沿街叫卖，一头是炉灶，一头是碗筷，“担担面”因此得名。正宗吃法是干拌：面条煮好沥干，倒进调好底料的碗里，从下往上拌匀，让每一根面都裹上酱汁。',
    flavors: { 麻: 3, 辣: 4, 鲜: 4, 香: 4 },
    tags: ['干拌', '芽菜', '花生碎'],
    price: '人均 ¥12–25',
    where: '老城区面馆 / 洞子口',
    tip: '上桌立刻拌，不然面会坨；怕辣可以少红油，但别省芽菜。'
  },
  {
    id: 'zhong',
    name: '钟水饺',
    en: 'ZHONG DUMPLINGS',
    category: '面食小吃',
    image: 'images/zhong-dumplings.webp',
    imagePosition: 'center',
    tagline: '红油里的一点甜，是成都的温柔。',
    summary: '皮薄馅嫩的猪肉水饺，淋上复制红油、蒜泥与一点甜酱油。',
    story: '钟水饺始于清末，是成都小吃里少见的“甜辣口”。它不用汤，饺子煮好沥干，淋上红油、蒜泥与甜酱油，再撒芝麻。辣在前，甜在后，像成都人吵架时的语气，凶巴巴又留着余地。',
    flavors: { 麻: 2, 辣: 3, 鲜: 3, 香: 4 },
    tags: ['红油', '甜辣', '蒜泥'],
    price: '人均 ¥15–25',
    where: '钟水饺门店 / 老字号小吃店',
    tip: '先吃原味，再把饺子翻个面裹满红油；配一碗带丝汤刚好。'
  },
  {
    id: 'chaoshou',
    name: '龙抄手',
    en: 'LONG CHAOSHOU',
    category: '面食小吃',
    image: 'images/chaoshou.webp',
    imagePosition: 'center',
    tagline: '皮薄如纸，一口鲜汤。',
    summary: '成都版馄饨，清汤鲜、红油香，皮薄馅嫩，入口即化。',
    story: '“抄手”是四川人对馄饨的叫法，因包法像双手抄拢而得名。龙抄手以皮薄、馅嫩、汤鲜著称，清汤用鸡、鸭、猪骨熬制，红油则香而不燥。一碗下肚，是成都人最妥帖的早餐或宵夜。',
    flavors: { 麻: 2, 辣: 3, 鲜: 4, 香: 4 },
    tags: ['清汤', '红油', '皮薄'],
    price: '人均 ¥15–30',
    where: '春熙路 / 老字号小吃店',
    tip: '第一次建议点红油抄手，再配一碗清汤抄手，两种都尝。'
  },
  {
    id: 'mapo',
    name: '麻婆豆腐',
    en: 'MAPO TOFU',
    category: '川菜经典',
    image: 'images/mapo-tofu.webp',
    imagePosition: 'center',
    tagline: '麻、辣、烫、香、酥、嫩、鲜、活。',
    summary: '一勺豆腐一勺饭，红油亮、花椒麻，是川菜的入门课。',
    story: '清同治年间，陈麻婆在成都万福桥边卖豆腐。她用牛肉臊子、豆瓣、花椒与辣椒烧豆腐，没想到成了川菜的招牌。正宗的麻婆豆腐讲究“麻、辣、烫、香、酥、嫩、鲜、活”，趁热吃才懂。',
    flavors: { 麻: 4, 辣: 4, 鲜: 4, 香: 4 },
    tags: ['陈麻婆', '豆瓣', '花椒'],
    price: '人均 ¥30–60',
    where: '陈麻婆豆腐 / 川菜馆',
    tip: '配白米饭，不要用勺子压碎豆腐；趁烫吃，花椒香最明显。'
  },
  {
    id: 'tangyou',
    name: '糖油果子',
    en: 'TANGYOU GUOZI',
    category: '街头烟火',
    image: 'images/street-food.webp',
    imagePosition: 'center',
    tagline: '外脆内糯，甜得理直气壮。',
    summary: '糯米团炸至金黄，滚上红糖与芝麻，是成都街头的甜味信号。',
    story: '糯米粉团下油锅，炸到外壳酥脆，再滚上浓稠红糖与白芝麻。咬开时先是脆壳，再是软糯，最后是红糖的焦香。它常出现在学校门口、菜市场与老巷子，是成都人从小吃到大的零嘴。',
    flavors: { 麻: 0, 辣: 0, 鲜: 1, 香: 5 },
    tags: ['红糖', '糯米', '芝麻'],
    price: '人均 ¥5–10',
    where: '宽窄巷子 / 建设路 / 老小区门口',
    tip: '刚出锅最好吃，放凉会变硬；两个人分一串刚好。'
  }
]

export const foodCategories = ['全部', '火锅江湖', '面食小吃', '川菜经典', '街头烟火']

export const natureFacts = [
  {
    title: '竹子是主食',
    value: '12–38 kg',
    text: '成年大熊猫每天要吃掉相当于体重四分之一的竹子。因为消化率低，它们必须不停地吃。',
    icon: '竹'
  },
  {
    title: '伪拇指',
    value: '6 指',
    text: '大熊猫的前掌有一个由腕骨演化而来的“伪拇指”，帮助它们稳稳握住竹竿。',
    icon: '掌'
  },
  {
    title: '新生幼崽',
    value: '约 100 g',
    text: '刚出生的熊猫幼崽只有母熊体重的千分之一，粉红色、无毛、还不会睁眼。',
    icon: '幼'
  },
  {
    title: '独居主义者',
    value: '1 熊 1 域',
    text: '野生大熊猫大多是独居动物，靠气味标记划分领地。春天，它们才会为爱相聚。',
    icon: '野'
  }
]

export const natureSpots = [
  {
    id: 'panda',
    name: '大熊猫基地',
    en: 'PANDA BASE',
    image: 'images/panda-grass.webp',
    type: '生态保护',
    distance: '市区约 30 分钟',
    time: '3–4 小时',
    text: '清晨看熊猫吃早饭，是成都最治愈的早课。'
  },
  {
    id: 'qingcheng',
    name: '青城山',
    en: 'MOUNT QINGCHENG',
    image: 'images/qingcheng.webp',
    type: '世界遗产',
    distance: '市区约 1.5 小时',
    time: '4–6 小时',
    text: '“青城天下幽”，在古木与宫观之间走一段山路。'
  },
  {
    id: 'dujiangyan',
    name: '都江堰',
    en: 'DUJIANGYAN',
    image: 'images/dujiangyan.webp',
    type: '世界遗产',
    distance: '市区约 1.5 小时',
    time: '3–4 小时',
    text: '两千多年仍在工作的水利工程，成都平原的生命线。'
  },
  {
    id: 'xiling',
    name: '西岭雪山',
    en: 'XILING SNOW MOUNTAIN',
    image: 'images/xiling-snow.webp',
    type: '雪山',
    distance: '市区约 2 小时',
    time: '1 天',
    text: '“窗含西岭千秋雪”，成都人自己的雪山。'
  },
  {
    id: 'longquan',
    name: '龙泉山',
    en: 'LONGQUAN MOUNTAIN',
    image: 'images/longquan-sunrise.webp',
    type: '城市森林',
    distance: '市区约 1 小时',
    time: '半天',
    text: '在东侧的山脊上，看日出把整座城市点亮。'
  },
  {
    id: 'greenway',
    name: '天府绿道',
    en: 'TIANFU GREENWAY',
    image: 'images/greenway-bridge.webp',
    type: '公园城市',
    distance: '出门即达',
    time: '2 小时–1 天',
    text: '骑行、野餐、发呆，把周末交给一条没有天花板的绿道。'
  }
]

export const seasons = [
  {
    id: 'spring',
    label: '春',
    en: 'SPRING',
    months: '3–5 月',
    title: '花重锦官城',
    text: '海棠、樱花、油菜花依次醒来。去青城山问茶，去龙泉山看桃花，或在人民公园的树下坐一个下午。',
    image: 'images/qingcheng-trail.webp',
    spots: ['青城山问茶', '龙泉山桃花', '人民公园海棠']
  },
  {
    id: 'summer',
    label: '夏',
    en: 'SUMMER',
    months: '6–8 月',
    title: '山里藏着一个凉季',
    text: '成都的夏天要往山里走。都江堰的岷江风、青城后山的溪水、虹口的漂流，都是天然的空调。',
    image: 'images/dujiangyan.webp',
    spots: ['都江堰放水节', '青城后山', '虹口漂流']
  },
  {
    id: 'autumn',
    label: '秋',
    en: 'AUTUMN',
    months: '9–11 月',
    title: '银杏落成诗',
    text: '成都的秋天很短，所以格外珍贵。银杏大道、电子科大、人民公园，一阵风就把城市染成金色。',
    image: 'images/ginkgo-avenue.webp',
    spots: ['银杏大道', '电子科大', '人民公园']
  },
  {
    id: 'winter',
    label: '冬',
    en: 'WINTER',
    months: '12–2 月',
    title: '窗含西岭千秋雪',
    text: '市区阴冷，山上落雪。去西岭雪山滑雪，去花水湾泡温泉，再回城里吃一顿热腾腾的火锅。',
    image: 'images/xiling-snow.webp',
    spots: ['西岭雪山', '花水湾温泉', '成都火锅']
  }
]

export const galleryCategories = ['全部', '夜景', '古建', '市井', '人物', '自然']

export const galleryItems = [
  {
    id: 'bridge',
    image: 'images/hero-bridge.webp',
    title: '廊桥灯影',
    en: 'BRIDGE AT BLUE HOUR',
    category: '夜景',
    location: '安顺廊桥',
    story: '锦江把夜色揉碎，桥洞与倒影合成一轮温柔的月。',
    aspect: 'wide'
  },
  {
    id: 'jinli',
    image: 'images/jinli-lanterns.webp',
    title: '锦里灯火',
    en: 'LANTERNS OF JINLI',
    category: '古建',
    location: '锦里',
    story: '红灯笼一盏盏亮起，石板路就有了旧时的温度。',
    aspect: 'tall'
  },
  {
    id: 'kuanzhai',
    image: 'images/kuanzhai-lane.webp',
    title: '巷子里的光阴',
    en: 'LANE OF TIME',
    category: '古建',
    location: '宽窄巷子',
    story: '青砖、门墩与梧桐，把城市的脚步放慢半拍。',
    aspect: 'wide'
  },
  {
    id: 'wuhou',
    image: 'images/wuhou-gate.webp',
    title: '红墙竹影',
    en: 'RED WALL & BAMBOO',
    category: '古建',
    location: '武侯祠',
    story: '阳光穿过竹叶，红墙上的光斑像一段没有说完的三国。',
    aspect: 'tall'
  },
  {
    id: 'dufu',
    image: 'images/dufu-cottage.webp',
    title: '草堂听雨',
    en: 'RAIN AT DU FU COTTAGE',
    category: '古建',
    location: '杜甫草堂',
    story: '茅屋、竹林与溪水，还保留着诗里的清贫与辽阔。',
    aspect: 'wide'
  },
  {
    id: 'jinsha',
    image: 'images/jinsha-sunbird.webp',
    title: '神鸟负日',
    en: 'SUN BIRD',
    category: '古建',
    location: '金沙遗址',
    story: '十二道光，四只神鸟，古蜀人的宇宙在一枚金箔上旋转。',
    aspect: 'square'
  },
  {
    id: 'wenshu',
    image: 'images/wenshu-panorama.webp',
    title: '香火与银杏',
    en: 'INCENSE & GINKGO',
    category: '古建',
    location: '文殊院',
    story: '红墙内香火袅袅，红墙外是甜水面与糕点的队伍。',
    aspect: 'tall'
  },
  {
    id: 'chunxi',
    image: 'images/chunxi-night.webp',
    title: '春熙不夜',
    en: 'CHUNXI AFTER DARK',
    category: '夜景',
    location: '春熙路',
    story: '霓虹把夜色切成碎片，成都的年轻在这里永不散场。',
    aspect: 'wide'
  },
  {
    id: 'night-market',
    image: 'images/night-market.webp',
    title: '夜市的温度',
    en: 'NIGHT MARKET',
    category: '夜景',
    location: '建设路',
    story: '油烟、灯牌与排队的人，是成都夜晚最诚实的表情。',
    aspect: 'tall'
  },
  {
    id: 'skyline',
    image: 'images/skyline-tower.webp',
    title: '城市的天际线',
    en: 'CITY SKYLINE',
    category: '夜景',
    location: '成都',
    story: '从高处看，成都是一张不断生长的光网。',
    aspect: 'wide'
  },
  {
    id: 'peoples-park',
    image: 'images/peoples-park.webp',
    title: '公园里的下午',
    en: 'AN AFTERNOON IN THE PARK',
    category: '市井',
    location: '人民公园',
    story: '竹椅、茶盖与树影，成都人把时间泡进了一碗茶里。',
    aspect: 'wide'
  },
  {
    id: 'teahouse',
    image: 'images/teahouse-crowd.webp',
    title: '一碗盖碗茶',
    en: 'A BOWL OF TEA',
    category: '市井',
    location: '鹤鸣茶社',
    story: '茶盖一掀，龙门阵就开始了。',
    aspect: 'wide'
  },
  {
    id: 'eastmemory',
    image: 'images/eastmemory-1.webp',
    title: '旧厂房的回声',
    en: 'ECHOES OF THE FACTORY',
    category: '市井',
    location: '东郊记忆',
    story: '红砖、钢架与霓虹，工业记忆长出了新的表情。',
    aspect: 'wide'
  },
  {
    id: 'opera',
    image: 'images/opera-mask.webp',
    title: '一瞬千面',
    en: 'A THOUSAND FACES',
    category: '人物',
    location: '川剧舞台',
    story: '锣鼓声里一转身，忠奸喜怒已经换了一张脸。',
    aspect: 'tall'
  },
  {
    id: 'shu-panda',
    image: 'images/shu-panda.webp',
    title: '针尖上的熊猫',
    en: 'PANDA IN SILK',
    category: '人物',
    location: '蜀绣',
    story: '一根丝线劈成十六股，熊猫的绒毛就有了呼吸。',
    aspect: 'square'
  },
  {
    id: 'panda',
    image: 'images/panda-grass.webp',
    title: '竹林的孩子',
    en: 'CHILD OF THE BAMBOO',
    category: '自然',
    location: '熊猫基地',
    story: '世界很吵，但熊猫吃竹子的时候，时间很安静。',
    aspect: 'wide'
  },
  {
    id: 'panda-portrait',
    image: 'images/panda-close.webp',
    title: '好奇的眼睛',
    en: 'CURIOUS EYES',
    category: '自然',
    location: '熊猫基地',
    story: '它看了你一眼，又继续啃手里的竹子。',
    aspect: 'tall'
  },
  {
    id: 'qingcheng',
    image: 'images/qingcheng.webp',
    title: '青城天下幽',
    en: 'MOUNT QINGCHENG',
    category: '自然',
    location: '青城山',
    story: '山色空蒙，宫观藏在古木深处。',
    aspect: 'wide'
  },
  {
    id: 'greenway',
    image: 'images/greenway-aerial.webp',
    title: '城市边的绿野',
    en: 'GREEN RING',
    category: '自然',
    location: '天府绿道',
    story: '城市与田野之间，只隔一条骑行的风。',
    aspect: 'wide'
  },
  {
    id: 'ginkgo',
    image: 'images/ginkgo-avenue.webp',
    title: '银杏落成诗',
    en: 'GINKGO IN GOLD',
    category: '自然',
    location: '成都',
    story: '秋天把整条街染成金色，风一吹就下起一场慢雨。',
    aspect: 'tall'
  },
  {
    id: 'longquan',
    image: 'images/longquan-sunrise.webp',
    title: '龙泉山日出',
    en: 'SUNRISE OVER LONGQUAN',
    category: '自然',
    location: '龙泉山',
    story: '第一缕光越过山脊，整座城市慢慢醒来。',
    aspect: 'wide'
  },
  {
    id: 'dujiangyan',
    image: 'images/dujiangyan.webp',
    title: '千年水利',
    en: 'ANCIENT WATERWORKS',
    category: '自然',
    location: '都江堰',
    story: '岷江被分成两条，一条灌溉，一条奔向远方。',
    aspect: 'wide'
  },
  {
    id: 'xiling',
    image: 'images/xiling-snow.webp',
    title: '窗含西岭',
    en: 'SNOW BEYOND THE WINDOW',
    category: '自然',
    location: '西岭雪山',
    story: '雪山在城市的西边，像一句永远写不完的诗。',
    aspect: 'wide'
  }
]

export const preferenceOptions = ['全部', '文化', '美食', '拍照', '休闲']

export const travelRoutes = [
  {
    id: 'one-classic',
    days: 1,
    title: '一日入蜀 · 老城文脉线',
    en: 'ONE DAY / OLD TOWN',
    subtitle: '把成都的旧时光走一遍',
    image: 'images/wuhou-gate.webp',
    imagePosition: 'center',
    tags: ['文化', '拍照', '休闲'],
    pace: '轻松',
    distance: '约 8 km',
    bestFor: '首次到访 / 文化爱好者',
    intro: '从武侯祠的红墙出发，穿过锦里的灯笼、人民公园的茶桌与宽窄巷子的青砖，最后把夜晚交给锦江。',
    stops: [
      { day: 1, time: '09:00', spotId: 'wuhou', note: '红墙竹影，读一段三国', duration: '1.5 h', transport: '地铁 3/5 号线高升桥站' },
      { day: 1, time: '11:00', spotId: 'jinli', note: '灯笼、糖画与川味小吃', duration: '1.5 h', transport: '步行 5 分钟' },
      { day: 1, time: '14:00', spotId: 'peoplespark', note: '鹤鸣茶社，喝一碗盖碗茶', duration: '2 h', transport: '地铁 2 号线人民公园站' },
      { day: 1, time: '17:00', spotId: 'kuanzhai', note: '在宽巷子与窄巷子之间迷路', duration: '2 h', transport: '步行 15 分钟 / 打车 10 分钟' },
      { day: 1, time: '19:30', spotId: 'anshun', note: '锦江夜色，廊桥灯影', duration: '1.5 h', transport: '地铁 3 号线新南门站' }
    ]
  },
  {
    id: 'one-food',
    days: 1,
    title: '一日入蜀 · 市井吃货线',
    en: 'ONE DAY / STREET FOOD',
    subtitle: '从早茶吃到深夜，把成都装进胃里',
    image: 'images/night-market.webp',
    imagePosition: 'center',
    tags: ['美食', '休闲', '拍照'],
    pace: '满足',
    distance: '约 7 km',
    bestFor: '吃货 / 第一次来成都',
    intro: '不赶景点，只赶饭点。文殊院的甜水面、人民公园的盖碗茶、宽窄的糖油果子、建设路的夜市，一路吃到华灯初上。',
    stops: [
      { day: 1, time: '09:30', spotId: 'wenshu', note: '香火与银杏，顺路吃甜水面', duration: '1.5 h', transport: '地铁 1 号线文殊院站' },
      { day: 1, time: '11:30', spotId: 'peoplespark', note: '盖碗茶配钟水饺', duration: '2 h', transport: '地铁 1 号线转 2 号线' },
      { day: 1, time: '14:00', spotId: 'kuanzhai', note: '糖油果子、蛋烘糕与老街', duration: '2 h', transport: '步行 15 分钟' },
      { day: 1, time: '17:30', spotId: 'jianshe', note: '夜市开摊，少量多样', duration: '2 h', transport: '打车约 20 分钟' },
      { day: 1, time: '20:30', spotId: 'anshun', note: '沿锦江散步消食', duration: '1 h', transport: '打车约 15 分钟' }
    ]
  },
  {
    id: 'two-culture',
    days: 2,
    title: '两日成都 · 古蜀与诗',
    en: 'TWO DAYS / SHU & POETRY',
    subtitle: '从金沙的神鸟，走到杜甫的草堂',
    image: 'images/jinsha-sunbird.webp',
    imagePosition: 'center',
    tags: ['文化', '拍照', '休闲'],
    pace: '从容',
    distance: '约 18 km',
    bestFor: '文化深度游 / 博物馆爱好者',
    intro: '第一天追古蜀与三国，第二天看熊猫、逛老街、听一场川剧。两天时间，刚好读懂成都的来处与日常。',
    stops: [
      { day: 1, time: '09:00', spotId: 'jinsha', note: '太阳神鸟与古蜀王都', duration: '2.5 h', transport: '地铁 7 号线金沙博物馆站' },
      { day: 1, time: '12:30', spotId: 'dufu', note: '浣花溪畔，草堂听雨', duration: '2 h', transport: '打车约 15 分钟' },
      { day: 1, time: '15:30', spotId: 'wuhou', note: '红墙夹道，三国英雄', duration: '1.5 h', transport: '地铁 4 号线转 3 号线' },
      { day: 1, time: '17:30', spotId: 'jinli', note: '灯笼亮起，吃一顿小吃', duration: '1.5 h', transport: '步行 5 分钟' },
      { day: 1, time: '20:00', spotId: 'opera', note: '看一场川剧变脸', duration: '1.5 h', transport: '打车约 15 分钟' },
      { day: 2, time: '08:00', spotId: 'panda', note: '看熊猫吃早饭', duration: '3 h', transport: '地铁 3 号线熊猫大道站' },
      { day: 2, time: '13:30', spotId: 'kuanzhai', note: '青砖黛瓦，慢慢逛', duration: '2 h', transport: '打车约 30 分钟' },
      { day: 2, time: '16:00', spotId: 'peoplespark', note: '最后一碗盖碗茶', duration: '2 h', transport: '步行 15 分钟' }
    ]
  },
  {
    id: 'two-city',
    days: 2,
    title: '两日成都 · 城市出片线',
    en: 'TWO DAYS / CITY IN FRAME',
    subtitle: '霓虹、红砖与锦江夜色',
    image: 'images/chunxi-night.webp',
    imagePosition: 'center',
    tags: ['拍照', '美食', '休闲'],
    pace: '轻快',
    distance: '约 15 km',
    bestFor: '摄影爱好者 / 朋友出行',
    intro: '从春熙路的霓虹到东郊记忆的红砖，再到安顺廊桥的蓝调时刻。两天，收集一组属于成都的城市影像。',
    stops: [
      { day: 1, time: '10:00', spotId: 'chunxi', note: '爬墙熊猫与太古里街拍', duration: '2 h', transport: '地铁 2/3 号线春熙路站' },
      { day: 1, time: '14:00', spotId: 'eastmemory', note: '红砖厂房与工业风', duration: '2.5 h', transport: '地铁 2 号线转 8 号线' },
      { day: 1, time: '18:00', spotId: 'jianshe', note: '夜市烟火，边走边吃', duration: '2 h', transport: '打车约 15 分钟' },
      { day: 1, time: '20:30', spotId: 'anshun', note: '锦江蓝调，廊桥倒影', duration: '1.5 h', transport: '打车约 20 分钟' },
      { day: 2, time: '09:30', spotId: 'peoplespark', note: '茶桌、竹椅与人间', duration: '2 h', transport: '地铁 2 号线人民公园站' },
      { day: 2, time: '13:00', spotId: 'kuanzhai', note: '巷子里的光影', duration: '2 h', transport: '步行 15 分钟' },
      { day: 2, time: '16:00', spotId: 'wenshu', note: '红墙、香火与银杏', duration: '1.5 h', transport: '地铁 4 号线转 1 号线' }
    ]
  },
  {
    id: 'three-deep',
    days: 3,
    title: '三日成都 · 深度漫游',
    en: 'THREE DAYS / SLOW & DEEP',
    subtitle: '城市、山水与烟火，一次看够',
    image: 'images/qingcheng.webp',
    imagePosition: 'center',
    tags: ['文化', '美食', '拍照', '休闲'],
    pace: '从容',
    distance: '约 60 km',
    bestFor: '假期充足 / 深度体验',
    intro: '第一天留在老城，第二天去都江堰与青城山，第三天看熊猫、逛东郊、在锦江边收尾。三天，刚好把成都的层次打开。',
    stops: [
      { day: 1, time: '09:00', spotId: 'jinsha', note: '古蜀文明的第一课', duration: '2.5 h', transport: '地铁 7 号线金沙博物馆站' },
      { day: 1, time: '13:00', spotId: 'dufu', note: '草堂与浣花溪', duration: '2 h', transport: '打车约 15 分钟' },
      { day: 1, time: '16:00', spotId: 'wuhou', note: '红墙竹影', duration: '1.5 h', transport: '地铁 4 号线转 3 号线' },
      { day: 1, time: '18:00', spotId: 'jinli', note: '灯笼下的晚餐', duration: '2 h', transport: '步行 5 分钟' },
      { day: 2, time: '08:30', spotId: 'dujiangyan', note: '看鱼嘴、飞沙堰与宝瓶口', duration: '3 h', transport: '犀浦站城际列车至都江堰站' },
      { day: 2, time: '13:30', spotId: 'qingcheng', note: '前山宫观，山色空蒙', duration: '4 h', transport: '打车约 20 分钟' },
      { day: 3, time: '08:00', spotId: 'panda', note: '看熊猫吃早饭', duration: '3 h', transport: '地铁 3 号线熊猫大道站' },
      { day: 3, time: '13:30', spotId: 'eastmemory', note: '旧厂房里的咖啡与展览', duration: '2 h', transport: '地铁 3 号线转 8 号线' },
      { day: 3, time: '19:30', spotId: 'anshun', note: '锦江夜色，旅程收尾', duration: '1.5 h', transport: '地铁 3 号线新南门站' }
    ]
  },
  {
    id: 'three-slow',
    days: 3,
    title: '三日成都 · 山水慢生活',
    en: 'THREE DAYS / NATURE & TEA',
    subtitle: '喝茶、看山、等一场日落',
    image: 'images/greenway-bridge.webp',
    imagePosition: 'center',
    tags: ['休闲', '拍照', '美食'],
    pace: '很慢',
    distance: '约 55 km',
    bestFor: '亲子 / 放松度假',
    intro: '不追景点，追光线与心情。把时间留给茶桌、山路、绿道和一顿不赶时间的饭。',
    stops: [
      { day: 1, time: '10:00', spotId: 'peoplespark', note: '一碗茶，坐一上午', duration: '2.5 h', transport: '地铁 2 号线人民公园站' },
      { day: 1, time: '14:00', spotId: 'wenshu', note: '香火、银杏与素斋', duration: '1.5 h', transport: '地铁 2 号线转 1 号线' },
      { day: 1, time: '17:00', spotId: 'kuanzhai', note: '傍晚的巷子最适合散步', duration: '2 h', transport: '打车约 15 分钟' },
      { day: 2, time: '09:00', spotId: 'qingcheng', note: '前山慢走，听溪水', duration: '4 h', transport: '犀浦站城际列车至青城山站' },
      { day: 2, time: '14:30', spotId: 'dujiangyan', note: '南桥与千年水利', duration: '3 h', transport: '打车约 20 分钟' },
      { day: 3, time: '08:00', spotId: 'panda', note: '看熊猫吃早饭', duration: '3 h', transport: '地铁 3 号线熊猫大道站' },
      { day: 3, time: '14:00', spotId: 'greenway', note: '租一辆车，骑进绿道', duration: '2 h', transport: '打车约 25 分钟' },
      { day: 3, time: '18:00', spotId: 'longquan', note: '在山脊等一场日落', duration: '1.5 h', transport: '打车约 30 分钟' }
    ]
  }
]

export const travelTips = [
  {
    title: '交通',
    en: 'GETTING AROUND',
    icon: '行',
    text: '市区地铁覆盖主要景点，扫码乘车即可。去都江堰、青城山可从犀浦站乘城际列车；去熊猫基地建议早高峰前出发。'
  },
  {
    title: '预约',
    en: 'BOOK AHEAD',
    icon: '约',
    text: '熊猫基地、金沙遗址、武侯祠等热门景点建议提前 1–3 天预约。川剧演出与热门餐厅周末需更早订位。'
  },
  {
    title: '天气',
    en: 'WEATHER',
    icon: '天',
    text: '成都多雨少晴，随身带伞。夏季湿热，冬季阴冷；去青城山、西岭雪山需准备防滑鞋与外套。'
  },
  {
    title: '吃辣',
    en: 'SPICE LEVEL',
    icon: '味',
    text: '不能吃辣可以直接点“微辣”或鸳鸯锅。成都的辣偏香辣，配香油碟和冰粉会舒服很多。'
  }
]

export const homeGalleryIds = ['bridge', 'jinli', 'panda', 'teahouse', 'ginkgo', 'chunxi']

export function amapUrl(spot) {
  if (!spot || !spot.coords) return 'https://uri.amap.com/'
  return 'https://uri.amap.com/marker?position=' + spot.coords + '&name=' + encodeURIComponent(spot.name) + '&src=shuyun&coordinate=gaode&callnative=0'
}

export function getSpot(id) {
  return attractions.find(function (item) { return item.id === id })
}

export function getGalleryItem(id) {
  return galleryItems.find(function (item) { return item.id === id })
}
