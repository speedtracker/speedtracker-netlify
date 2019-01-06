const config = {
  profiles: {
    test: {
      name: 'BBC One',
      parameters: {
        connectivity: 'Cable',
        location: 'London_EC2',
        runs: 5,
        url: 'https://www.bbc.co.uk/bbcone'
      },
      budgets: [
        {
          metric: 'TTFB',
          max: 1000,
          alerts: ['slackAlert']          
        }
      ]
    }
  }
}

if (typeof window === 'object') {
  window.__SPEEDTRACKER_CONFIG = config
} else if (typeof module !== 'undefined') {
  module.exports = config
}
