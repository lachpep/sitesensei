import { useMemo, useState } from 'react'
import { api } from './mockApi.js'

const categories = ['All', 'Engagement', 'WooCommerce', 'Accessibility', 'SEO']

const severityRank = {
  High: 3,
  Medium: 2,
  Low: 1,
}

const statusLabel = (status) => {
  const labels = {
    new: 'New',
    saved: 'Saved',
    approved: 'Approved',
    rejected: 'Rejected',
    edited: 'Edited',
  }

  return labels[status] || status
}

function LoginScreen({ error, isLoading, onLogin }) {
  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    onLogin({
      email: formData.get('email'),
      password: formData.get('password'),
    })
  }

  return (
    <main className="login-shell">
      <section className="login-panel">
        <div className="brand-mark">SS</div>
        <p className="eyebrow">WordPress AI optimisation prototype</p>
        <h1>SiteSensei</h1>
        <p className="login-copy">
          Log in to review AI recommendations for a connected demo website.
        </p>

        <form className="login-form" onSubmit={handleSubmit}>
          <label>
            Email
            <input
              name="email"
              type="email"
              defaultValue="admin@sitesensei.test"
              autoComplete="email"
              required
            />
          </label>
          <label>
            Password
            <input
              name="password"
              type="password"
              defaultValue="sitesensei"
              autoComplete="current-password"
              required
            />
          </label>
          {error ? <p className="form-error">{error}</p> : null}
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Checking...' : 'Log in'}
          </button>
        </form>
      </section>

      <aside className="prototype-notes">
        <h2>Prototype Backend</h2>
        <p>
          The login uses a mock database in localStorage. The dashboard calls a
          mock API, which calls a preset AI engine and returns realistic
          recommendation data.
        </p>
        <dl>
          <div>
            <dt>AI</dt>
            <dd>Preset analysis responses</dd>
          </div>
          <div>
            <dt>API</dt>
            <dd>Async JavaScript service layer</dd>
          </div>
          <div>
            <dt>Database</dt>
            <dd>Browser localStorage seed data</dd>
          </div>
        </dl>
      </aside>
    </main>
  )
}

function MetricCards({ analytics }) {
  return (
    <section className="metrics-grid" aria-label="Site metrics">
      <article>
        <span>Total visitors</span>
        <strong>{analytics.visitors.toLocaleString()}</strong>
        <small>Last 30 days</small>
      </article>
      <article>
        <span>Engagement rate</span>
        <strong>{analytics.engagementRate}%</strong>
        <small>+6% after recent changes</small>
      </article>
      <article>
        <span>Average time</span>
        <strong>{analytics.averageTime}</strong>
        <small>Mobile traffic {analytics.mobileTraffic}%</small>
      </article>
      <article>
        <span>Applied</span>
        <strong>{analytics.recommendationsApplied}</strong>
        <small>Accepted AI recommendations</small>
      </article>
    </section>
  )
}

function FakeWebsite() {
  return (
    <section className="website-preview" aria-label="Connected demo website">
      <nav>
        <strong>Bloom & Brew</strong>
        <span>Menu</span>
        <span>Catering</span>
        <span>Cart</span>
      </nav>
      <div className="website-hero">
        <p>Fresh breakfast, local coffee, office catering</p>
        <h2>Seasonal cafe menu delivered across Brisbane</h2>
        <button type="button">Explore menu</button>
      </div>
      <div className="product-row">
        <article>
          <span>Popular</span>
          <strong>Morning platter</strong>
          <small>Low CTA clarity</small>
        </article>
        <article>
          <span>New</span>
          <strong>Weekly lunch box</strong>
          <small>High mobile exits</small>
        </article>
        <article>
          <span>Offer</span>
          <strong>Catering bundle</strong>
          <small>SEO opportunity</small>
        </article>
      </div>
    </section>
  )
}

function EngagementTrend({ values }) {
  const max = Math.max(...values)

  return (
    <div className="trend-card">
      <div>
        <h2>Engagement Trend</h2>
        <p>Audience-level data only</p>
      </div>
      <div className="bars" aria-label="Engagement trend chart">
        {values.map((value, index) => (
          <span key={`${value}-${index}`} style={{ height: `${(value / max) * 100}%` }}>
            <em>{value}%</em>
          </span>
        ))}
      </div>
    </div>
  )
}

function CategoryTabs({ selectedCategory, onSelectCategory }) {
  return (
    <div className="category-tabs" role="tablist" aria-label="Recommendation categories">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className={selectedCategory === category ? 'active' : ''}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  )
}

