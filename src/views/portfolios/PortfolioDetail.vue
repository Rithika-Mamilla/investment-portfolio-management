<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
          <div class="flex-1">
            <h1 class="text-3xl font-bold text-gray-900">{{ portfolio?.name || 'Portfolio' }}</h1>
            <p class="text-gray-600">{{ portfolio?.clientName || '' }}</p>
          </div>
          <div class="flex space-x-3">
            <button
              @click="scrollToDetails"
              class="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
              title="View Details"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
              <span>View Details</span>
            </button>
            <router-link
              v-if="portfolio"
              :to="`/portfolios/${portfolio.id}/edit`"
              class="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
              <span>Edit Portfolio</span>
            </router-link>
          </div>
        </div>
      </div>

      <div v-if="portfolio" class="space-y-8">
        <!-- Portfolio Overview -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center">
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-500">Total Value</p>
                <p class="text-2xl font-semibold text-gray-900">₹{{ formatCurrency(portfolio.totalValue) }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center">
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-500">Total Returns</p>
                <p
                  class="text-2xl font-semibold"
                  :class="portfolio.returns >= 0 ? 'text-green-600' : 'text-red-600'"
                >
                  ₹{{ formatCurrency(portfolio.returns) }}
                </p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center">
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-500">Return %</p>
                <p
                  class="text-2xl font-semibold"
                  :class="portfolio.returnPercentage >= 0 ? 'text-green-600' : 'text-red-600'"
                >
                  {{ portfolio.returnPercentage.toFixed(1) }}%
                </p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center">
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-500">Risk Level</p>
                <p class="text-2xl font-semibold text-gray-900">{{ portfolio.riskLevel }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Holdings Section -->
        <div class="bg-white rounded-lg shadow">
          <div class="px-6 py-4 border-b border-gray-200">
            <div class="flex justify-between items-center">
              <h3 class="text-lg font-medium text-gray-900">Holdings</h3>
              <button
                @click="showAddHoldingModal = true"
                class="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                <span>Add Holding</span>
              </button>
            </div>
          </div>
          <div class="p-6">
            <div v-if="portfolio.holdings && portfolio.holdings.length > 0" class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Symbol
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Purchase Price
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Current Price
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Value
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Returns
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="holding in portfolio.holdings" :key="holding.id" class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm font-medium text-gray-900">{{ holding.symbol }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">{{ holding.name }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {{ holding.type }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {{ holding.quantity }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹{{ formatCurrency(holding.purchasePrice) }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹{{ formatCurrency(holding.currentPrice) }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹{{ formatCurrency(holding.totalValue) }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm" :class="holding.returns >= 0 ? 'text-green-600' : 'text-red-600'">
                        ₹{{ formatCurrency(holding.returns) }}
                      </div>
                      <div class="text-xs" :class="holding.returnPercentage >= 0 ? 'text-green-500' : 'text-red-500'">
                        ({{ holding.returnPercentage.toFixed(2) }}%)
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div class="flex justify-end space-x-2">
                        <button
                          @click="editHolding(holding)"
                          class="text-primary-600 hover:text-primary-900 p-1 rounded-md hover:bg-primary-50 transition-colors"
                          title="Edit Holding"
                        >
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                          </svg>
                        </button>
                        <button
                          @click="deleteHolding(holding.id)"
                          class="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-50 transition-colors"
                          title="Delete Holding"
                        >
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-else class="text-center py-12">
              <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
              <h3 class="mt-2 text-sm font-medium text-gray-900">No holdings found</h3>
              <p class="mt-1 text-sm text-gray-500">Get started by adding a new holding to this portfolio.</p>
            </div>
          </div>
        </div>

        <!-- Portfolio Details -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Portfolio Information -->
          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Portfolio Information</h3>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-500">Status</label>
                <span
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-1"
                  :class="getStatusClass(portfolio.status)"
                >
                  {{ portfolio.status }}
                </span>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-500">Risk Level</label>
                <span
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-1"
                  :class="getRiskLevelClass(portfolio.riskLevel)"
                >
                  {{ portfolio.riskLevel }}
                </span>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-500">Initial Investment</label>
                <p class="text-sm text-gray-900 mt-1">₹{{ formatCurrency(portfolio.initialInvestment) }}</p>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-500">Created</label>
                <p class="text-sm text-gray-900 mt-1">{{ formatDate(portfolio.createdAt) }}</p>
              </div>
              
              <div v-if="portfolio.closedAt">
                <label class="block text-sm font-medium text-gray-500">Closed</label>
                <p class="text-sm text-gray-900 mt-1">{{ formatDate(portfolio.closedAt) }}</p>
              </div>
            </div>
          </div>

          <!-- Client Information -->
          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Client Information</h3>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-500">Name</label>
                <p class="text-sm text-gray-900 mt-1">{{ portfolio.clientName }}</p>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-500">Client ID</label>
                <p class="text-sm text-gray-900 mt-1">{{ portfolio.clientId }}</p>
              </div>
              
              <div class="pt-4">
                <router-link
                  :to="`/users/${portfolio.clientId}/edit`"
                  class="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  View Client Details →
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Add/Edit Holding Modal -->
      <div v-if="showAddHoldingModal || showEditHoldingModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
        <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
          <div class="mt-3">
            <h3 class="text-lg font-medium text-gray-900 mb-4">
              {{ showEditHoldingModal ? 'Edit Holding' : 'Add New Holding' }}
            </h3>
            <form @submit.prevent="handleHoldingSubmit" class="space-y-4">
              <div>
                <label for="symbol" class="block text-sm font-medium text-gray-700 mb-2">Symbol *</label>
                <input
                  id="symbol"
                  v-model="holdingForm.symbol"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                <input
                  id="name"
                  v-model="holdingForm.name"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div>
                <label for="type" class="block text-sm font-medium text-gray-700 mb-2">Type *</label>
                <select
                  id="type"
                  v-model="holdingForm.type"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Select type</option>
                  <option value="Stock">Stock</option>
                  <option value="Bond">Bond</option>
                  <option value="Mutual Fund">Mutual Fund</option>
                  <option value="ETF">ETF</option>
                  <option value="Commodity">Commodity</option>
                </select>
              </div>
              
              <div>
                <label for="quantity" class="block text-sm font-medium text-gray-700 mb-2">Quantity *</label>
                <input
                  id="quantity"
                  v-model.number="holdingForm.quantity"
                  type="number"
                  min="1"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div>
                <label for="purchasePrice" class="block text-sm font-medium text-gray-700 mb-2">Purchase Price (₹) *</label>
                <input
                  id="purchasePrice"
                  v-model.number="holdingForm.purchasePrice"
                  type="number"
                  min="0"
                  step="0.01"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div>
                <label for="currentPrice" class="block text-sm font-medium text-gray-700 mb-2">Current Price (₹) *</label>
                <input
                  id="currentPrice"
                  v-model.number="holdingForm.currentPrice"
                  type="number"
                  min="0"
                  step="0.01"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div class="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  @click="closeHoldingModal"
                  class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  :disabled="isLoading"
                  class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 transition-colors"
                >
                  {{ isLoading ? 'Saving...' : (showEditHoldingModal ? 'Update' : 'Add') }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Portfolio Not Found -->
      <div v-else class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">Portfolio not found</h3>
        <p class="mt-1 text-sm text-gray-500">The portfolio you're looking for doesn't exist.</p>
        <div class="mt-6">
          <router-link
            to="/portfolios"
            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
          >
            Back to Portfolios
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'PortfolioDetail',
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      showAddHoldingModal: false,
      showEditHoldingModal: false,
      editingHoldingId: null,
      holdingForm: {
        symbol: '',
        name: '',
        type: '',
        quantity: 1,
        purchasePrice: 0,
        currentPrice: 0
      }
    }
  },
  computed: {
    ...mapGetters('portfolio', ['portfolioById', 'isLoading']),
    portfolio() {
      return this.portfolioById(this.id)
    }
  },
  methods: {
    ...mapActions('portfolio', ['addHolding', 'updateHolding', 'deleteHolding']),
    formatCurrency(value) {
      return new Intl.NumberFormat('en-IN').format(value)
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString()
    },
    getStatusClass(status) {
      const classes = {
        ACTIVE: 'bg-green-100 text-green-800',
        UPCOMING: 'bg-yellow-100 text-yellow-800',
        CLOSED: 'bg-gray-100 text-gray-800'
      }
      return classes[status] || 'bg-gray-100 text-gray-800'
    },
    getRiskLevelClass(riskLevel) {
      const classes = {
        Conservative: 'bg-green-100 text-green-800',
        Moderate: 'bg-yellow-100 text-yellow-800',
        Aggressive: 'bg-red-100 text-red-800'
      }
      return classes[riskLevel] || 'bg-gray-100 text-gray-800'
    },
    scrollToDetails() {
      // Scroll to the portfolio details section
      const detailsSection = document.querySelector('.lg\\:col-span-1')
      if (detailsSection) {
        detailsSection.scrollIntoView({ behavior: 'smooth' })
      }
    },
    editHolding(holding) {
      this.editingHoldingId = holding.id
      this.holdingForm = { ...holding }
      this.showEditHoldingModal = true
    },
    async deleteHolding(holdingId) {
      if (confirm('Are you sure you want to delete this holding?')) {
        try {
          await this.deleteHolding({ portfolioId: parseInt(this.id), holdingId })
        } catch (error) {
          console.error('Error deleting holding:', error)
        }
      }
    },
    closeHoldingModal() {
      this.showAddHoldingModal = false
      this.showEditHoldingModal = false
      this.editingHoldingId = null
      this.holdingForm = {
        symbol: '',
        name: '',
        type: '',
        quantity: 1,
        purchasePrice: 0,
        currentPrice: 0
      }
    },
    async handleHoldingSubmit() {
      try {
        // Calculate total value and returns
        const totalValue = this.holdingForm.quantity * this.holdingForm.currentPrice
        const totalInvestment = this.holdingForm.quantity * this.holdingForm.purchasePrice
        const returns = totalValue - totalInvestment
        const returnPercentage = totalInvestment > 0 ? (returns / totalInvestment) * 100 : 0

        const holdingData = {
          ...this.holdingForm,
          totalValue,
          returns,
          returnPercentage
        }

        if (this.showEditHoldingModal) {
          await this.updateHolding({
            portfolioId: parseInt(this.id),
            holdingId: this.editingHoldingId,
            updatedHolding: holdingData
          })
        } else {
          await this.addHolding({
            portfolioId: parseInt(this.id),
            holding: holdingData
          })
        }

        this.closeHoldingModal()
      } catch (error) {
        console.error('Error saving holding:', error)
      }
    }
  }
}
</script>
