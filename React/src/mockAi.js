const wait = (ms = 500) => new Promise((resolve) => window.setTimeout(resolve, ms))

export const aiEngine = {
  async analyseSite(snapshot) {
    await wait(650)

    const highPriority = snapshot.recommendations.filter(
      (recommendation) => recommendation.severity === 'High',
    ).length

    return {
      summary:
        'SiteSensei found strong mobile traffic, checkout friction, and missed catering search intent. Recommendations are grouped by urgency and require webmaster approval before WordPress changes are drafted.',
      highPriority,
      privacy:
        'Only audience-level behaviour patterns were used. No individual visitor profile is stored.',
      nextBestAction:
        highPriority > 0
          ? 'Review high-severity recommendations first, then preview Gutenberg draft changes.'
          : 'Review saved recommendations and compare post-change analytics.',
    }
  },

  async explainRecommendation(recommendation) {
    await wait(450)

    return {
      diagnosis: `${recommendation.page} / ${recommendation.block}: ${recommendation.issue}`,
      proposedChange: recommendation.suggestion,
      whyItMatters: recommendation.impact,
      implementation:
        'Create a Gutenberg draft update first. The admin can edit, preview, approve, reject, or save the recommendation.',
      fallback:
        'If AI confidence is too low or analytics data is missing, keep the page unchanged and save this as a review item.',
    }
  },
}
