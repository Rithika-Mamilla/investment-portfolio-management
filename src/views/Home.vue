<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p class="mt-2 text-gray-600">Welcome to your investment portfolio management system</p>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <div>
            <p class="text-sm font-medium text-gray-500">Total Clients</p>
            <p class="text-2xl font-semibold text-gray-900">{{ totalClients }}</p>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div>
            <p class="text-sm font-medium text-gray-500">Active Portfolios</p>
            <p class="text-2xl font-semibold text-gray-900">{{ activePortfolios.length }}</p>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div>
            <p class="text-sm font-medium text-gray-500">Total Value</p>
            <p class="text-2xl font-semibold text-gray-900">₹{{ formatCurrency(totalValue) }}</p>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div>
            <p class="text-sm font-medium text-gray-500">Total Returns</p>
            <p class="text-2xl font-semibold text-gray-900">₹{{ formatCurrency(totalReturns) }}</p>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Recent Portfolios -->
        <div class="bg-white rounded-lg shadow">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">Recent Portfolios</h3>
          </div>
          <div class="p-6">
            <div class="space-y-4">
              <div
                v-for="portfolio in recentPortfolios"
                :key="portfolio.id"
                class="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <h4 class="font-medium text-gray-900">{{ portfolio.name }}</h4>
                  <p class="text-sm text-gray-500">{{ portfolio.clientName }}</p>
                </div>
                <div class="text-right">
                  <span
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                    :class="getStatusClass(portfolio.status)"
                  >
                    {{ portfolio.status }}
                  </span>
                  <p class="text-sm text-gray-500 mt-1">₹{{ formatCurrency(portfolio.totalValue) }}</p>
                </div>
              </div>
            </div>
            <div class="mt-4">
              <router-link
                to="/portfolios"
                class="text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                View all portfolios →
              </router-link>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="bg-white rounded-lg shadow">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">Quick Actions</h3>
          </div>
          <div class="p-6">
            <div class="space-y-4">
              <router-link
                to="/users/new"
                class="flex items-center p-4 bg-violet-50 rounded-lg hover:bg-violet-100 transition-colors"
              >
                <div class="flex-shrink-0">
                  <div class="w-10 h-10 bg-violet-600 rounded-lg flex items-center justify-center">
                    <img :src="plusIcon" alt="Plus" class="w-6 h-6 text-white" />
                  </div>
                </div>
                <div class="ml-4">
                  <h4 class="font-medium text-gray-900">Add New Client</h4>
                  <p class="text-sm text-gray-500">Register a new client in the system</p>
                </div>
              </router-link>

              <router-link
                to="/portfolios/new"
                class="flex items-center p-4 bg-violet-50 rounded-lg hover:bg-violet-100 transition-colors"
              >
                <div class="flex-shrink-0">
                  <div class="w-10 h-10 bg-violet-600 rounded-lg flex items-center justify-center">
                    <img :src="chartIcon" alt="Chart" class="w-6 h-6 text-white" />
                  </div>
                </div>
                <div class="ml-4">
                  <h4 class="font-medium text-gray-900">Create Portfolio</h4>
                  <p class="text-sm text-gray-500">Set up a new investment portfolio</p>
                </div>
              </router-link>

              <router-link
                to="/users"
                class="flex items-center p-4 bg-violet-50 rounded-lg hover:bg-violet-100 transition-colors"
              >
                <div class="flex-shrink-0">
                  <div class="w-10 h-10 bg-violet-600 rounded-lg flex items-center justify-center">
                    <img :src="usersIcon" alt="Users" class="w-6 h-6 text-white" />
                  </div>
                </div>
                <div class="ml-4">
                  <h4 class="font-medium text-gray-900">Manage Clients</h4>
                  <p class="text-sm text-gray-500">View and edit client information</p>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import usersIcon from '@/assets/icons/users.svg'
import chartIcon from '@/assets/icons/chart.svg'
import plusIcon from '@/assets/icons/plus.svg'

export default {
  name: 'Home',
  data() {
    return {
      usersIcon,
      chartIcon,
      plusIcon
    }
  },
  computed: {
    ...mapGetters('user', ['usersCount']),
    ...mapGetters('portfolio', ['activePortfolios', 'allPortfolios']),
    totalClients() {
      return this.usersCount
    },
    totalValue() {
      return this.activePortfolios.reduce((sum, portfolio) => sum + portfolio.totalValue, 0)
    },
    totalReturns() {
      return this.activePortfolios.reduce((sum, portfolio) => sum + portfolio.returns, 0)
    },
    recentPortfolios() {
      return this.allPortfolios
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5)
    }
  },
  methods: {
    formatCurrency(value) {
      return new Intl.NumberFormat('en-IN').format(value)
    },
    getStatusClass(status) {
      const classes = {
        ACTIVE: 'bg-green-100 text-green-800',
        UPCOMING: 'bg-yellow-100 text-yellow-800',
        CLOSED: 'bg-gray-100 text-gray-800'
      }
      return classes[status] || 'bg-gray-100 text-gray-800'
    }
  }
}
</script>
