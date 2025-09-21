<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Portfolios</h1>
            <p class="mt-2 text-gray-600">Manage investment portfolios and track performance</p>
          </div>
          <router-link
            to="/portfolios/new"
            class="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            <span>Add Portfolio</span>
          </router-link>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-lg shadow mb-6 p-6">
        <div class="flex flex-col sm:flex-row gap-4">
          <div class="flex-1">
            <label for="search" class="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <input
              id="search"
              v-model="searchQuery"
              type="text"
              placeholder="Search by portfolio name or client..."
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div class="sm:w-48">
            <label for="statusFilter" class="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              id="statusFilter"
              v-model="statusFilter"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">All</option>
              <option value="ACTIVE">Active</option>
              <option value="UPCOMING">Upcoming</option>
              <option value="CLOSED">Closed</option>
            </select>
          </div>
          <div class="sm:w-48">
            <label for="riskFilter" class="block text-sm font-medium text-gray-700 mb-2">Risk Level</label>
            <select
              id="riskFilter"
              v-model="riskFilter"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">All</option>
              <option value="Conservative">Conservative</option>
              <option value="Moderate">Moderate</option>
              <option value="Aggressive">Aggressive</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Status Tabs -->
      <div class="mb-6">
        <div class="border-b border-gray-200">
          <nav class="-mb-px flex space-x-8">
            <button
              v-for="status in statusTabs"
              :key="status.value"
              @click="statusFilter = status.value"
              class="py-2 px-1 border-b-2 font-medium text-sm transition-colors"
              :class="statusFilter === status.value
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
            >
              {{ status.label }}
              <span class="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2.5 rounded-full text-xs">
                {{ getPortfolioCountByStatus(status.value) }}
              </span>
            </button>
          </nav>
        </div>
      </div>

      <!-- Portfolios Table -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Portfolio
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Value
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Returns
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Risk Level
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="portfolio in filteredPortfolios"
                :key="portfolio.id"
                class="hover:bg-gray-50 cursor-pointer"
                @click="$router.push(`/portfolios/${portfolio.id}`)"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{{ portfolio.name }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ portfolio.clientName }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                    :class="getStatusClass(portfolio.status)"
                  >
                    {{ portfolio.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">
                    ₹{{ formatCurrency(portfolio.totalValue) }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium" :class="portfolio.returns >= 0 ? 'text-green-600' : 'text-red-600'">
                    ₹{{ formatCurrency(portfolio.returns) }}
                    <div class="text-xs text-gray-500">({{ portfolio.returnPercentage.toFixed(1) }}%)</div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                    :class="getRiskLevelClass(portfolio.riskLevel)"
                  >
                    {{ portfolio.riskLevel }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-500">{{ formatDate(portfolio.createdAt) }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex justify-end space-x-2">
                    <router-link
                      :to="`/portfolios/${portfolio.id}`"
                      class="text-primary-600 hover:text-primary-700 p-1 rounded-md hover:bg-primary-50 transition-colors"
                      @click.stop
                      title="View Details"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
                    </router-link>
                    <router-link
                      :to="`/portfolios/${portfolio.id}/edit`"
                      class="text-primary-600 hover:text-primary-700 p-1 rounded-md hover:bg-primary-50 transition-colors"
                      @click.stop
                      title="Edit Portfolio"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                      </svg>
                    </router-link>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-if="filteredPortfolios.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No portfolios found</h3>
        <p class="mt-1 text-sm text-gray-500">
          {{ searchQuery || statusFilter || riskFilter ? 'Try adjusting your search criteria.' : 'Get started by creating a new portfolio.' }}
        </p>
        <div class="mt-6">
          <router-link
            to="/portfolios/new"
            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
          >
            <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Add Portfolio
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PortfolioList',
  data() {
    return {
      searchQuery: '',
      statusFilter: '',
      riskFilter: '',
      statusTabs: [
        { value: '', label: 'All' },
        { value: 'ACTIVE', label: 'Active' },
        { value: 'UPCOMING', label: 'Upcoming' },
        { value: 'CLOSED', label: 'Closed' }
      ]
    }
  },
  computed: {
    ...mapGetters('portfolio', ['allPortfolios']),
    filteredPortfolios() {
      let filtered = this.allPortfolios

      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(portfolio =>
          portfolio.name.toLowerCase().includes(query) ||
          portfolio.clientName.toLowerCase().includes(query)
        )
      }

      if (this.statusFilter) {
        filtered = filtered.filter(portfolio => portfolio.status === this.statusFilter)
      }

      if (this.riskFilter) {
        filtered = filtered.filter(portfolio => portfolio.riskLevel === this.riskFilter)
      }

      return filtered
    }
  },
  methods: {
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
    getPortfolioCountByStatus(status) {
      if (!status) return this.allPortfolios.length
      return this.allPortfolios.filter(portfolio => portfolio.status === status).length
    }
  }
}
</script>