function RecommendationCard({ recommendation, onOpen }) {
  return (
    <article className={`recommendation-card ${recommendation.status}`}>
      <div className="recommendation-topline">
        <span className={`severity ${recommendation.severity.toLowerCase()}`}>
          {recommendation.severity}
        </span>
        <span>{recommendation.category}</span>
        <span>{statusLabel(recommendation.status)}</span>
      </div>
      <h3>{recommendation.title}</h3>
      <p>{recommendation.issue}</p>
      <button type="button" onClick={() => onOpen(recommendation.id)}>
        Review
      </button>
    </article>
  )
}

function PluginSidebar({
  aiReport,
  recommendations,
  selectedCategory,
  onSelectCategory,
  onOpenRecommendation,
}) {
  return (
    <aside className="plugin-sidebar">
      <header>
        <p className="eyebrow">Gutenberg Sidebar</p>
        <h2>SiteSensei</h2>
        <p>{aiReport.summary}</p>
      </header>

      <div className="ai-status">
        <strong>{aiReport.highPriority} high-priority items</strong>
        <span>{aiReport.privacy}</span>
      </div>

      <CategoryTabs
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
      />

      <div className="recommendation-list">
        {recommendations.map((recommendation) => (
          <RecommendationCard
            key={recommendation.id}
            recommendation={recommendation}
            onOpen={onOpenRecommendation}
          />
        ))}
      </div>
    </aside>
  )
}

function DecisionHistory({ decisions }) {
  return (
    <article className="decision-log">
      <h2>Decision History</h2>
      {decisions.length ? (
        decisions.slice(0, 4).map((decision) => (
          <p key={decision.id}>
            <strong>{statusLabel(decision.status)}</strong> {decision.title}
          </p>
        ))
      ) : (
        <p>No admin decisions yet.</p>
      )}
    </article>
  )
}

