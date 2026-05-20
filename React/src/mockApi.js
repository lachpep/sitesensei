import { aiEngine } from './mockAi.js'
import { database } from './mockDatabase.js'

const delay = (ms = 250) => new Promise((resolve) => window.setTimeout(resolve, ms))

export const api = {
  async login(credentials) {
    await delay()
    const user = database.authenticate(credentials.email, credentials.password)

    if (!user) {
      throw new Error('Invalid email or password')
    }

    return user
  },

  async getDashboard() {
    await delay()
    const snapshot = database.getSnapshot()
    const aiReport = await aiEngine.analyseSite(snapshot)

    return {
      ...snapshot,
      aiReport,
    }
  },

  async getRecommendation(id) {
    await delay()
    const snapshot = database.getSnapshot()
    const recommendation = snapshot.recommendations.find((item) => item.id === id)

    if (!recommendation) {
      throw new Error('Recommendation not found')
    }

    const aiExplanation = await aiEngine.explainRecommendation(recommendation)

    return {
      recommendation,
      aiExplanation,
    }
  },

  async submitDecision(id, status, note) {
    await delay()
    database.updateRecommendation(id, status, note)
    return this.getDashboard()
  },

  async resetPrototype() {
    database.reset()
    return this.getDashboard()
  },
}
