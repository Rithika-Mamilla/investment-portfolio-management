<template>
  <nav class="bg-white shadow-lg border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <router-link to="/" class="flex items-center space-x-2">
            <img src="../assets/logo.png" alt="Logo" class="h-8 w-8" />
            <span class="text-xl font-bold text-gray-900">Investment Portfolio Manager</span>
          </router-link>
        </div>
        
        <div class="flex items-center space-x-4">
          <router-link
            to="/"
            class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            :class="{ 'text-primary-600 bg-primary-50': $route.name === 'Home' }"
          >
            Home
          </router-link>
          <router-link
            to="/users"
            class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            :class="{ 'text-primary-600 bg-primary-50': ['UserList', 'UserForm', 'UserEdit'].includes($route.name) }"
          >
            Clients
          </router-link>
          <router-link
            to="/portfolios"
            class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            :class="{ 'text-primary-600 bg-primary-50': ['PortfolioList', 'PortfolioDetail', 'PortfolioForm', 'PortfolioEdit'].includes($route.name) }"
          >
            Portfolios
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavigationBar'
}
</script>
