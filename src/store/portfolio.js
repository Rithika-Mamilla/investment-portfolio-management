export default {
  namespaced: true,
  state: {
    portfolios: [
      {
        id: 1,
        clientId: 1,
        clientName: 'Rajesh Kumar',
        name: 'Retirement Portfolio',
        status: 'ACTIVE',
        totalValue: 150000,
        initialInvestment: 100000,
        returns: 50000,
        returnPercentage: 50.0,
        riskLevel: 'Moderate',
        createdAt: '2024-01-15',
        holdings: [
          {
            id: 1,
            symbol: 'RELIANCE',
            name: 'Reliance Industries Ltd',
            type: 'Stock',
            quantity: 100,
            purchasePrice: 2500,
            currentPrice: 2750,
            totalValue: 275000,
            returns: 25000,
            returnPercentage: 10.0
          },
          {
            id: 2,
            symbol: 'TCS',
            name: 'Tata Consultancy Services Ltd',
            type: 'Stock',
            quantity: 50,
            purchasePrice: 3200,
            currentPrice: 3400,
            totalValue: 170000,
            returns: 10000,
            returnPercentage: 6.25
          },
          {
            id: 3,
            symbol: 'HDFCBANK',
            name: 'HDFC Bank Ltd',
            type: 'Stock',
            quantity: 75,
            purchasePrice: 1600,
            currentPrice: 1800,
            totalValue: 135000,
            returns: 15000,
            returnPercentage: 12.5
          }
        ]
      },
      {
        id: 2,
        clientId: 2,
        clientName: 'Priya Sharma',
        name: 'Conservative Growth',
        status: 'ACTIVE',
        totalValue: 75000,
        initialInvestment: 70000,
        returns: 5000,
        returnPercentage: 7.1,
        riskLevel: 'Conservative',
        createdAt: '2024-01-20',
        holdings: [
          {
            id: 4,
            symbol: 'SBIN',
            name: 'State Bank of India',
            type: 'Stock',
            quantity: 200,
            purchasePrice: 350,
            currentPrice: 375,
            totalValue: 75000,
            returns: 5000,
            returnPercentage: 7.14
          }
        ]
      },
      {
        id: 3,
        clientId: 3,
        clientName: 'Amit Patel',
        name: 'High Growth Portfolio',
        status: 'UPCOMING',
        totalValue: 0,
        initialInvestment: 0,
        returns: 0,
        returnPercentage: 0,
        riskLevel: 'Aggressive',
        createdAt: '2024-02-01',
        holdings: []
      },
      {
        id: 4,
        clientId: 1,
        clientName: 'Rajesh Kumar',
        name: 'Closed Portfolio',
        status: 'CLOSED',
        totalValue: 0,
        initialInvestment: 50000,
        returns: 10000,
        returnPercentage: 20.0,
        riskLevel: 'Moderate',
        createdAt: '2023-06-01',
        closedAt: '2024-01-01',
        holdings: []
      }
    ],
    loading: false,
    error: null
  },
  mutations: {
    SET_LOADING(state, loading) {
      state.loading = loading
    },
    SET_ERROR(state, error) {
      state.error = error
    },
    ADD_PORTFOLIO(state, portfolio) {
      const newPortfolio = {
        ...portfolio,
        id: Date.now(),
        createdAt: new Date().toISOString().split('T')[0]
      }
      state.portfolios.push(newPortfolio)
    },
    UPDATE_PORTFOLIO(state, updatedPortfolio) {
      const index = state.portfolios.findIndex(portfolio => portfolio.id === updatedPortfolio.id)
      if (index !== -1) {
        state.portfolios.splice(index, 1, updatedPortfolio)
      }
    },
    DELETE_PORTFOLIO(state, portfolioId) {
      state.portfolios = state.portfolios.filter(portfolio => portfolio.id !== portfolioId)
    },
    ADD_HOLDING(state, { portfolioId, holding }) {
      const portfolio = state.portfolios.find(p => p.id === portfolioId)
      if (portfolio) {
        if (!portfolio.holdings) {
          portfolio.holdings = []
        }
        const newHolding = {
          ...holding,
          id: Date.now()
        }
        portfolio.holdings.push(newHolding)
      }
    },
    UPDATE_HOLDING(state, { portfolioId, holdingId, updatedHolding }) {
      const portfolio = state.portfolios.find(p => p.id === portfolioId)
      if (portfolio && portfolio.holdings) {
        const index = portfolio.holdings.findIndex(h => h.id === holdingId)
        if (index !== -1) {
          portfolio.holdings.splice(index, 1, updatedHolding)
        }
      }
    },
    DELETE_HOLDING(state, { portfolioId, holdingId }) {
      const portfolio = state.portfolios.find(p => p.id === portfolioId)
      if (portfolio && portfolio.holdings) {
        portfolio.holdings = portfolio.holdings.filter(h => h.id !== holdingId)
      }
    }
  },
  actions: {
    async addPortfolio({ commit }, portfolioData) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500))
        commit('ADD_PORTFOLIO', portfolioData)
      } catch (error) {
        commit('SET_ERROR', error.message)
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },
    async updatePortfolio({ commit }, portfolioData) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500))
        commit('UPDATE_PORTFOLIO', portfolioData)
      } catch (error) {
        commit('SET_ERROR', error.message)
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },
    async deletePortfolio({ commit }, portfolioId) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500))
        commit('DELETE_PORTFOLIO', portfolioId)
      } catch (error) {
        commit('SET_ERROR', error.message)
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },
    async addHolding({ commit }, { portfolioId, holding }) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 300))
        commit('ADD_HOLDING', { portfolioId, holding })
      } catch (error) {
        commit('SET_ERROR', error.message)
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },
    async updateHolding({ commit }, { portfolioId, holdingId, updatedHolding }) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 300))
        commit('UPDATE_HOLDING', { portfolioId, holdingId, updatedHolding })
      } catch (error) {
        commit('SET_ERROR', error.message)
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },
    async deleteHolding({ commit }, { portfolioId, holdingId }) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 300))
        commit('DELETE_HOLDING', { portfolioId, holdingId })
      } catch (error) {
        commit('SET_ERROR', error.message)
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    }
  },
  getters: {
    allPortfolios: state => state.portfolios,
    portfolioById: state => id => state.portfolios.find(portfolio => portfolio.id === parseInt(id)),
    portfoliosByStatus: state => status => state.portfolios.filter(portfolio => portfolio.status === status),
    portfoliosByClient: state => clientId => state.portfolios.filter(portfolio => portfolio.clientId === clientId),
    activePortfolios: state => state.portfolios.filter(portfolio => portfolio.status === 'ACTIVE'),
    upcomingPortfolios: state => state.portfolios.filter(portfolio => portfolio.status === 'UPCOMING'),
    closedPortfolios: state => state.portfolios.filter(portfolio => portfolio.status === 'CLOSED'),
    portfoliosCount: state => state.portfolios.length,
    isLoading: state => state.loading,
    error: state => state.error
  }
}