function RecommendationModal({
  detail,
  isLoading,
  onClose,
  onSubmitDecision,
}) {
  const [note, setNote] = useState('')

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  return (
    <div className="modal-backdrop" role="presentation" onClick={handleBackdropClick}>
      <section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="modal-header">
          <p className="eyebrow">AI Recommendation Detail</p>
          <button type="button" aria-label="Close" onClick={onClose}>
            x
          </button>
        </div>

        {isLoading || !detail ? (
          <div className="modal-content">
            <p className="loading-text">Loading AI explanation...</p>
          </div>
        ) : (
          <div className="modal-content">
            <h2 id="modal-title">{detail.recommendation.title}</h2>
            <div className="modal-tags">
              <span>{detail.recommendation.page}</span>
              <span>{detail.recommendation.block}</span>
              <span>{detail.recommendation.confidence}% confidence</span>
            </div>
            <dl className="detail-list">
              <div>
                <dt>Diagnosis</dt>
                <dd>{detail.aiExplanation.diagnosis}</dd>
              </div>
              <div>
                <dt>Suggested change</dt>
                <dd>{detail.aiExplanation.proposedChange}</dd>
              </div>
              <div>
                <dt>Expected impact</dt>
                <dd>{detail.aiExplanation.whyItMatters}</dd>
              </div>
              <div>
                <dt>Implementation</dt>
                <dd>{detail.aiExplanation.implementation}</dd>
              </div>
              <div>
                <dt>Fallback</dt>
                <dd>{detail.aiExplanation.fallback}</dd>
              </div>
            </dl>
            <textarea
              rows="3"
              placeholder="Optional edit note for the Gutenberg draft"
              value={note}
              onChange={(event) => setNote(event.target.value)}
            />
            <div className="decision-actions">
              <button
                type="button"
                onClick={() => onSubmitDecision(detail.recommendation.id, 'approved', note)}
              >
                Approve draft
              </button>
              <button
                type="button"
                onClick={() => onSubmitDecision(detail.recommendation.id, 'edited', note)}
              >
                Save edited
              </button>
              <button
                type="button"
                onClick={() => onSubmitDecision(detail.recommendation.id, 'saved', note)}
              >
                Save later
              </button>
              <button
                type="button"
                className="danger"
                onClick={() => onSubmitDecision(detail.recommendation.id, 'rejected', note)}
              >
                Reject
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}

function Dashboard({
  user,
  dashboard,
  selectedCategory,
  selectedRecommendation,
  isDetailLoading,
  onSelectCategory,
  onOpenRecommendation,
  onCloseRecommendation,
  onSubmitDecision,
  onReset,
  onLogout,
}) {
  const filteredRecommendations = useMemo(
    () =>
      dashboard.recommendations
        .filter(
          (recommendation) =>
            selectedCategory === 'All' || recommendation.category === selectedCategory,
        )
        .sort((a, b) => severityRank[b.severity] - severityRank[a.severity]),
    [dashboard.recommendations, selectedCategory],
  )

  return (
    <>
      <main className="app-shell">
        <header className="topbar">
          <div>
            <p className="eyebrow">Connected site</p>
            <h1>{dashboard.site.name}</h1>
            <span>
              {dashboard.site.url} / {dashboard.site.industry}
            </span>
          </div>
          <div className="topbar-actions">
            <span>{user.name}</span>
            <button type="button" onClick={onReset}>
              Reset demo
            </button>
            <button type="button" onClick={onLogout}>
              Log out
            </button>
          </div>
        </header>

        <MetricCards analytics={dashboard.analytics} />

        <section className="workspace">
          <div className="workspace-main">
            <FakeWebsite />
            <div className="lower-grid">
              <EngagementTrend values={dashboard.analytics.trend} />
              <article className="daily-report">
                <h2>Daily Report</h2>
                <p>{dashboard.aiReport.nextBestAction}</p>
                <ul>
                  <li>Recommendations are saved as Gutenberg drafts first.</li>
                  <li>Admin approval is required before publishing.</li>
                  <li>
                    Accepted and rejected actions are logged for the feedback loop.
                  </li>
                </ul>
              </article>
            </div>
            <DecisionHistory decisions={dashboard.decisions} />
          </div>

          <PluginSidebar
            aiReport={dashboard.aiReport}
            recommendations={filteredRecommendations}
            selectedCategory={selectedCategory}
            onSelectCategory={onSelectCategory}
            onOpenRecommendation={onOpenRecommendation}
          />
        </section>
      </main>

      {selectedRecommendation ? (
        <RecommendationModal
          detail={selectedRecommendation}
          isLoading={isDetailLoading}
          onClose={onCloseRecommendation}
          onSubmitDecision={onSubmitDecision}
        />
      ) : null}
    </>
  )
}

export function App() {
  const [user, setUser] = useState(null)
  const [dashboard, setDashboard] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedRecommendation, setSelectedRecommendation] = useState(null)
  const [isLoginLoading, setIsLoginLoading] = useState(false)
  const [isDetailLoading, setIsDetailLoading] = useState(false)
  const [error, setError] = useState('')

  const loadDashboard = async () => {
    const nextDashboard = await api.getDashboard()
    setDashboard(nextDashboard)
  }

  const handleLogin = async (credentials) => {
    try {
      setIsLoginLoading(true)
      setError('')
      const nextUser = await api.login(credentials)
      const nextDashboard = await api.getDashboard()

      setUser(nextUser)
      setDashboard(nextDashboard)
    } catch (loginError) {
      setError(loginError.message)
    } finally {
      setIsLoginLoading(false)
    }
  }

  const handleOpenRecommendation = async (id) => {
    setSelectedRecommendation({})
    setIsDetailLoading(true)

    try {
      const detail = await api.getRecommendation(id)
      setSelectedRecommendation(detail)
    } finally {
      setIsDetailLoading(false)
    }
  }

  const handleSubmitDecision = async (id, status, note) => {
    const nextDashboard = await api.submitDecision(id, status, note)
    setDashboard(nextDashboard)
    setSelectedRecommendation(null)
  }

  const handleReset = async () => {
    const nextDashboard = await api.resetPrototype()
    setDashboard(nextDashboard)
    setSelectedRecommendation(null)
    setSelectedCategory('All')
  }

  const handleLogout = () => {
    setUser(null)
    setDashboard(null)
    setSelectedRecommendation(null)
    setSelectedCategory('All')
    setError('')
  }

  if (!user || !dashboard) {
    return (
      <LoginScreen
        error={error}
        isLoading={isLoginLoading}
        onLogin={handleLogin}
      />
    )
  }

  return (
    <Dashboard
      user={user}
      dashboard={dashboard}
      selectedCategory={selectedCategory}
      selectedRecommendation={selectedRecommendation}
      isDetailLoading={isDetailLoading}
      onSelectCategory={setSelectedCategory}
      onOpenRecommendation={handleOpenRecommendation}
      onCloseRecommendation={() => setSelectedRecommendation(null)}
      onSubmitDecision={handleSubmitDecision}
      onReset={handleReset}
      onLogout={handleLogout}
      reloadDashboard={loadDashboard}
    />
  )
}
