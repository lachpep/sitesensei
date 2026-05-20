const DATABASE_KEY = 'sitesensei-prototype-db'

const seedDatabase = {
  users: [
    {
      id: 'user-1',
      name: 'Site Admin',
      email: 'admin@sitesensei.test',
      password: 'sitesensei',
      role: 'Webmaster',
    },
  ],
  site: {
    name: 'Bloom & Brew',
    url: 'https://example-cafe.test',
    industry: 'Local cafe and online store',
  },
  analytics: {
    visitors: 12840,
    engagementRate: 58,
    averageTime: '2m 14s',
    recommendationsApplied: 7,
    conversionRate: 3.8,
    mobileTraffic: 64,
    trend: [42, 47, 44, 52, 58, 55, 61],
  },
  recommendations: [
    {
      id: 'rec-1',
      page: 'Homepage',
      block: 'Hero section',
      category: 'Engagement',
      severity: 'High',
      confidence: 91,
      title: 'Clarify the primary call to action',
      issue:
        'Visitors scroll past the hero quickly and only 12% click the current button.',
      suggestion:
        'Change the hero button copy to "Order catering" and add a secondary "View weekly menu" link.',
      impact: 'Expected to improve homepage click-through by 8-12%.',
      evidence: 'High mobile traffic, low hero click rate, strong menu page exits.',
      status: 'new',
    },
    {
      id: 'rec-2',
      page: 'Checkout',
      block: 'Delivery form',
      category: 'WooCommerce',
      severity: 'High',
      confidence: 86,
      title: 'Reduce checkout form friction',
      issue:
        'Cart abandonment rises when delivery notes and phone number appear before address confirmation.',
      suggestion:
        'Move optional delivery notes below payment and label the phone field as optional.',
      impact: 'Expected to reduce checkout drop-off by 5-9%.',
      evidence: 'Checkout exit rate increased on mobile sessions.',
      status: 'new',
    },
    {
      id: 'rec-3',
      page: 'Menu',
      block: 'Product cards',
      category: 'Accessibility',
      severity: 'Medium',
      confidence: 78,
      title: 'Improve card contrast and tap targets',
      issue:
        'Product card labels have weak contrast and small mobile tap areas.',
      suggestion:
        'Increase label contrast, enlarge card buttons, and add visible focus states.',
      impact: 'Expected to improve mobile usability and accessibility compliance.',
      evidence: 'Mobile sessions show repeated taps on product cards.',
      status: 'saved',
    },
    {
      id: 'rec-4',
      page: 'Blog',
      block: 'Article structure',
      category: 'SEO',
      severity: 'Medium',
      confidence: 74,
      title: 'Create a page for catering search intent',
      issue:
        'Search terms show catering intent, but visitors land on blog posts instead of a dedicated page.',
      suggestion:
        'Create a catering landing page and internally link to it from related blog posts.',
      impact: 'Expected to improve organic conversion paths.',
      evidence: 'Search Console terms: "office catering Brisbane", "cafe catering menu".',
      status: 'new',
    },
  ],
  decisions: [],
}

const clone = (value) => JSON.parse(JSON.stringify(value))

const readDatabase = () => {
  const stored = window.localStorage.getItem(DATABASE_KEY)
  if (!stored) {
    window.localStorage.setItem(DATABASE_KEY, JSON.stringify(seedDatabase))
    return clone(seedDatabase)
  }

  return JSON.parse(stored)
}

const writeDatabase = (database) => {
  window.localStorage.setItem(DATABASE_KEY, JSON.stringify(database))
  return clone(database)
}

export const database = {
  authenticate(email, password) {
    const db = readDatabase()
    const user = db.users.find(
      (item) =>
        item.email.toLowerCase() === email.toLowerCase() &&
        item.password === password,
    )

    if (!user) {
      return null
    }

    const { password: _password, ...safeUser } = user
    return safeUser
  },

  getSnapshot() {
    const db = readDatabase()
    return {
      site: db.site,
      analytics: db.analytics,
      recommendations: db.recommendations,
      decisions: db.decisions,
    }
  },

  updateRecommendation(id, status, note = '') {
    const db = readDatabase()
    const recommendation = db.recommendations.find((item) => item.id === id)

    if (!recommendation) {
      throw new Error('Recommendation not found')
    }

    recommendation.status = status
    db.decisions.unshift({
      id: `decision-${Date.now()}`,
      recommendationId: id,
      title: recommendation.title,
      status,
      note,
      createdAt: new Date().toISOString(),
    })

    if (status === 'approved') {
      db.analytics.recommendationsApplied += 1
      db.analytics.engagementRate = Math.min(db.analytics.engagementRate + 1, 100)
    }

    return writeDatabase(db)
  },

  reset() {
    window.localStorage.setItem(DATABASE_KEY, JSON.stringify(seedDatabase))
    return clone(seedDatabase)
  },
}
