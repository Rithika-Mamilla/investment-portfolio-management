export default {
  namespaced: true,
  state: {
    users: [
      {
        id: 1,
        name: 'Rajesh Kumar',
        email: 'rajesh.kumar@gmail.com',
        phone: '+91-98765-43210',
        address: '123 MG Road, Mumbai, Maharashtra 400001',
        dateOfBirth: '1990-03-15',
        riskProfile: 'Moderate',
        createdAt: '2025-09-15'
      },
      {
        id: 2,
        name: 'Priya Sharma',
        email: 'priya.sharma@yahoo.com',
        phone: '+91-98765-43211',
        address: '456 Brigade Road, Bangalore, Karnataka 560001',
        dateOfBirth: '1984-11-22',
        riskProfile: 'Conservative',
        createdAt: '2024-09-17'
      },
      {
        id: 3,
        name: 'Amit Patel',
        email: 'amit.patel@outlook.com',
        phone: '+91-98765-43212',
        address: '789 Connaught Place, New Delhi, Delhi 110001',
        dateOfBirth: '1993-07-08',
        riskProfile: 'Aggressive',
        createdAt: '2024-09-19'
      }
    ],
    nextId: 4,
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
    ADD_USER(state, user) {
      const newUser = {
        ...user,
        id: state.nextId,
        createdAt: new Date().toISOString().split('T')[0]
      }
      state.users.push(newUser)
      state.nextId++
    },
    UPDATE_USER(state, updatedUser) {
      const index = state.users.findIndex(user => user.id === updatedUser.id)
      if (index !== -1) {
        state.users.splice(index, 1, updatedUser)
      }
    },
    DELETE_USER(state, userId) {
      state.users = state.users.filter(user => user.id !== userId)
    }
  },
  actions: {
    async addUser({ commit }, userData) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500))
        commit('ADD_USER', userData)
      } catch (error) {
        commit('SET_ERROR', error.message)
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },
    async updateUser({ commit }, userData) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500))
        commit('UPDATE_USER', userData)
      } catch (error) {
        commit('SET_ERROR', error.message)
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },
    async deleteUser({ commit }, userId) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500))
        commit('DELETE_USER', userId)
      } catch (error) {
        commit('SET_ERROR', error.message)
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    }
  },
  getters: {
    allUsers: state => state.users,
    userById: state => id => state.users.find(user => user.id === id),
    usersCount: state => state.users.length,
    isLoading: state => state.loading,
    error: state => state.error
  }
}

