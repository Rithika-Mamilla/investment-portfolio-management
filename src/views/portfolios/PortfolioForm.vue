<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center space-x-4 mb-4">
          <router-link
            to="/portfolios"
            class="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </router-link>
          <h1 class="text-3xl font-bold text-gray-900">
            {{ isEdit ? 'Edit Portfolio' : 'Create New Portfolio' }}
          </h1>
        </div>
        <p class="text-gray-600">
          {{ isEdit ? 'Update portfolio information' : 'Set up a new investment portfolio' }}
        </p>
      </div>

      <!-- Add Portfolio Form -->
      <div class="bg-white rounded-lg shadow">
        <form @submit.prevent="handleSubmit" class="p-6 space-y-8">
          <!-- Basic Information -->
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                  Portfolio Name *
                </label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  :class="{ 'border-red-500': errors.name }"
                />
                <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
              </div>

              <div>
                <label for="clientId" class="block text-sm font-medium text-gray-700 mb-2">
                  Client *
                </label>
                <select
                  id="clientId"
                  v-model="form.clientId"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  :class="{ 'border-red-500': errors.clientId }"
                >
                  <option value="">Select a client</option>
                  <option
                    v-for="user in allUsers"
                    :key="user.id"
                    :value="user.id"
                  >
                    {{ user.name }} ({{ user.email }})
                  </option>
                </select>
                <p v-if="errors.clientId" class="mt-1 text-sm text-red-600">{{ errors.clientId }}</p>
              </div>

              <div>
                <label for="status" class="block text-sm font-medium text-gray-700 mb-2">
                  Status *
                </label>
                <select
                  id="status"
                  v-model="form.status"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  :class="{ 'border-red-500': errors.status }"
                >
                  <option value="">Select status</option>
                  <option value="UPCOMING">Upcoming</option>
                  <option value="ACTIVE">Active</option>
                  <option value="CLOSED">Closed</option>
                </select>
                <p v-if="errors.status" class="mt-1 text-sm text-red-600">{{ errors.status }}</p>
              </div>

              <div>
                <label for="riskLevel" class="block text-sm font-medium text-gray-700 mb-2">
                  Risk Level *
                </label>
                <select
                  id="riskLevel"
                  v-model="form.riskLevel"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  :class="{ 'border-red-500': errors.riskLevel }"
                >
                  <option value="">Select risk level</option>
                  <option value="Conservative">Conservative</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Aggressive">Aggressive</option>
                </select>
                <p v-if="errors.riskLevel" class="mt-1 text-sm text-red-600">{{ errors.riskLevel }}</p>
              </div>
            </div>
          </div>

          <!-- Financial Information -->
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-4">Financial Information</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label for="initialInvestment" class="block text-sm font-medium text-gray-700 mb-2">
                  Initial Investment (₹)
                </label>
                <input
                  id="initialInvestment"
                  v-model.number="form.initialInvestment"
                  type="number"
                  min="0"
                  step="0.01"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  :class="{ 'border-red-500': errors.initialInvestment }"
                />
                <p v-if="errors.initialInvestment" class="mt-1 text-sm text-red-600">{{ errors.initialInvestment }}</p>
              </div>

              <div>
                <label for="totalValue" class="block text-sm font-medium text-gray-700 mb-2">
                  Current Value (₹)
                </label>
                <input
                  id="totalValue"
                  v-model.number="form.totalValue"
                  type="number"
                  min="0"
                  step="0.01"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  :class="{ 'border-red-500': errors.totalValue }"
                />
                <p v-if="errors.totalValue" class="mt-1 text-sm text-red-600">{{ errors.totalValue }}</p>
              </div>

              <div>
                <label for="returns" class="block text-sm font-medium text-gray-700 mb-2">
                  Returns (₹)
                </label>
                <input
                  id="returns"
                  v-model.number="form.returns"
                  type="number"
                  step="0.01"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  :class="{ 'border-red-500': errors.returns }"
                />
                <p v-if="errors.returns" class="mt-1 text-sm text-red-600">{{ errors.returns }}</p>
              </div>
            </div>
          </div>


          <!-- Form Actions -->
          <div class="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <router-link
              to="/portfolios"
              class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </router-link>
            <button
              type="submit"
              :disabled="isLoading"
              class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              <svg
                v-if="isLoading"
                class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>{{ isLoading ? 'Saving...' : (isEdit ? 'Update Portfolio' : 'Create Portfolio') }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'PortfolioForm',
  props: {
    id: {
      type: [String, Number],
      default: null
    }
  },
  data() {
    return {
      form: {
        name: '',
        clientId: '',
        status: '',
        riskLevel: '',
        initialInvestment: 0,
        totalValue: 0,
        returns: 0,
        holdings: []
      },
      errors: {},
      isLoading: false
    }
  },
  computed: {
    ...mapGetters('user', ['allUsers']),
    ...mapGetters('portfolio', ['portfolioById']),
    isEdit() {
      return !!this.id
    }
  },
  created() {
    if (this.isEdit) {
      this.loadPortfolio()
    }
  },
  methods: {
    ...mapActions('portfolio', ['addPortfolio', 'updatePortfolio']),
    loadPortfolio() {
      const portfolio = this.portfolioById(parseInt(this.id))
      if (portfolio) {
        this.form = { ...portfolio }
      }
    },
    validateForm() {
      this.errors = {}
      
      if (!this.form.name.trim()) {
        this.errors.name = 'Portfolio name is required'
      }
      
      if (!this.form.clientId) {
        this.errors.clientId = 'Client is required'
      }
      
      if (!this.form.status) {
        this.errors.status = 'Status is required'
      }
      
      if (!this.form.riskLevel) {
        this.errors.riskLevel = 'Risk level is required'
      }
      
      if (this.form.initialInvestment < 0) {
        this.errors.initialInvestment = 'Initial investment cannot be negative'
      }
      
      if (this.form.totalValue < 0) {
        this.errors.totalValue = 'Total value cannot be negative'
      }
      
      return Object.keys(this.errors).length === 0
    },
    async handleSubmit() {
      if (!this.validateForm()) {
        return
      }
      
      this.isLoading = true
      
      try {
        // Calculate returns if not provided
        if (this.form.returns === 0 && this.form.initialInvestment > 0) {
          this.form.returns = this.form.totalValue - this.form.initialInvestment
        }
        
        // Calculate return percentage
        this.form.returnPercentage = this.form.initialInvestment > 0 
          ? (this.form.returns / this.form.initialInvestment) * 100 
          : 0
        
        // Get client name
        const client = this.allUsers.find(user => user.id === parseInt(this.form.clientId))
        this.form.clientName = client ? client.name : ''
        
        if (this.isEdit) {
          await this.updatePortfolio({ ...this.form, id: parseInt(this.id) })
        } else {
          await this.addPortfolio(this.form)
        }
        
        this.$router.push('/portfolios')
      } catch (error) {
        console.error('Error saving portfolio:', error)
        // Handle error
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>
